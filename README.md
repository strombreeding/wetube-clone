<h1>Wetube</h1>

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
  <h3> QuickTime 에서 읽을 수 없는 파일  </h3>
    <small>
      -아이폰에서는 볼수 없던 문구가 macbook 에서는 발견됨! 
      <br>
      -아마 파일 확장자를 알 수 없기때문에 생긴 문제로 추측
    </small> 
  <h3> multer 파일저장시 파일명뒤에 확장자 붙이기</h3>
    <small>
      -새로운 multer storage 객체를 만들고 mimetype 별로 filename 세팅을 해주었다.
      <br>
      -그 결과 잘 실행됨!
    </small>
</div>
</details>
<details>
  <summary> express-session </summary>
  <div markdown="2">
    <h3> session에 값 저장하려니 sessions data에 없다고함 </h3>
      <small>
        -타입스크립트로 개발하다보니 session에 저장된 데이터값만 추가할수 있나봄! 
        <br>
        -@types/express-session/index.d.ts 파일에 추가하려는 session key와 타입 입력해줌!
        <br>
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

9.9 할것
댓글창 활성화
가장좋아요가 많은 댓글만 노출, 
댓글 클릭시 

22.8.17
=/id:/userPlace public page 
    -비디오에서 닉네임 클릭시, 검색을 통해 클릭시, 그 유저의 닉네임을 req.parms.id로 주고 userPlace.pug로 render
    -findOne({nickname:해당닉네임})으로 찾서 그 정보들을 겟해옴 
    -그 사용자가 업로드한 미디어를 나열. 
    -팔로우 누를시, 접속한 닉네임의 유저db에 팔로워+1(팔로우 한사람의 닉네임도), 팔로잉 한 사람은 팔로잉db에 추가


구독
    구독과 구독해제 22.9.2 완료 : ajax로 비동기통신, 리로드 
        프론트 
            구독버튼 누를시 data yn : 구독
                백엔드로 local.uniqueId(접속중인id)와 owner.nickname(비디오주인) 을  전송
                구독버튼 변경 구독중 => watch API 에서 true,false 로 받아온 것으로 pug에서 해결
            구독취소버튼 누를시 data yn : 취소
                백엔드로 local.uniqueId(접속중인id)와 owner.nickname(비디오주인) 을  전송
                구독버튼 변경 구독
                체크 해제
        백엔드
            구독 API
                req.body.yn ===구독
                    User 모델에 구독명단 : [] 과 구독자명단 : [] 추가
                    req.body로 접속중인id가 오면 비디오주인의 구독자 명단에 접속중인id push
                    접속중인id의 구독자 명단에 비디오 주인의id를 push(nickname 으로 받아서 처리한번해야함)
                else 
                    위의 로직과 반대로..
                알아낸것 mongodb 쿼리 = $inc, $pull = +- , 배열에서 빼기
    구독자
        프론트
            템플릿에 '구독자 수'에 owner.구독자명단.length 넣기
        백엔드
            
    구독 명단 보는 스크린 추가해야함.
    

조회수
    조회수 증가
        프론트
            와치 페이지에 머문시간이 n이 지나면 get요청
            템플릿에 views 표기
        백엔드
            req.param으로 해당 비디오 찾기
            찾은 후 views 에 +1 해주기

댓글
    보기
        프론트
            겟 요청, 해당비디오의 comments[]
    댓글달기 
        프론트 
            비디오id, 접속id, 코멘트, 현재시각을 post
            성공시 템플릿에 추가
        백엔드
            받아온 id, comment, at 을가지고 여러 작업을 거친후 비디오id comments에 추가 
            리다이렉트
프론트 
    비디오 플레이어
    남은css마무리
    클릭시 팝업 
    
백엔드
    소셜로그인 추가 (구글. 카카오, 네이버)
    pw회원가입에 이메일인증 또는 카카오 인증 구현 (유효성)


        