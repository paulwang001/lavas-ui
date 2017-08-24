<template>
    <v-app id="loginApp">
        <main>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex xs4 offset-xs4>
                        <v-toolbar dark class="primary">
                            <v-toolbar-title>身份认证</v-toolbar-title>
                        </v-toolbar>
                        <v-card height="240px">
                            <v-flex xs12 sm8 offset-sm2>
                                <v-text-field
                                    name="userName"
                                    label="用户名"
                                    prepend-icon="person"
                                    v-model="userName"
                                    value=""
                                    single-line
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8 offset-sm2>
                                <v-text-field
                                    name="password"
                                    label="密码"
                                    prepend-icon="lock"
                                    v-model="password"
                                    value=""
                                    type="password"
                                    single-line
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8 offset-sm2>
                                <v-btn primary dark @click.native="handleLogin">
                                    <v-icon>cloud_done</v-icon>
                                    <label>登录</label>
                                </v-btn>
                            </v-flex>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>
<script >
    import {mapState, mapActions} from 'vuex';
    export default {
        name:"login",
        data(){
            return {
                userName:"administrator",
                password:"123456"
            };
        },
        methods:{
            ...mapActions('appShell', [
                'setAuthenticated',
                'setUser'
            ]),
            ...mapActions('appShell/appHeader', [
                'setAppHeader',
            ]),
            handleLogin(){
                this.setAuthenticated({authenticated:true,token:'XXXXXXXXXXX'});
                this.setUser({user:{name:this.userName,location:'630#604',email:'paul.wang@seadun.com'}});
                let appName=localStorage.getItem("appName") ||'home';
                this.$router.push({path:`/${appName}`});

            }
        }
    }
</script>
<style lang="stylus" scoped>
    .app-shell
       .app-view-wrapper
          .app-view
              background: #7b7b8b
</style>
