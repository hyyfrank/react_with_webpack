import axios from "axios"
// const baseUrl = "http://cvp.g2link.cn:20065"
const baseUrl = "/api"

const fetchLoginStaus = (username,password) => {
    let result;
    const LoginFetchUrl = baseUrl + "/manager"
    const postBody = {
        type: "LOGIN",
        login: {
            user: username,
            pass: password,
        },
        ctrl_key: -1
    }
    return axios.post(LoginFetchUrl,postBody);

}
export default fetchLoginStaus;

