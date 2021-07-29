import {createStore} from "vuex";


interface State{
    userInfo: {
        username: "",
        nickname: "",
        birthday: "",
        email: "",
        id: "",
        gender: "",
        avatar: ""
    },
    token: ""
}

const store = createStore({
    state():State {
        return {
            userInfo: {
                username: "",
                nickname: "",
                birthday: "",
                email: "",
                id: "",
                gender: "",
                avatar: ""
            },
            token: ""
        }
    },
    mutations: {
        login(state:State, data) {
            console.log(state)
            state.userInfo = data.user
            state.token = data.token
        },
        logout(state:State) {
            state.userInfo = {
                avatar: "",
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
        },
        setToken(state, data) {
            state.token = data
        },
        setAvatar(state, a) {
            state.userInfo.avatar = a
        }
    }
})

export {store}