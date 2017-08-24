/**
 * @file search router
 * @author paulwang007(12900985@qq.com)
 */

import Bpmn from '@/pages/bpmn/Bpmn.vue';

export default {
    routes: [
        {
            path: '/bpmn',
            name: 'bpmn',
            component: Bpmn
        }
    ]
};
