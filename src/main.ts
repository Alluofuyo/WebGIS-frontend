import {createApp} from 'vue'
import {router} from "./config/router";
import App from './App.vue'
import {axios} from "./config/axios"
import {store} from "./config/store";
import VueAxios from 'vue-axios'
import './index.css'
import 'element-plus/packages/theme-chalk/src/base.scss'
import './styles/animate.css'

import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faUser, faLock)

import {
    ElCol,
    ElRow,
    ElInput,
    ElButton,
    ElCard,
    ElRadioButton,
    ElRadioGroup,
    ElDatePicker,
    ElFormItem,
    ElForm,
    ElDivider,
    ElSpace,
    ElCollapseTransition,
    ElContainer,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElMenuItem,
    ElImage,
    ElLink,
    ElDrawer,
    ElMessage,
    ElDescriptions,
    ElDescriptionsItem,
    ElDialog,
    ElRadio,
    ElTag,
    ElAvatar, ElDropdown, ElDropdownItem, ElDropdownMenu, ElUpload
} from 'element-plus'

const ElComponent = [
    ElCol,
    ElRow,
    ElInput,
    ElButton,
    ElCard,
    ElRadioButton,
    ElRadioGroup,
    ElDatePicker,
    ElFormItem,
    ElForm,
    ElDivider,
    ElSpace,
    ElCollapseTransition,
    ElContainer,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElMenuItem,
    ElImage,
    ElLink,
    ElDrawer,
    ElMessage,
    ElDescriptions,
    ElDescriptionsItem,
    ElDialog,
    ElRadio,
    ElTag,
    ElAvatar,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElUpload
]
const app = createApp(App)


app.component("font-awesome-icon", FontAwesomeIcon)

ElComponent.forEach((e) => {
    app.use(e)
})


app.use(router)
    .use(VueAxios, axios)
    .use(store)
    .mount('#app')
