<template>
  <div class="app-layout">
    <muse-header
        class="app-shell-header"
        :show="authenticated"
        @click-action="handleHeaderAction"
        @click-menu="handleClickHeaderMenu"
        @click-back="handleClickHeaderBack">
    </muse-header>  
    <mu-row class="app-content">
       <mu-col desktop="20" class="app-menu">
         <muse-sidebar  @hide-sidebar = "handleHideSidebar"  @show-sidebar = "handleShowSidebar"/>
       </mu-col>
       <mu-col desktop="80" class="app-body">
          <div class="breadcrumb">
            <mu-breadcrumb>
              <mu-breadcrumb-item href="/">主页</mu-breadcrumb-item>
              <mu-breadcrumb-item href="/">组织机构</mu-breadcrumb-item>
              <mu-breadcrumb-item>机构列表</mu-breadcrumb-item>
            </mu-breadcrumb>
          </div>
          <div class="body">
            <transition
                :name="pageTransitionName"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave">
                <keep-alive>
                    <router-view
                        :key="$route.fullPath"
                        v-if="!$route.meta.notKeepAlive"
                        class="app-view"
                        :class="{
                            'app-view-with-header': appHeader.show,
                            'app-view-with-footer': appBottomNavigator.show
                        }">

                    </router-view>
                </keep-alive>
            </transition>
            <transition
                :name="pageTransitionName"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave">
                <router-view
                    :key="$route.fullPath"
                    v-if="$route.meta.notKeepAlive"
                    class="app-view"
                    :class="{
                        'app-view-with-header': appHeader.show,
                        'app-view-with-footer': appBottomNavigator.show
                    }"></router-view>
            </transition>
          </div>
       </mu-col>
    </mu-row>
    <mu-row class="app-footer">
       <mu-col desktop="100">
         SD-UI ©2017 Created by Seadun.
       </mu-col>
    </mu-row>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import MuseHeader from '@/components/MuseHeader';
import MuseSidebar from '@/components/MuseSidebar';
export default {
  name: 'app',
  components: {
      MuseHeader,
      MuseSidebar
  },
  data () {
    return {
      activeTab: 'tab1',
      activeList: 'list1'
    }
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
    handleHeaderAction(e){
        let action = this.appHeader.actions[e.actionIdx].action;
        if(action=='logout'){
            this.setAuthenticated({authenticated:false});
            this.setAppHeader({show:false});
            this.$router.push({path:'/home/login'});
        }
    },
    handleClickHeaderBack() {
        this.$router.go(-1);
    },
    handleClickHeaderMenu() {
        //this.showSidebar();
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
    handleHideSidebar() {
        this.hideSidebar();
    },
    handleShowSidebar() {
        this.showSidebar();
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    handleListChange (val) {
      this.activeList = val
    }
  }
}
</script>
<style>
    .app-layout{
      background-color: #e0e0e0;
      height: 100%;    
    }

    
    .app-menu{
        height: 100%;
        background-color: rgba(255,255,255,0.5);
    }
    .breadcrumb{
       padding: 6px;
       border-bottom: solid 1px #bbb;
       height: 34px;
        
    }
    .app-content{
        height: calc(100% - 90px);
    }
    .app-body{
        height: 100%;
        
    }
    .app-body .body{
        height: calc(100% - 34px);
        padding: 10px;
    }
    .app-body .body .app-view{
        background-color: rgba(255,255,255,0.7);
        height: 100%;
        padding: 10px;
    }
    .app-footer{
        height: 26px;
        padding: 4px;
        background-color: #444;
        color: #AAA;
    }
</style>