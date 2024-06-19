import './assets/scss/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaFlag,
  RiZhihuFill,
  MdMoviefilterTwotone,
  FaSearch,
  BiArrowUp,
  FaPlayCircle,
  FaInfoCircle,
  FaArrowLeft,
  FaAngleUp,
  FaAngleDown
} from 'oh-vue-icons/icons'

// 필요한 아이콘 추가
addIcons(
  FaFlag,
  RiZhihuFill,
  MdMoviefilterTwotone,
  FaSearch,
  BiArrowUp,
  FaPlayCircle,
  FaInfoCircle,
  FaArrowLeft,
  FaAngleUp,
  FaAngleDown
)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')
