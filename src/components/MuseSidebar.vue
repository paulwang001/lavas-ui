<template>
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
</template>

<script>
import {mapState,mapActions} from 'vuex';

export default {
    components: {
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
        ])
        
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

</style>
