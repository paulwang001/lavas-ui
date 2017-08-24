<template>
    <sidebar v-model="sidebarStatus">
        <!-- sidebar 内容部分 -->
        <div class="app-sidebar-content">
            <!-- 头部 -->
            <div v-if="title" class="app-sidebar-title" @click.stop="closeAndGo('/')">
                <span class="app-sidebar-title-left-icon">
                    <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft"></img>
                    <icon v-else-if="title.svgLeft" :name="title.svgLeft"></icon>
                    <v-icon light v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                </span>
                <span>{{ title.text }}</span>
                <slot name="logo" class="app-sidebar-title-right-logo">
                    <span class="app-sidebar-title-right-logo">
                        <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight"></img>
                        <icon v-else-if="title.svgRight" :name="title.svgRight"></icon>
                        <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                    </span>
                </slot>
            </div>

            <!-- 用户信息 -->
            <div v-if="user" class="app-sidebar-user">
                 <div class="user-avatar">
                    <v-icon light class="user-avatar-icon">face</v-icon>
                 </div>
                 <div class="user-info">
                     <div class="user-name"><v-icon>person</v-icon>{{user.name}}</div>
                     <div class="user-location"><v-icon>room</v-icon>{{user.location}}</div>
                     <div class="user-email"><v-icon>email</v-icon>{{user.email}}</div>
                 </div>
            </div>

            <!-- 导航列表分区块 -->
            <div v-if="blocks" class="app-sidebar-blocks">
                <mu-list @change="handleListChange" :value="activeList">
                  <mu-list-item v-for="(block, index) in blocks" :key="index" :title="block.sublistTitle" :value="index" toggleNested >
                    <mu-icon slot="left" value="send" />
                    <mu-list-item slot="nested" v-for="item in block.list" :key="item.text" @click.stop="closeAndGo(item.route)" :title="item.text" :value="item.route">
                      <mu-icon slot="left" value="grade"/>
                    </mu-list-item>  
                  </mu-list-item>
                </mu-list>
            </div>
        </div>
    </sidebar>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Sidebar from './Sidebar';

export default {
    components: {
        Sidebar
    },
    data(){
      return {
          activeList: 'list1'
      }  
    },
    computed: {
        ...mapState('appShell/appSidebar', [
            'show',
            'title',
            'blocks'
        ]),
        ...mapState('appShell', [
            'user',
            'currentApp',
        ]),
        sidebarStatus: {
            get() {
                return this.show;
            },
            set(val) {
                if (val) {
                    this.$emit('show-sidebar');
                }
                else {
                    this.$emit('hide-sidebar');
                }
            }
        }
    },
    methods: {
        ...mapActions('appShell',[
            'doAuthorized',
        ]),
        close() {
            this.sidebarStatus = false;
        },
        closeAndGo(route) {
            this.$router.push(route);
            this.close();
        },
        handleListChange (val) {
          this.activeList = val;
        }
    },
    mounted(){
        let appName = localStorage.getItem("appName");
        this.doAuthorized({userName:this.user.name,appName:appName});
    }
};
</script>

<style lang="stylus" scoped>
// 左侧触发滑动宽度
$swipe-width = 20px

ul,li
    padding 0
    margin 0
    color #fff
    list-style none
a
    text-decoration none

.app-sidebar-content
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 10)px
        height 100%

        img
            vertical-align middle
            width ($app-sidebar-left-icon-size)px
            height ($app-sidebar-left-icon-size)px
        svg
            position relative
            left 0
            top 0
            transform none
            vertical-align middle
            height ($app-sidebar-left-icon-size)px
            width ($app-sidebar-left-icon-size)px

        .material-icons
            font-size ($app-sidebar-left-icon-size)px

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle

    .app-sidebar-title-right-logo,
    .app-sidebar-block-right-logo
        float right

        img
            width 20px
            height 20px
            margin-right 10px


    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary
        text-align left

    .app-sidebar-user
        padding 0 10px
        font-size 14px
        color #5e696f
        background-color rgb(221, 233, 238)

        .user-avatar
            margin 0px auto 0 auto
            i
                font-size 48px
                line-height 48px
        .user-info
            text-align left
            >div
                margin 5px 0
                i
                    font-size 16px
                    margin-right 5px

    .app-sidebar-blocks
        text-align left

        .app-sidebar-block
            padding 1px 0

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size)px
                background #4f7c8f

            li
                padding-left 35px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                cursor: pointer;
                &:last-child
                    border none

            &:last-child
                border-bottom none
</style>
