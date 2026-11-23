---
title: "고도 엔진 슈팅게임 #2: 화면이동, 슈팅"
date: '2024-09-24'
---

## **\[화면 이동\]**

screen wrap 기능을 넣을 것이다.

플레이어가 화면의 끝에 다다르면 반대편으로 나오는 것을 말한다.

스크립트 상단에 다음 코드를 추가하고

```bash
var screensize = Vector2.ZERO
```

`_ready()` 에 다음 코드를 추가한다.

```bash
screensize = get_viewport_rect().size  # 화면 크기
```

그리고 플레이어가 한쪽 끝에 다다르면 반대편으로 이동시켜야 하는데, 여기서 문제가 있다.

다음과 같은 코드로 플레이어를 이동시키면 된다고 생각할 수 있지만

```bash
func _physics_process(delta):
	...
	if position.x > screensize.x:
		position.x = 0
	if position.x < 0:
		position.x = screensize.x
	if position.y > screensize.y:
		position.y = 0
	if position.y < 0:
		position.y = screensize.y
```

이건 Area2D 같은 노드에서 작업할 때는 먹히지만 여기에선 물리엔진의 계산과 상충되어서 모서리에 끼는 등 이상한 움직임이 발생한다.

![이렇게 된다 (살려줘..)](./이렇게%20된다%20%28살려줘..%29.gif)

*이렇게 된다 (살려줘..)*

고도의 RigidBody2D 문서에 아래와 같은 부분이 있다.

> **RigidBody2D**
> Note: Changing the 2D transform or linear\_velocity of a RigidBody2D very often may lead to some unpredictable behaviors. If you need to directly affect the body, prefer \_integrate\_forces as it allows you to directly access the physics state.

RigidBody2D는 position을 자주 변경해서는 안된다는 것이고, 직접 바디에 영향을 주어야 하는 경우는 \_integrate\_forces를 사용하라는 얘기이다.

바디의 위치나 물리 속성을 직접 변경해야 하는 경우는 \_physics\_process()대신 \_integrate\_forces()를 사용해야 한다.

\_integrate\_forces()로 바디의 현재 상태 정보가 들어있는 PhysicsDirectBodyState2D 오브젝트에 접근할 수 있다.

위치를 변경할 때는 이 오브젝트의 Transform2D를 수정해야 한다. (안돼 조금씩 어려워진다..😱)

이를 통해 아래 코드로 wrap-around(휘감기) 효과를 구현할 수 있다.

```bash
func _integrate_forces(physics_state):
	var xform = physics_state.transform

	# wrapf(value, min, max)
	xform.origin.x = wrapf(xform.origin.x, 0, screensize.x)
	xform.origin.y = wrapf(xform.origin.y, 0, screensize.y)

	physics_state.transform = xform
```

`wrapf()` 함수는 value 를 min &lt;-> max 사이에서 'wrap'한다.

만약 최솟값인 `0 미만으로` 값이 내려가면 `screensize.x` 값이 되고, 반대로 최댓값인 `screensize.x` 이 넘어가면 `0`이 된다.

![wrap 효과가 적용된 모습](./wrap%20효과가%20적용된%20모습.gif)

*wrap 효과가 적용된 모습*

## **\[슈팅\]**

"shoot" 액션이 입력되면 총알이 발사되어 일직선으로 화면 끝까지 이동하는 총알을 만들 것이다.

총알 발사엔 쿨타임이 있다.

**(1) Bullet 씬**

다음과 같은 구조로 새로운 씬을 만든다.

-   Bullet(Area2D생성 후 이름 변경)

-   Sprite2D
-   CollisionShape2D
-   VisibleOnScreenNotifier2D

`Sprite2D`의 **Texture** 속성에 레이저 이미지를 넣고, `CollisionShape2D` 의 **Shape** 에는 레이저 이미지의 모양과 비슷한 `CapsuleShape2D`를 선택했다.

`VisibleOnScreenNotifier2D`는 노드가 노출/미노출될 때마다 시그널로 알려주는 노드다.

이를 통해 총알이 화면 밖으로 나가면 삭제해 줄 수 있다.

스크립트를 추가해서 다음 코드를 작성한다.

```bash
extends Area2D

@export var speed = 1000

var velocity = Vector2.ZERO

# 새 총알 리스폰 시 호출될 함수
func start(_transform):
	transform = _transform
	velocity = transform.x * speed

func _process(delta):
	position += velocity * delta

# VisibleOnScreenNotifier2D 의 screen_exited 시그널 연결
func _on_visible_on_screen_notifier_2d_screen_exited():
	queue_free()

# Bullet의 body_entered 시그널 연결
func _on_body_entered(body):
	# todo: 추후 만들어질 바위 씬을 위한 코드
	if body.is_in_group("rocks"):
		body.explode()
		queue_free()
```

**(2) Bullet 인스턴스 생성**

총알이 스폰될 부분인 총구를 만들어야 한다.

Player 의 자식으로 Marker2D 노드를 추가하고 `Muzzle` 로 이름을 변경한다.

또 `Timer` 노드를 추가하고 `GunCooldown` 로 이름을 변경한다.

**One Shot**과 **Autostart** 를 둘 다 체크해 준다.

`Player` 스크립트 상단에 다음 코드를 추가한다.

```bash
@export var bullet_scene : PackedScene
@export var fire_rate = 0.25

var can_shoot = true
```

저장 후 `[인스펙터] 창에` 만들어진 **Bullet Scene** 에 `bullet.tscn` 파일을 드래그해 넣는다.

**(3) 스크립트 작성**

총알 발사 쿨타임 구현을 위해 `_ready()`에 다음 코드를 추가한다.

```bash
$GunColldown.wait_time = fire_rate
```

총알 생성을 위한 함수를 추가한다.

```bash
func shoot():
	if state == INVULERABLE: return

	can_shoot = false
	$GunColldown.start()

	var bullet = bullet_scene.instantiate()
	get_tree().root.add_child(bullet)
	bullet.start($Muzzle.global_transform)  # 전역 좌표 부여.
```

마지막 라인에서 global 좌표를 사용하는데, 이 이유는 다음과 같다.

그냥 transform 을 사용한다면 총알의 발사 위치가 총구의 부모 노드 기준으로 처리되어 버린다. 이 경우에는 총구의 부모인 플레이어의 총구 위치에 총알이 스폰될 것이다. 따라서 local 좌표가 아닌 global 좌표를 사용해 총구가 어떤 부모 노드에 속해 있든 상관없이 올바른 위치와 방향으로 생성되도록 해줘야 한다.

`shoot()` 함수 호출을 위해 `get_input()`에 다음 코드를 추가한다.

```bash
func get_input():
	...
	if Input.is_action_pressed("shoot") and can_shoot:
		shoot()
```

마지막으로 총을 쏠 수 있게 `GunCooldown`의 **timeout** 시그널을 연결해 준다.

```bash
func _on_gun_colldown_timeout():
	can_shoot = true
```

**(4) 테스트**

테스트를 위해 Main씬을 만들어줄 것이다.

1.  Node2D를 만들고 Main으로 이름을 변경한다.
2.  Sprite2D를 자식 노드로 추가하고 Texture 속성에 배경 이미지를 넣는다.
3.  Player씬을 자식 인스턴스로 연결한다.
4.  \[프로젝트 실행\]으로 메인 씬을 선택해 실행한다.

![뿅! 뿅!](./뿅!%20뿅!.gif)

*뿅! 뿅!*
