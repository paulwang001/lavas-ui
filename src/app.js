/**
 * @file entry
 * @author paulwang007(12900985@qq.com)
 */

import Vue from 'vue';
import Vuetify from 'vuetify';
import MuseUI from 'muse-ui';
import App from './App.vue';
import Muse from './Muse.vue';

import {createRouter} from './router.js';
import store from './store';
import ProgressBar from '@/components/ProgressBar.vue';
import FastClick from 'fastclick';
import Icon from 'vue-svg-icon/Icon.vue';

import '@/assets/styles/global.styl';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题

// 全局的进度条，在组件中可通过 $loading 访问
let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
document.body.appendChild(loading.$el);

FastClick.attach(document.body);

Vue.use(Vuetify);
Vue.use(MuseUI);

Vue.component('icon', Icon);

Vue.config.productionTip = false;

Vue.mixin({

    // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
    beforeRouteUpdate(to, from, next) {

         // asyncData方法中包含异步数据请求
        let asyncData = this.$options.asyncData;

        if (asyncData) {
            loading.start();
            asyncData.call(this, {
                store: this.$store,
                route: to
            }).then(() => {
                loading.finish();
                next();
            }).catch(next);
        }
        else {
            next();
        }
    }
});

/* eslint-disable no-new */

export function createApp(routerParams) {
    let router = createRouter(routerParams);

    // 此时异步组件已经加载完成
    router.beforeResolve((to, from, next) => {
        let matched = router.getMatchedComponents(to);
        let prevMatched = router.getMatchedComponents(from);

        // [a, b]
        // [a, b, c, d]
        // => [c, d]
        let diffed = false;
        let activated = matched.filter((c, i) => {
            let ret = diffed || (diffed = (prevMatched[i] !== c));
            return ret;
        });

        if (!activated.length) {
            return next();
        }

        loading.start();
        Promise.all(activated.map(c => {

            /**
             * 两种情况下执行asyncData:
             * 1. 非keep-alive组件每次都需要执行
             * 2. keep-alive组件首次执行，执行后添加标志
             */
            if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
                return c.asyncData.call(c, {
                    store,
                    route: to
                }).then(() => {
                    c.asyncDataFetched = true;
                });
            }
        })).then(() => {
            loading.finish();
            next();
        }).catch(next);
    });

    const app = new Vue({
        router,
        store,
        ...App
    });
    
    return {app, router, store};
}
