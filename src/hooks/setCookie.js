import Cookie from "js-cookie";

const setCookie = (name, usrin) =>{
  Cookie.set(name, usrin,{
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: '/'
  })
}

export default setCookie