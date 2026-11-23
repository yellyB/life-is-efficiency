---
title: "cURL로 Vertex AI의 Gemini API 사용하기"
date: '2025-08-19'
---

이 글에서는 cURL 명령어를 통해 **Vertex AI의 Gemini API**와 직접 상호작용하는 방법을 살펴볼 것이다.

* * *

> **cURL이란?**
>
> **cURL**은 "*Client URL"*의 줄임말로, 터미널이나 스크립트 환경에서 **HTTP 요청을 직접 보낼 수 있는 명령줄 도구**이다.
> 웹 브라우저가 주소창에 URL을 입력해 서버와 통신하는 것처럼, cURL은 개발자가 코드 없이도 API와 직접 대화할 수 있는 인터페이스 역할을 한다. GET, POST, PUT, DELETE 같은 HTTP 메서드를 지원하며, 인증 토큰 전달, 헤더 설정, 파일 업로드·다운로드까지 가능하다.
> 쉽게 말해, **“브라우저 없이 서버와 채팅할 수 있는 전문 도구”**라고 보면 된다.
> → 이 글에서 사용하는 curl -X POST ... 명령어는 바로 cURL을 통해 Gemini API에 요청을 보내고 응답을 받는 예제이다.

# **Part1. Gemini Flash 모델 사용하기**

### **텍스트 생성 (Text generation)**

generateContent 메서드는 텍스트 생성, 다중 턴(chat) 대화, 멀티모달 입력 등 다양한 용도를 처리할 수 있다.

아래 예시는 단순히 텍스트 프롬프트를 보내고 텍스트 응답을 받는 경우이다.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://${API_ENDPOINT}:generateContent \
  -d '{
    "contents": {
      "role": "USER",
      "parts": { "text": "Why is the sky blue?" },
    },
    "generation_config": {
      "response_modalities": "TEXT",
     },
  }' 2>/dev/null >response.json

jq -r ".candidates[].content.parts[].text" response.json
```

→ 이 코드를 실행하면 *“Why is the sky blue?”* 에 대한 모델의 대답이 생성된다.

### **스트리밍 (Streaming)**

Gemini API는 스트리밍 응답을 제공한다. 전체 응답이 도착할 때까지 기다리지 않고, 도착하는 조각부터 바로 처리할 수 있다.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://${API_ENDPOINT}:streamGenerateContent \
 \
  -d '{
    "contents": {
      "role": "USER",
      "parts": { "text": "Why is the sky blue?" }
    }
  }' 2>/dev/null >response.json

jq -r ".[] | .candidates[] | .content.parts[].text" response.json
```

### **모델 파라미터 (Model parameters)**

모델은 프롬프트와 함께 전달된 파라미터에 따라 다른 결과를 생성한다. `temperature`, `top_p`, `top_k` 등을 조정하면 다양한 결과를 얻을 수 있다.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://${API_ENDPOINT}:generateContent \
  -d '{
    "contents": {
      "role": "USER",
      "parts": [
        {"text": "Tell me a story."}
      ]
    },
    "generation_config": {
      "temperature": 0.2,
      "top_p": 0.1,
      "top_k": 16,
      "max_output_tokens": 2048,
      "candidate_count": 1,
      "stop_sequences": []
    },
    "safety_settings": {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_LOW_AND_ABOVE"
    }
  }' 2>/dev/null >response.json

jq -r ".candidates[].content.parts[].text" response.json
```

### **대화 (Chat)**

Gemini API는 다중 턴 대화를 지원한다. 대화 히스토리를 JSON 형식으로 전달하면, 모델이 마지막 턴에 대한 답변을 생성한다.

쉽게 말하면, 채팅을 흉내 내서 마지막 말에 들어갈 답변을 모델이 생성하게 만드는 것이다.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://${API_ENDPOINT}:generateContent \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          { "text": "Hello" }
        ]
      },
      {
        "role": "model",
        "parts": [
          { "text": "Hello! I am glad you could both make it." }
        ]
      },
      {
        "role": "user",
        "parts": [
          { "text": "So what is the first order of business?" }
        ]
      }
    ]
  }' 2>/dev/null >response.json

jq -r ".candidates[].content.parts[].text" response.json
```

### **함수 호출 (Function calling)**

함수 호출 기능을 사용하면 함수의 설명을 모델에 전달하고, 모델이 필요시 JSON 형태의 `functionCall`을 반환하도록 할 수 있다.

