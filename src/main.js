// add fontawesome----------------
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
// load svg icon
import { faInstagramSquare, faFacebookSquare, faMedium, faYoutube, faSearchengin } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
// -------------------------------
import VueDisqus from 'vue-disqus'
//--------------------------------
import DefaultLayout from '~/layouts/Default.vue'
import PostLayout from '~/layouts/PostLayout.vue'
// 直接這樣import 進來 用下面head.link.push會有問題
//import '~/assets/css/style.css'
// import workerGlobals from '~/assets/js/workerGlobals.js'
// 加入mixins
import { formatMixin } from "~/mixins/formatMixin.js";

// fontawesome setting
config.autoAddCss = false;

library.add(faInstagramSquare, faFacebookSquare, faMedium, faYoutube, faSearchengin)

export default function (Vue, { head }) {
  // 使用留言套件
  Vue.use(VueDisqus)

  // add mixins 
  Vue.mixin(formatMixin)

  Vue.component('Layout', DefaultLayout)
  Vue.component('PostLayout', PostLayout)
  // 從這裡加入外部css files 
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css'
  })

  // 加入額外的套件
  // head.script.push({
  //   src: 'https://cdnjs.cloudflare.com/ajax/libs/skrollr/0.6.30/skrollr.min.js',
  //   body: true
  // })

  Vue.component('font-awesome', FontAwesomeIcon)


}