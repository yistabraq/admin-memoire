<template>
    <div>
      <div class="col-md-3 left_col menu_fixed">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <router-link to="/" class="site_title"><i class="fa fa-dashboard"></i> <span> Simulateur ISO</span></router-link>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="@/assets/user.png" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2>MS BARRY</h2>
              </div>
            </div>
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>Menu</h3>
                <ul class="nav side-menu" v-for="item in menu" :key="item.name">
                  <template v-if="item.children">
                  <li @click="SlideUD(item)"><a><i :class="item.icon"></i> {{item.name}} <span class="fa fa-chevron-down"></span></a>
                      <slide-up-down class="nav child_menu" tag="ul" :active="item.active" :duration="1000" v-for="li in item.children" :key="li.name">
                        <li><router-link :to="{name:li.name}">{{li.title}}</router-link></li>
                      </slide-up-down>                   
                  </li>
                  </template>
                  <template v-else>
                    <li @click="SlideUD(item)"><router-link :to="{name:item.name}"><i :class="item.icon" ></i> {{item.title}}<span class="label label-success pull-right">Go Test</span></router-link></li>
                  </template>
                </ul>
              </div>

            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings" @click="decrement">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock" @click="closeSidebar">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <router-link data-toggle="tooltip" data-placement="top" title="Logout" :to="{name:'login'}">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </router-link>
            </div>
            <!-- /menu footer buttons -->
          </div>
        </div>
        <launch :show="count" ></launch>
    </div>

</template>

<script>
import Launch from '@/components/launch.vue'
import SlideUpDown from 'vue-slide-up-down'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'MySidebar',
    components:{SlideUpDown,Launch},
    computed: mapGetters([
      'count',
    ]),
    data(){
      return {
        //show:false,
        active:false,
        menu:[
          {
            name:'Home',
            icon: 'fa fa-home',
            children:[
              { 
                name:'dashboard',
                title:'Dashboard',
              },
              { 
                name:'dashboardOne',
                title:'Dashboard 1',
              },
              { 
                name:'dashboardTwo',
                title:'Dashboard 2',
              },
            ],
            active:false
          },
          {
            name:'Issuing',
            icon: 'fa fa-credit-card',
            children:[
              { 
                name:'card',
                title:'Card',
              },
              { 
                name:'account',
                title:'Account',
              },
              { 
                name:'transaction_issuing',
                title:'Transaction',
              }
            ],
            active:false
          },
          {
            name:'Aquiring',
            icon: 'fa fa-bank',
            children:[
              { 
                name:'terminal',
                title:'Terminal',
              },
              { 
                name:'transaction_aquiring',
                title:'Transaction',
              }
            ],
            active:false
          },
          {
            name:'Projects',
            icon: 'fa fa-folder-open',
            children:[
              { 
                name:'project_add',
                title:'Projet Add',
              },
              { 
                name:'project_list',
                title:'Project List',
              }
            ],
            active:false
          },
          {
            name:'Configuration',
            icon: 'fa fa-cog',
            children:[
              { 
                name:'network',
                title:'Network',
              },
              { 
                name:'spec',
                title:'Spec',
              },
              { 
                name:'restriction',
                title:'Restriction',
              },
            ],
            active:false
          },
          {
            name:'Administration',
            icon: 'fa fa-windows',
            children:[
              { 
                name:'user',
                title:'User',
              },
              { 
                name:'page',
                title:'Page',
              },
              { 
                name:'restriction',
                title:'Restriction',
              },
            ],
            active:false
          },
          {
            name:'run',
            title:'Run Test',
            icon: 'fa fa-laptop',
            active:false
          },
        ]
      }
    },
    methods :{
    ...mapActions(['increment','decrement',]),
    showLaunch(){
      console.log('store',)
      store.commit('change')
    },
    SlideUD(item){      
          let index = this.menu.findIndex(element =>{
           return item==element
          })
      if (!item.active){
          for (let element of this.menu)
              element.active=false
          item.active=!item.active

          this.menu.slice(index,1,item)
          if(item.active){
            if(document.querySelector('.side-menu li.active'))
              document.querySelector('.side-menu li.active').classList.remove('active')
            event.target.closest('li').classList.add('active')
          } else
            event.target.closest('li').classList.remove('active')
      }else{
        item.active=!item.active
        this.menu.slice(index,1,item)
        document.querySelector('.side-menu li.active').classList.remove('active')
      }
    },
    compose(){
      document.querySelector('.compose').style.display='block'
    },
    closeSidebar(){
      document.querySelector('.left_col').style.display='none'
      document.querySelector('.eye').style.display='block'
      document.querySelector('.top_nav').style.marginLeft='0'
      document.querySelector('.right_col').style.marginLeft='0'
      document.querySelector('.tab_page').style.marginLeft='0'
    }
  }
}
</script>
