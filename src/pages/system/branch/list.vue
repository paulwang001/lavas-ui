<template>
    <v-layout row>
       <v-flex xs10 sm10 offset-xs1 offset-sm1>
          <v-card class="grid">
             <v-toolbar class="white">
                 <v-btn icon light>
                    <v-icon class="">arraw_back</v-icon>
                 </v-btn>
                 <v-subheader>组织机构列表</v-subheader>
             </v-toolbar>
             
              <v-container fluid>
                  <v-expansion-panel v-if="branch">
                    <v-expansion-panel-content>
                      <a slot="header">{{branch.name}}</a>
                      <v-card v-if='branch.children'>
                          <v-expansion-panel-content :key="child.code" v-for="child in branch.children">
                              <a slot="header">{{child.name}}</a>
                          </v-expansion-panel-content>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
              </v-container>
              <v-tabs dark v-model="branchTypeIndex">
                <v-tabs-bar slot="activators" class="light">
                  <v-tabs-item
                    v-for="tab in types"
                    :key="tab.code"
                    :href="'#' + tab.code"
                    ripple
                  >
                   {{tab.name}}
                  </v-tabs-item>
                  <v-tabs-slider class="yellow"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-content
                  v-for="tab in types"
                  :key="tab.code"
                  :id="tab.code"
                >
                  <v-card flat>
                      <h2>{{tab.name}}</h2>
                      <v-list v-if="branch">
                        <v-subheader v-text="branch.name"></v-subheader>  
                        <v-list-tile >

                        </v-list-tile>
                      </v-list>

                  </v-card>
                </v-tabs-content>
              </v-tabs>   
          </v-card>
       </v-flex>
    </v-layout>
    
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    export default {
        name:"branchList",
        data () {
            return {
               branchTypeIndex:''    
            }
        },
        computed: {
          ...mapState('system/branch',[
              'branch',
              'types'
          ])  
        },
        updated(){
            if(this.branchTypeIndex){
              this.$store.dispatch('system/branch/getBranchList',{type:this.branchTypeIndex});
            }
        },
        methods: {
            ...mapActions('appShell/appHeader', [
              'setAppHeader'
            ]),
            branchList(tp) {
               console.log(tp)
               //this.$router.push()
            }
        },
        async asyncData({store,route}) {
            console.log('route.params',route.params['typeCode'])
            await store.dispatch('system/branch/getBranchList',{type:route.params['typeCode']});
        },
        activated(){
            this.setAppHeader({show:true});
        }
          
            
    }
</script>

<style lang="stylus" scoped>
.light
    background-color #abc3d7    
</style>