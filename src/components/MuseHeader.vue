<template>
    <transition  name="slide-down" v-show="show">
        <mu-row class="app-header">
           <mu-col desktop="20" class='app-logo'>
             <mu-icon-button v-if="showMenu" icon="menu" @click.native="handleClick('menu')" />
             <mu-icon-button v-if="showBack" icon="arrow_back" @click.native="handleClick('back')" />
             <div v-if="showLogo" @click="handleClick('logo')">
                <slot name="logo">
                    <icon :name="logoIcon" class="app-header-icon"></icon>
                </slot>
             </div>
             <span class="app-title">{{ title }}</span>
           </mu-col>
           <mu-col desktop="65" class="app-nav">
              <mu-tabs :value="currentApp.name" @change="handleTabChange" class="app-tab">
                  <mu-tab v-for="app in applications" :key="app.name" :value="app.name" :title="app.title">
                    <icon v-if="app.svg" :name="app.svg" class="app-header-icon"></icon>
                    <v-icon v-else-if="app.icon" class="app-header-icon">{{ app.icon }}</v-icon>
                  </mu-tab>
              </mu-tabs>
           </mu-col>
           <mu-col desktop="15" class="app-profile">
             <slot name="actions"
                    v-for="action, actionIdx in actions"
                    :icon="action.icon"
                    :route="action.route">
                    <v-btn
                        icon="icon"
                        @click.native="handleClick('action', {actionIdx, route: action.route})">
                        <icon v-if="action.svg" :name="action.svg" class="app-header-icon"></icon>
                        <v-icon v-else-if="action.icon" class="app-header-icon">{{ action.icon }}</v-icon>
                    </v-btn>
             </slot>
           </mu-col>
        </mu-row>
    </transition>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'appHeader',
    computed: {
        ...mapState('appShell/appHeader', [
            'show',
            'showMenu',
            'showBack',
            'showLogo',
            'logoIcon',
            'title',
            'actions'
        ]),
        ...mapState('appShell', [
            'currentApp',
            'applications',
            'isPageSwitching'
        ])
    },
    data(){
      return {
          currentAppCode:false
      }  
    },
    mounted(){
       this.getUserApplications({userId:'179005'});
    },
    methods: {
        ...mapActions('appShell',[
            'changeApp',
            'getUserApplications'
        ]),
        /**
         * 处理按钮点击事件
         *
         * @param {string} source 点击事件源名称 menu/logo/action
         * @param {Object} data 随点击事件附带的数据对象
         */
        handleClick(source, {actionIdx, route} = {}) {

            // 页面正在切换中，不允许操作，防止滑动效果进行中切换
            if (this.isPageSwitching) {
                return;
            }
            let eventData = {};

            // 点击右侧动作按钮，事件对象中附加序号
            if (source === 'action') {
                eventData.actionIdx = actionIdx;
            }

            // 发送给父组件，内部处理
            this.$emit(`click-${source}`, eventData);
            console.log(eventData);
            // 发送全局事件，便于非父子关系的路由组件监听
            EventBus.$emit(`app-header:click-${source}`, eventData);

            // 如果传递了路由对象，进入路由
            if (route) {
                this.$router.push(route);
            }
        },
        handleTabChange (val) {
          this.currentAppCode= val;   
          console.log(val)    
          for(let i in this.applications){
              let app = this.applications[i];
              if(val === app.name){
                  this.changeApp(app);
                  if(app.home){
                      this.$router.push(app.home);      
                  }
                  break;
              }
          }
        },
        handleAppClick({app}={}){
            this.changeApp(app);
            if(app && app.home){
                this.$router.push(app.home);
            }
        }
    }
};
</script>

<style lang="css" scoped>
    .app-header{
      background-color: rgb(51, 56, 62);
      height: 64px;
      padding: 0px 0;
      color: white;
    }
    .app-header .mu-icon-button{
        float: left;
    }
    .app-logo{
        height: 100%;
    }
    .app-title{
        padding: 4px;
        line-height: 56px;
        font-size: 20px;
        float: left;
    }
    .app-profile{
        height: 100%;
        padding-top: 9px;
    }
    .app-profile .btn{
       float: right;
    }
    .mu-tabs{
      background-color: rgba(255,255,255,0.1);
    }
    .mu-tab-link{
        padding-top: 6px;
    }
    
    .app-header .mu-tab-link-highlight{
      background-color: #fff; 
      height: 3px;
    }

</style>
