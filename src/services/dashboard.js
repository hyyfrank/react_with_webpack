import axios from "axios"
const DashboardService = {
    fetchAllServiceData: function() {
        return axios.get("http://cvp.g2link.cn:20065/?filename=./15/work_record.txt?t=1625479407511");
    },
    filterServiceData: function(data,filter){
        return data;
    }
}
export default DashboardService;