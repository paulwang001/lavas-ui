<template>
    <div id="main">
       <div id="container"></div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import Viewer from 'bpmn-js/lib/NavigatedViewer.js';
import axios from 'axios';

export default {
    name: 'bpmn',
    data() {
        return {

        };
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ])
    },
    mounted() {
        this.setAppHeader({show: true});
        this.hideBottomNav();
        let viewer = new Viewer({container:'#container'});
        var eventBus = viewer.get('eventBus');
        var overlays = viewer.get('overlays');
        var elementRegistry = viewer.get('elementRegistry');

        let overlayId=false;
        //添加元素点击事件，并添加测试overlay提示信息
        eventBus.on('element.click',function (e) {
           if(overlayId){
               overlays.remove(overlayId);
               overlayId=false;
           }
           if(e.element.type==='bpmn:UserTask'){
               overlayId=overlays.add(e.element, {
                   position: {
                       bottom: 5,
                       right: 5
                   },
                   html: `<div class="overlay-box">${e.element.businessObject.name}</div>`
               });
           }
        });
        axios({
            url:'/api/resources/340202143.bpmn',
            responseType:'application/xml',
            method:'get'
        })
        .then(function (res) {
           if(res.status!==200){
               return;
           }
           viewer.importXML(res.data,function (err) {
               if(!err){
                   viewer.get('canvas').zoom('fit-viewport');
                   //遍历所有元素
                   let filter=elementRegistry.filter(function (e) {
                       //console.log(e.type)
                       if('bpmn:UserTask'==e.type || 'bpmn:StartEvent'==e.type){
                           return true;
                       }
                       return false;
                   });
                   for(var i in filter){
                       console.log(filter[i].id);
                   }
               }
           });
        });

    }
};
</script>
<style lang="stylus">
.djs-overlay
    width 200px
    height 120px
    padding 8px
    border-radius 8px
    border solid 3px rgba(36, 126, 36, 0.78)
    background  rgba(233, 239, 233, 0.89)

</style>
<style lang="stylus" scoped>
#container
  height 100%
  width 100%
  overflow auto
</style>
