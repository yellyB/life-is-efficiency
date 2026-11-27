---
title: "[Dart] Mac에서 Dart 설치하기"
created: '2023-10-13'
---

### **0\. Homebrew 설치하기 (설치되어 있다면 바로 1번으로)**

**a. 아래 명령어를 터미널에 입력해서 Homebrew가 설치되어 있는지 확인하자.**

> brew -v

버전 정보가 나오지 않는다면 Homebrew가 설치되지 않은 것이다.

**b. Homebrew를 설치하기 위해 아래 명령어를 터미널에 입력하여 설치하자.**

```armasm
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**c. 다시 brew -v 로 버전 확인을 통해 설치가 완료되었는지 확인하자.**

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

만약 아래 같은 에러 메세지가 나오면서 설치가 안된다면 PATH에 추가해주어야 한다.

/opt/homebrew/bin is not in your PATH

**c-1. 터미널에서 bash\_profile을 연다.**

```shell
nano .bash_profile
```

위 명령어를 터미널에 붙여넣으면 자동으로 텍스트를 수정할 수 있는 파일이 열린다.

**c-2. bash\_profile에 다음 내용을 추가하여 PATH를 갱신한다.**

```shell
export PATH=/opt/homebrew/bin:$PATH
```

\* 터미널에서 bash\_profile 을 열면 아래에 명령어들이 나온다. 명령어를 참고해서 파일을 수정하자.

### **1\. Homebrew 로 다트 SDK 설치하기**

터미널에 아래 명령어 두 줄을 차례로 입력해서 dart를 설치한다.

```shell
brew tap dart-lang/dart
brew install dart
```

잘 설치되었는지 확인한다.

> dart -version
