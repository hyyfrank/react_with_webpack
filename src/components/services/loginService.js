const axios = require('axios');
class LoginService{
    async getLoginStatus(url,jsonData){
        return {
            "data":100
        }
        // return axios({
        //     method: 'post',
        //     url: url,
        //     data: jsonData
        //   }).catch(function (error) {
        //     console.log(error);
        //   });
    }
}
export default LoginService;