tools에 가상의 함수 목록을 선언해 두면, 모델이 필요시 알아서 선택하여 호출 형태로 응답한다.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://${API_ENDPOINT}:generateContent \
  -d '{
  "contents": {
    "role": "user",
    "parts": {
      "text": "Which theaters in Mountain View show Barbie movie?"
    }
  },
  "tools": [
    {
      "function_declarations": [
        {
          "name": "find_movies",
          "description": "find movie titles currently playing in theaters...",
          ...
        }
      ]
    }
  ]
}' 2>/dev/null >response.json

jq -r ".candidates[].content.parts[].functionCall" response.json
```

* * *

# **Part 2. 멀티모달 입력하기**

Gemini 2.0 Flash는 텍스트뿐만 아니라 이미지, 동영상을 입력으로 받아 텍스트 응답을 생성할 수 있는 멀티모달 모델이다. 텍스트/채팅 프롬프트에 이미지와 동영상을 함께 넣어 모델의 답변을 받을 수 있다.

### **로컬 이미지에서 텍스트 생성**

이미지를 base64 인코딩하여 `inline_data`로 전달한다.

```bash
curl -X POST \
  ...
  -d "{
      'contents': {
        'role': 'USER',
        'parts': [
          { 'text': 'Is it a cat?' },
          {
            'inline_data': {
              'data': '${data}',
              'mime_type':'image/jpeg'
            }
          }
        ]
       }
    }"
```

### **GCS 이미지에서 텍스트 생성**

Google Cloud Storage에 저장된 이미지를 URI로 전달할 수 있다.

```bash
curl -X POST \
  ...
  -d '{
    "contents": {
      "role": "USER",
      "parts": [
        { "text": "Describe this image" },
        {
          "file_data": {
            "mime_type": "image/png",
            "file_uri": "gs://cloud-samples-data/generative-ai/image/320px-Felis_catus-cat_on_snow.jpg"
          }
        }
      ]
    },
    ...
  }'
```

### **동영상에서 텍스트 생성**

Cloud Storage URI를 통해 동영상을 입력으로 전달할 수 있다.

```bash
curl -X POST \
  ...
  -d '{
    "contents": {
      "role": "USER",
      "parts": [
        { "text": "Answer the following questions using the video only..." },
        {
          "file_data": {
            "mime_type": "video/mp4",
            "file_uri": "gs://github-repo/img/gemini/multimodality_usecases_overview/pixel8.mp4"
          }
        }
      ]
    }
  }'
```

### **출력 통제 (Controlled Generation)**

모델이 응답을 내놓을 때 JSON 스키마를 정의하여 구조화된 출력만 받도록 할 수 있다.

\* *`response_schema`**를 지정하면, 모델의 답변 형식을 강제로 맞출 수 있다.*

```bash
curl -X POST \
  ...
  -d '{
    "contents": {
      "role": "user",
      "parts": { "text": "List a few popular cookie recipes." }
    },
    "generationConfig": {
        "response_mime_type": "application/json",
        "response_schema": {"type": "object", "properties": {"recipe_name": {"type": "string"}}}
    },
}'
```

### **검색 툴 활용 (Search as a tool)**

Gemini 2.0부터는 구글 검색을 툴로 사용할 수 있다. 모델이 필요시 구글 검색을 실행하여 최신 정보를 응답에 반영한다.

\* `*google_search*` *툴을 활성화하면 모델이 스스로 검색을 사용한다.*

```bash
curl -X POST \
  ...
  -d '{
    "contents": [
        { "role": "user", "parts": [ { "text": "What is the weather today in San Jose CA?" } ] }
    ],
    "tools": { "google_search": {} },
    "generationConfig": { "response_modalities": "TEXT" }
  }'
```

### **코드 실행 (Code Execution)**

Gemini API는 Python 코드를 직접 실행할 수 있는 기능을 지원한다. 모델은 코드를 작성하고 실행해 본 뒤 결과를 반영하여 최종 답변을 낸다.

\* *tools**에* `*code_execution*`*을 포함하면 파이썬 코드 실행 권한이 주어진다.*

```bash
curl -X POST \
  ...
  -d '{
  "contents": {
    "role": "user",
    "parts": { "text": "Calculate 20th fibonacci number. Then find the nearest palindrome to it." }
  },
  "tools": [ { "code_execution": {} } ]
}'
```

* * *

## **마무리**

이 글에서는 **cURL로 Gemini 2.0 Flash 모델을 호출하는 방법**을 살펴보았다.

텍스트 생성부터 멀티모달 입력, 함수 호출, 검색, 코드 실행까지 다양한 기능을 사용할 수 있다.
