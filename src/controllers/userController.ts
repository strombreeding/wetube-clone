import { RequestHandler } from "express";
import axios from "axios";
import { data } from "jquery";
export const myPage:RequestHandler = (req,res) => {
    return res.send(`${req.params.id}'s page`)
}
export const startGithubLogin:RequestHandler = (req,res) => {
    const baseUrl ="https://github.com/login/oauth/authorize"
    const config:any = {
        client_id : process.env.GH_CLIENT,
        allow_signup : false,
        scope : "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl)
}
export const finishGithubLogin:RequestHandler = async(req,res) => {
    const baseUrl ="https://github.com/login/oauth/access_token"
    const config:any = {
        client_id : process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code: req.query.code
    };
    const { data: requestToken } = await axios.post(baseUrl, config, {
      headers: { Accept: "application/json" },
    });
    console.log(data)
    if("access_token" in requestToken){
        const { access_token } = requestToken; // ③ ~ ④에 해당

        const apiUrl = "https://api.github.com";
        const { data: userdata } = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `token ${access_token}` },
        }); // ⑤ ~ ⑥ 에 해당

        const { data: emailDataArr } = await axios.get(`${apiUrl}/user/emails`, {
        headers: { Authorization: `token ${access_token}` },
        }); // ⑤ ~ ⑥ 에 해당
            console.log("🥶",userdata)
            console.log("😡",emailDataArr)
        res.redirect("/")
    }
    else {
    res.redirect("/login")

    }
}
export const edit:RequestHandler = (req,res) => res.send("Edit User")
export const Delete:RequestHandler = (req,res) => res.send("회원 탈퇴")
export const logOut:RequestHandler = (req,res) => res.send("logOut")