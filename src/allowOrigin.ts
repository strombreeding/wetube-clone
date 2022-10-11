
const accessOrigin = (req: any,res: any,next: any)=>{
    res.header("Access-Control-Allow-Origin","*"); // 모든 도메인에 서버 호출가능
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
};

export default accessOrigin