import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
    loading: require('common/image/default.jpg')
})

export default new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})
