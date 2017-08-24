/**
 * @file detail router
 * @author paulwang007(12900985@qq.com)
 */

import Detail from '@/pages/detail/Detail.vue';

export default {
    routes: [
        {
            path: '/detail/:id',
            name: 'detail',
            component: Detail,
            meta: {
                notKeepAlive: true
            }
        }
    ]
};
