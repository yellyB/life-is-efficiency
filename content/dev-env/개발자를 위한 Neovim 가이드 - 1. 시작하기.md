---
title: "개발자를 위한 Neovim 가이드 - 1. 시작하기"
date: '2025-06-05'
---

### 목차

-   [Vim에 익숙해지기](&lt;#Vim에 익숙해지기>)
-   [Neovim 소개](&lt;#Neovim 소개>)
-   [Neovim 설치](&lt;#Neovim 설치>)
-   [Vim 플러그인 관리하기](&lt;#Vim 플러그인 관리하기>)

* * *

## **Vim에 익숙해지기**

터미널을 열고 `vimtutor ko` 를 입력하면 Vim에 대한 기본 조작을 배울 수 있는 문서가 열린다.

Vim의 기본 조작법은 이 튜토리얼을 통해 익힐 수 있다.

## **Neovim 소개**

단순 텍스트 편집만 사용할 거라면 Vim을 써도 충분하다.
하지만 프로그래밍할 예정이라면 Vim만으로는 어려움이 있다.

Vim을 확장한 버전인 Neovim이란 것이 있는데, 겉으로는 Vim과 비슷하지만 내부 구조에는 차이가 있다.
차이점 중 하나는 Neovim에는 내장된 LSP가 있어서 별도로 설정하지 않아도 자동완성, 오류 표시, Go to Definition 등이 가능하다. Vim을 쓴다면 이를 위해 복잡하게 외부 플러그인을 설정해야 한다.
또, Vim은 플러그인이 vimscript 기반이고 Neovim은 lua 기반으로 되어있어 플러그인 설정이 쉽다.

> 🔍 **LSP란?**
> Language Server Protocol의 약자. 이름에서 알 수 있듯이 코드 편집기와 언어 지원 기능을 분리해서 통신할 수 있게 만든 표준 프로토콜이다.
> 쉽게 말하면 편집기(Language Client)와 언어 서버가 대화하듯 기능을 주고받는 방식이다.

## **Neovim 설치**

**1\. 설치**

```shell
# 터미널에 입력
brew install neovim    # 설치
nvim --version         # 설치 확인
```

설치는 완료되었지만, 지금 상태에서는 Neovim을 시작하기 위해 “nvim”을 입력해야 한다.
하지만 우리는 vim대신 nvim을 사용할 것이기 때문에 더 편하게 사용하기 위해 “vi”를 입력하면 nvim이 실행되도록 설정을 추가하자.

**2\. 설정 파일 열기**

```shell
# 터미널에 입력
vi ~/.zshrc
```

**3\. nvim 설정 추가**

편집기로 .zshrc 파일을 열었다면 아래 내용을 추가한다.

```shell
if command -v nvim &> /dev/null; then
  alias vi="nvim"
  export EDITOR='nvim'
fi
```

nvim에 앨리어스를 만들고 기본 텍스트 편집기를 nvim으로 지정했다.

\+ 여기에 더해서, 기본적인 vim 설정도 추가하자.

```shell
# 터미널에 입력
vi ~/.vimrc
```

.vimrc에 아래 내용 추가

```shell
set hlsearch			" 검색된 단어에 하이라이팅 처리
set number			" 라인 숫자 보여줌
set clipboard+=unnamed		" 복사할 때 클립보드에도 복사
```

> 💡 3번 라인의 `set clipboard+=unnamed` 설정은 Vim에서 복사한 내용을 시스템 클립보드에 자동 복사한다는 뜻이다. y로 뭔가를 복사하면 Vim 내부의 레지스터에만 저장되기 때문에 다른 앱 등에도 붙여 넣을 수 있도록 설정해 주는 것이다.

> 💡 정확하게 이해하지 않아도 괜찮다. vim의 에디터 설정은 파일로 관리한다는 정도만 알아두자. vim 설정은 이렇게 스크립트로 관리한다.

## **Vim 플러그인 관리하기**

Vim이나 Neovim은 플러그인 설치와 관리를 수동으로 해야 하지만, 플러그인 매니저를 사용하면 이를 자동화할 수 있어 편리하다.

유명한 플러그인 매니저 중 하나인 **vim-plug**를 사용해보자.

[GitHub - junegunn/vim-plug](https://github.com/junegunn/vim-plug)

문서에 Installation 항목을 보면 설치 방법이 잘 나와 있다.
우리는 Neovim을 사용 중이니 아래 명령어로 설치하자.

```shell
# 터미널에 입력
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

사용방법은 Usage에 나와 있듯이, 아래처럼 사용하면 된다. (.vimrc에 추가하자)

```shell
call plug#begin()

" List your plugins here
Plug 'tpope/vim-sensible'

call plug#end()
```

추가하고자 하는 플러그인을 Plug '\[플러그인 명\]' 처럼 입력하고 :w로 저장한 후, 명령어 모드에서 PlugInstall로 플러그인을 설치한다.

> 💡 `.vimrc` 파일은 Vim 시작 시 한 번만 실행되기 때문에 플러그인을 추가한 후에는 `.vimrc` 파일을 다시 적용해 주어야 한다. `.vimrc` 파일을 종료한 후 다시 열어주거나, `:source ~/.vimrc` 혹은 `:so $`($=열려있는 파일)로 파일을 다시 적용해 주자.
