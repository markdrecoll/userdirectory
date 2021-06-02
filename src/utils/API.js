import axios from "axios";

export default {
    getUserList: function() {
        return axios.get("https://randomuser.me/api/?results=10");
    }
};