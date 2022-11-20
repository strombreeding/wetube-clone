<h1>Wetube</h1>
<h3>작동 방식 : SSR</h3>
<h3>특징</h3>
<br>
- 모바일 환경까지 고려한 반응형으로 제작
<br>
- 깃허브, 구글, 네이버 소셜로그인
<br>
- 토이프로젝트
<small></small>
<h2>📚 사용기술</h2>
<div align=center> 
    <h3>프론트</h3>
    <img src="https://img.shields.io/badge/pug-A86454?style=for-the-badge&logo=pug&logoColor=white"> 
    <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
    <img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
    <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
    <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
    <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white">
    <br>
    <h3>백</h3>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/ts_node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white">
    <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
    <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
    <br>
    <h3>배포</h3>
    <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <br>
</div>
<h2> 트러블 슈팅</h2>
<details>
<summary> IOS 환경 video 재생 불가 </summary>
<div markdown="2">
  <h3>문제 정의: ios환경에서 비디오재생 불가  </h3>
    <small>
     사실 수집
     <br> 
     -ios 제외 window, android 에서는 비디오 재생이 잘 동작함.<br>
     -macbook 에서 QuickTime 에서 실행할수 없는 확장자라고 함  <br>
      <br>
      원인 추론<br> 
      - 파일 확장자를 알 수 없기때문에 생긴 문제로 추측<br>
      - multer 가 파일 저장시, 파일이름에 확장자를 붙이지 않음<br><br>
      조치방안<br>
      - multer 옵션으로 storage 객체 생성<br>
      - filename을 사용자이메일+랜덤숫자+.확장자로 저장<br>
      - 랜덤숫자는 multer가 실행되기 전 middleware 로 세션에 저장<br>
      <br><br>
      결과관찰
      <br>
      - ios 에서 잘 재생됨<br>
      - 저장된 파일형식이 storage 에서 설정한대로 저장됨<br>
    </small> 
</div>
</details>
<details>
<summary> session data 에 없습니다. </summary>
<div markdown="2">
  <h3>문제 정의: session에 값저장시, session data에 없다는 오류발생  </h3>
    <small>
     사실 수집
     <br> 
     - session 에 data가 없다면서 컴파일이 안됨<br>
      <br>
      원인 추론<br> 
      - typescript 라서 data도 필요한것만 지정해야 작동되나봄.<br>
      - javascript 로 개발할시 오류가 생기지 않음<br>
      <br>
      조치방안<br>
      - @types/epxress-session/index.d.ts 파일에 session id와 타입 지정<br>
      <br><br>
      결과관찰
      <br>
      - 오류 없어짐 <br>
      <br>
      <details>
          <summary> express-session-data에 추가해야하는 것들 </summary>
          <div markdown="3">
              <small>
                cookie: Cookie;<br>
                uniqueId : String;<br>
                username : String;<br>
                email : String;<br>
                loggedIn : Boolean;<br>
                nickname: String;<br>
                sosialOnly : Boolean;<br>
                certification : Boolean;<br>
                avatarUrl:String;<br>
                subscribe:[];<br>
                subscriber:Number;<br>
                backUrl:String;<br>
                messages:String;<br>
                passport:any;<br>
                random:String;<br>
              </small> 
          </div>
          </details>
    </small> 
</div>
</details>

<details>
<summary> 트러블 폼 </summary>
<div markdown="2">
  <h3>문제 정의:   </h3>
    <small>
     사실 수집
     <br> 
     - <br>
     - <br>
      <br>
      원인 추론<br> 
      - <br>
      - <br>
      <br>
      조치방안<br>
      -<br>
      - <br>
      - <br>
      <br><br>
      결과관찰
      <br>
      - <br>
      - <br>
    </small> 
</div>
</details>


