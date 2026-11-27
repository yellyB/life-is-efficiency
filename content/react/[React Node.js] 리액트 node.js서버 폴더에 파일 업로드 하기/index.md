---
title: "[React/Node.js] 리액트 node.js서버 폴더에 파일 업로드 하기"
created: '2021-09-30'
---

## \[React\]

## 1

먼저 type="file"인 인풋 태그를 만들어서 파일을 선택할 수 있도록 해준다.

![파일 선택 전](./파일%20선택%20전.png)

*파일 선택 전*

![파일 선택 후](./파일%20선택%20후.png)

*파일 선택 후*

## 2

파일을 선택하면 그 정보를 state에 저장해준다.

```javascript
 const [selectedFile, setSelectedFile] = React.useState<any>(null);  //업로드할 파일 정보
 const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

// JSX 부분
<input type="file" onChange={handleFileChange} />
```

## 3

업로드 기능을 수행할 버튼을 만들어 클릭 이벤트로 파일을 서버로 전달해준다.

\- formData를 생성해 여기에 선택 파일 정보와 이름을 담는다.

  \* 정보를 담을 때 사용한 userfile은 node.js 서버에서 받을 때 사용할 이름이다.

\- Axios를 사용해 api의 주소로 파일 정보가 담긴 formData를 보내준다.

```javascript

 const [selectedFile, setSelectedFile] = React.useState<any>(null);  //업로드할 파일 정보
 const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  //업로드 버튼 클릭
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('userfile', selectedFile, selectedFile.name);  //생성한 formData에 파일 정보 담기
    Axios.post('fileUploadUrl', formData)  //fileUploadUrl에 api주소 입력
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

// JSX 부분
<input type="file" onChange={handleFileChange} />
<button onClick={handleFileUpload}>업로드</button>
```

## \[Node.js\]

## 4

multer라는 패키지를 사용할 것이기 때문에 설치를 해준다.

> npm install multer

## 5

라우팅 파일에 multer를 선언해주고 업로드 경로를 설정해준다.

여기선 프로젝트 폴더의 uploads폴더에 파일이 저장될 것이다.

upload.single은 파일을 하나 전송할 때 사용하고 파일을 여러 개 업로드하려면 다른 기능을 사용해야 한다.

```javascript
import express = require('express');
require('dotenv').config();

const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });  //uploads폴더에 저장

router.post('fileUploadUrl', upload.single('userfile'), function (req, res) {
      res.status(200).send('success');
});

export default router;
```

위의 방법은 파일 이름이 2320ac1a843c16e2fdcba79dd7b3e3da처럼 랜덤으로 지정된다.

파일 이름이 중복되지 않는 장점은 있지만 업로드했을 때와 동일한 파일 이름으로 저장하고 싶다면 filename을 설정해주어야 한다.

아래처럼 설정하면 업로드했던 파일명 그대로 폴더에 저장된다.

```javascript
import express = require('express');
require('dotenv').config();

const router = express.Router();
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  //파일 경로
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  //원래 파일명 그대로 저장
    },
  }),
});

router.post('/fileUploadUrl', upload.single('userfile'), function (req, res) {
      res.status(200).send('success');
});

export default router;
```
