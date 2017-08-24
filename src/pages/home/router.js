/**
 * @file home router
 * @author paulwang007(12900985@qq.com)
 */

import Home from '@/pages/home/Home.vue';
import User from '@/pages/home/User.vue';
import Login from '@/pages/home/Login.vue';

export default {
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/home/user',
            name: 'user',
            component: User
        },
        {
            path: '/home/login',
            name: 'login',
            component: Login
        }
    ]
};
