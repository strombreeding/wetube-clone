url plan

/ -Home
/join -Join
/login -login

/user/:id =mypage
/user/logout =logout
/user/edit =edit profile
/user/delete =회원탈퇴

/video/:id =watching video now
/video/:id/edit =Edit video
/video/:id/upload =Upload video
/video/remove =Remove video
/video/serch =serch videos
git 연동해보기


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


        