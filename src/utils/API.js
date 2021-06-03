import axios from "axios";

// https://randomuser.me/ is a website for generating random user data
export default {
    getUserList: function() {
        return axios.get("https://randomuser.me/api/?results=30");
    }
};