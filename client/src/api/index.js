import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default {
    /* 获取student数据 */
    getStudentInfo(){
        return axios.get("/student/studentInfo");
    },

    /* 删除student数据 */
    deleteStudentInfo(id){
        return axios.delete("/student/delStudentInfo/"+id )
    },

    /* 修改student数据 */
    editStudentInfo(data){
        return axios.post("/student/editStudentInfo",data)
    },

    /* 新增student数据 */
    insertStudentInfo(data){
        console.log(data);
        return axios.post("/student/insertStudentInfo",data)
    }
}