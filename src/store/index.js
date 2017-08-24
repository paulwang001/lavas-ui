/**
 * @file store index
 * @author paulwang007(12900985@qq.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';
import system from './modules/system';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appShell,
        system
    }
});
