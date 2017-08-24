<template>
    <v-app id="example-2" toolbar>
        <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="indigo darken-4" dark>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Toolbar</v-toolbar-title>
        </v-toolbar>
        <main>
            <v-container fluid>
                <div class="title">Click on sidebar to re-open.</div>
                <!--v-router-->
            </v-container>
        </main>
    </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import AppBottomNavigator from '@/components/AppBottomNavigator';

export default {
    name: 'app',
    components: {
        AppHeader,
        AppSidebar,
        AppBottomNavigator
    },
    data() {
        return {
            userName:"administrator",
            password:"123456"
        };
    },
    computed: {
        ...mapState('appShell', [
            'appHeader',
            'appBottomNavigator',
            'authenticated',
            'pageTransitionName'
        ])
    },
    methods: {
        ...mapActions('appShell', [
            'setPageSwitching',
            'setAuthenticated',
            'setUser'
        ]),
        ...mapActions('appShell/appSidebar', [
            'showSidebar',
            'hideSidebar'
        ]),
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'activateBottomNav'
        ]),
        handleLogin(){
            this.setAuthenticated({authenticated:true});
            this.setUser({user:{name:this.userName,location:'630#604',email:'paul.wang@seadun.com'}});
        },
        handleHeaderAction(e){
            let action = this.appHeader.actions[e.actionIdx].action;
            if(action=='logout'){
                this.setAuthenticated({authenticated:false});
                this.setAppHeader({show:false});
                this.$router.push({path:'/home/login'});
            }
        },
        handleBeforeEnter(el) {
            this.setPageSwitching(true);
        },
        handleAfterEnter(el) {
            el.scrollTop = el.dataset.scrollTop;
            this.setPageSwitching(false);
        },
        handleBeforeLeave(el) {
            el.dataset.scrollTop = el.scrollTop;
        },
        handleClickHeaderBack() {
            this.$router.go(-1);
        },
        handleClickHeaderMenu() {
            this.showSidebar();
        },
        handleHideSidebar() {
            this.hideSidebar();
        },
        handleShowSidebar() {
            this.showSidebar();
        },
        handleClickBottomNav({name}) {
            this.activateBottomNav(name);
        }
    }
};
</script>

<style lang="stylus">
label
   padding:5px
body
    background-color: $material-theme.bg-color

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    position static

</style>

<style lang="stylus" scoped>
.app-shell
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    display flex
    flex-direction column
    transform translate3d(0, 0, 0)

    .app-shell-header
        position fixed
        top 0
        left 0
        right 0

    .app-shell-footer
        position fixed
        bottom 0
        left 0
        right 0

    .app-view-wrapper
        flex 1
        position relative
        overflow hidden

        .app-view
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            overflow-x hidden
            overflow-y auto
            transition transform 0.4s cubic-bezier(.55, 0, .1, 1)
            background: $material-theme.bg-color
            color: $material-theme.text-color

            // 隐藏掉scrollbar
            &::-webkit-scrollbar
                width 0px
                background transparent

            &.app-view-with-header
                top $app-header-height

            &.app-view-with-footer
                bottom $app-footer-height

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)
</style>
