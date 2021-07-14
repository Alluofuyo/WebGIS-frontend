import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            userInfo: {
                username: "",
                nickname: "",
                birthday: "",
                email: "",
                id: "",
                gender: ""
            },
            token: ""
        }
    },
    mutations: {
        login(state: { userInfo: Object, token: string }, data) {
            console.log(state)
            state.userInfo = data.user
            state.token = data.token
        },
        logout(state: { userInfo: Object, token: string }) {
            state.userInfo = {
                username: "",
                nickname: "",
                birthday: "",
                email: "",
                id: "",
                gender: ""
            }
            state.token = ""
        },
        updateUser(state, user) {
            Object.assign(state.userInfo, user)
        }
    }
})

export {store}