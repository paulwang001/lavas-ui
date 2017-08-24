/**
 * @file client entry
 * @author paulwang007(12900985@qq.com)
 */

import 'babel-polyfill';
import {createApp} from '@/app';
import pageRouter from './router';

const {app, router} = createApp(pageRouter);

router.onReady(() => app.$mount('#app'));
