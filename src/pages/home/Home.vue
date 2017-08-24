<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <v-card class="card--flex-toolbar">
                
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'home',
    props: {},
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ])
    },
    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        this.setAppHeader({
            show: true,
            showMenu: true,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                },
                {
                    svg: 'man',
                    action: 'logout'
                }
            ]
        });
        //this.activateBottomNav('home');
        //this.showBottomNav();
    }
};
</script>

<style lang="stylus" scoped>
$text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)
.card--flex-toolbar
    margin-top:50px
</style>
