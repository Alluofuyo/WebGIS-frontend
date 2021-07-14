import {ComponentCustomProperties} from "vue";
import {Store} from "vuex";

declare module '@vue/runtime-core' {
    interface State {
        userInfo: {
            username: string,
            nickname: string,
            birthday: string,
            email: string,
            id: number,
            gender: number
        },
        token: string
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}