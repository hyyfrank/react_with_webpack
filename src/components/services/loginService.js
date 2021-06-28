const axios = require('axios');
function getLoginStatus(url,jsonData){
    return {
        "data":200+jsonData.data
    }
    // return axios({
    //     method: 'post',
    //     url: url,
    //     data: jsonData
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
}
export {getLoginStatus}
