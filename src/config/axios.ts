import axios from "axios";
import {store} from "./store";
import {router} from "./router";
import {ElMessage} from "element-plus";

axios.defaults.baseURL = "http://localhost:8080"

axios.interceptors.request.use(config => {
    if (store.state.token !== "") {
        config.headers["satoken"] = store.state.token
    }
    return config
})

axios.interceptors.response.use(config => {
    if (config.data.status == -2) {
        ElMessage.error("登录过期,请重新登录")
        store.commit("logout")
        let token=window.localStorage.getItem("token")
        if (token){
            window.localStorage.removeItem("token")
        }
        router.replace("/login")
    }
    return config
})

export {axios}