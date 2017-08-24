<template>
    <div id="sys">
        <h3>222fffffff</h3>
        <v-btn icon="icon">
            <icon name="man" class="large" width="64px" height="64px" ></icon>
        </v-btn>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'system',
    data() {
        return {
            query: '',
            loading: false,
            data: []
        };
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        async search() {

            // 把数据清空
            this.data = [];

            // 显示加载动画
            this.loading = true;

            // 让当前输入框失去焦点
            this.$el.querySelector('.search-input').blur();

            // 等待 1s，模拟加载中的效果
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 设置搜索结果数据
            this.data = [
                {
                    title: 'Ali Connors',
                    headline: 'Brunch this weekend?',
                    subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
                    action: '15 min'
                },
                {
                    title: 'me, Scrott, Jennifer',
                    headline: 'Summer BBQ',
                    subtitle: 'Wish I could come, but I\'m out of town this weekend.',
                    action: '2 hr'
                },
                {
                    title: 'Sandra Adams',
                    headline: 'Oui oui',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?',
                    action: '6 hr'
                },
                {
                    title: 'Trevor Hansen',
                    headline: 'Birthday gift',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                    action: '12 hr'
                },
                {
                    title: 'Britta Holt',
                    headline: 'Recipe to try',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    action: '18 hr'
                }
            ];

            this.loading = false;
        }
    },
    activated() {
        this.setAppHeader({show: true});
        this.hideBottomNav();
    }
};
</script>

<style lang="stylus" scoped>

header
    display flex
    align-items center
    height 52px
    //box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

form
    flex 1

.search-input
    width 100%
    outline none
    font-size 16px
    height 50px

.search-btn
    color #959595

.search-loading
    margin-top 30%
    display flex
    justify-content center

.search-content
    margin-top 20px

li
    list-style-type none
.large
   width 48px
   height 48px
</style>
