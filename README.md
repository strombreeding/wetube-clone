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

기능들

유저
회원가입
로그인
로그아웃

비디오
(로그인)(비회원)
미디어 열람 - 조회수 증가(증가방식)
미디어 검색 - 필터

(로그인)
미디어 업로드
미디어 수정
미디어 삭제
미디어 코멘트 - 대댓글,삭제,고정,신고
미디어 추천
미디어 신고

CRUD
-media

-user
db

22.8.17
=/id:/Place public page 
    -비디오에서 닉네임 클릭시, 검색을 통해 클릭시, 그 유저의 닉네임을 req.parms.id로 주고 userPlace.pug로 render
    -findOne({nickname:해당닉네임})으로 찾서 그 정보들을 겟해옴 
    -그 사용자가 업로드한 미디어를 나열. 
    -팔로우 누를시, 접속한 닉네임의 유저db에 팔로워+1(팔로우 한사람의 닉네임도), 팔로잉 한 사람은 팔로잉db에 추가


=/검색으로 nickname까지 검색해야함.
