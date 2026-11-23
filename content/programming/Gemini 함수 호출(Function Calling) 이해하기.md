---
title: "Gemini 함수 호출(Function Calling) 이해하기"
date: '2025-08-20'
---

## **개요**

LLM은 원래 자유로운 텍스트를 생성한다. 하지만 JSON 등 구조화된 형식을 요구해도 가끔 흐트러진다.

이를 해결하기 위해 함수 호출(Function Calling)을 사용한다.

모델은 스스로 답을 쓰는 대신, “이건 내가 직접 말할 게 아니라 함수 호출이 필요하다”는 요청을 반환한다.

예를 들자면, 내가 ‘치킨 먹고 싶다’고 말하면 LLM이 그걸 주문서(JSON)로 바꿔 배달앱에 보내고, 앱이 구조화된 답을 준다. 그러면 다시 LLM이 ‘프라이드 치킨 1마리, 25분 뒤 도착 예정’이라 예쁘게 말해주는 것이 함수 호출이다.

* * *

## **동작 흐름**

1.   사용자 입력 → 모델은 **함수 호출 요청** 반환
2.   외부 API 실행 → 결과 획득
3.   결과를 모델에 전달 → 최종 자연어 응답 생성

즉, 모델은 **자연어 ↔ 구조화 요청(JSON)** 변환기 역할을 한다.

* * *

## **실전 예시**

#### 1\. 함수 정의하기

```python
# 제품 정보 조회
get_product_info = FunctionDeclaration(
    name="get_product_info",
    description="Get the stock amount and identifier for a given product",
    parameters={
        "type": "OBJECT",
        "properties": {
            "product_name": {"type": "STRING", "description": "Product name"}
        },
    },
)

# 매장 위치 조회
get_store_location = FunctionDeclaration(
    name="get_store_location",
    description="Get the location of the closest store",
    parameters={
        "type": "OBJECT",
        "properties": {"location": {"type": "STRING", "description": "Location"}},
    },
)

# 주문 처리
place_order = FunctionDeclaration(
    name="place_order",
    description="Place an order",
    parameters={
        "type": "OBJECT",
        "properties": {
            "product": {"type": "STRING", "description": "Product name"},
            "address": {"type": "STRING", "description": "Shipping address"},
        },
    },
)
```

#### 2\. 도구 설정 및 채팅 초기화

```python
# 도구 설정
retail_tool = Tool(
    function_declarations=[
        get_product_info,
        get_store_location,
        place_order,
    ],
)

# 채팅 초기화 - tools 인자를 지정
chat = client.chats.create(
    model=MODEL_ID,
    config=GenerateContentConfig(
        temperature=0,
        tools=[retail_tool],
    ),
)
```

#### 3\. 실제 대화 시나리오

&amp;lt;재고 확인하기 예제>

```python
prompt = """
Do you have the Pixel 9 in stock?
"""

response = chat.send_message(prompt)
response.function_calls[0]
```

\-> response:

```python
FunctionCall(
  args={
    'product_name': 'Pixel 9'
  },
  name='get_product_info'
)
```

이제 API 요청의 응답을 전달하여 최종 사용자를 위한 응답을 생성할 수 있다

```python
response = chat.send_message(
    Part.from_function_response(
        name="get_product_info",
        response={
            "content": api_response,
        },
    ),
)
display(Markdown(response.text))
```

→ response:

```python
Yes, we have the Pixel 9 in stock.
```

→**첫 번째 (prompt=...)코드**는 모델이 "무슨 함수 호출이 필요하다"는 요청(Request)을 내놓는 상황이다.

모델은 “이건 내가 직접 대답할 수 있는 게 아니라, **외부 함수**를 불러야 하는 상황이구나” 판단하여, "내가 바로 대답 못 해. 대신 이 함수 불러서 알아와!"라고 함수 호출 지시서를 리턴한다.

→**두 번째 (Part.from\_function\_response(...)) 코드**는 모델이 “함수 호출 결과”를 입력으로 받아서 최종 답변(Response)을 내놓는다.

모델이 "아하, 결과가 들어왔네. 그럼 이걸 토대로 사람이 이해하기 쉽게 말해줘야지."라고 판단해서 함수 호출 결과를 사람이 읽을 수 있는 자연어로 포장하여 응답한다.

&amp;lt;휴대폰 구매 가능 매장 문의 예제>

```python
prompt = """
What about the Pixel 9 Pro XL? Is there a store in
Mountain View, CA that I can visit to try one out?
"""

response = chat.send_message(prompt)
response.function_calls
```

→ response:

```python
[FunctionCall(
   args={
     'product_name': 'Pixel 9 Pro XL'
   },
   name='get_product_info'
 ),
 FunctionCall(
   args={
     'location': 'Mountain View, CA'
   },
   name='get_store_location'
 )]
```

사용자를 위한 응답 생성

```python
response = chat.send_message(
    [
        Part.from_function_response(
            name="get_product_info",
            response={
                "content": product_info_api_response,
            },
        ),
        Part.from_function_response(
            name="get_store_location",
            response={
                "content": store_location_api_response,
            },
        ),
    ]
)
display(Markdown(response.text))
```

→ response:

```python
Yes, the Pixel 9 Pro XL is in stock. The store location in Mountain View, CA is 2000 N Shoreline Blvd.
```

이 예제에서 연속으로 두 번의 함수 호출을 요청했다.

신기한 부분은 모델이 스스로 두 개의 함수를 호출해야 한다는 것을 스스로 판단했다는 것이다.

## **실제 API 연동: 주소를 GPS 좌표로 변환하기**

이번에는 실제 OpenStreetMap API와 연동하여 주소를 위도/경도 좌표로 변환하는 예시이다.

#### 1\. 함수 구현

```python
def get_location(
    amenity: str | None = None,
    street: str | None = None,
    city: str | None = None,
    county: str | None = None,
    state: str | None = None,
    country: str | None = None,
    postalcode: str | None = None,
) -> list[dict]:
    """주소를 위도/경도 좌표로 변환"""
    base_url = "https://nominatim.openstreetmap.org/search"
    params = {
        "amenity": amenity, "street": street, "city": city,
        "county": county, "state": state, "country": country,
        "postalcode": postalcode, "format": "json",
    }
    # None 값 제거
    params = {k: v for k, v in params.items() if v is not None}

    try:
        response = requests.get(base_url, params=params,
                              headers={"User-Agent": "none"})
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching location data: {e}")
        return []
```

#### 2\. 자연어 주소 → GPS 좌표 변환

```python
prompt = """
I want to get the coordinates for the following address:
1600 Amphitheatre Pkwy, Mountain View, CA 94043
"""

response = client.models.generate_content(
    model=MODEL_ID,
    contents=prompt,
    config=GenerateContentConfig(tools=[get_location], temperature=0),
)

print(response.text)
```

→ 결과: The coordinates for 1600 Amphitheatre Pkwy, Mountain View, CA 94043 are: latitude 37.4224857, longitude -122.0855846.

* * *

## 마무리

Gemini의 함수 호출 기능은 단순한 챗봇을 넘어 실제 업무에 활용 가능한 AI 에이전트를 만들 수 있게 한다.
