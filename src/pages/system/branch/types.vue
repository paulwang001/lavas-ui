<template>
    
    <div class="branch-types">
        <header><h4>组织机构类别</h4></header>
        <div class="type-list">
            <a class="type-box"  @click.stop="branchList(tp)" v-for="tp in types" :key="tp.code">
               <icon name="cup"/>    
               <span>{{tp.name}}</span>
            </a> 
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import axios from 'axios';
    
    export default {
        name:"branchTypes",
        data () {
            return {
                
            }
        },
        computed: {
          ...mapState('system/branch',[
              'types'
          ])
            
        },
        components: {
        
        },
        methods: {
            ...mapActions('appShell/appHeader', [
              'setAppHeader'
            ]),
            branchList(tp) {
               console.log('go type-->',tp)
               this.$router.push(
                 {
                   name:'branch-list',
                   params:{
                      typeCode:tp.code
                   }
                 }
               );
            }
        },
        async asyncData({store,route}) {
            await store.dispatch('system/branch/getBranchTypes');
        },
        activated(){
            this.setAppHeader({show:true});
        }
    }
</script>

<style lang="stylus" scoped>
.type-box
    display inline-block
    margin 5px
    padding 10px 
    width 80px
    height 80px
    background-color rgba(25,158,216,0.3)
    border solid 2px rgba(25,158,216,0.9)
    text-decoration none
    color #666
    cursor pointer

    & >span

       display inline-block
    
</style>