<template>
    <div :class="colsize">
        <animated-swing name="slide">
        <div class="x_panel" v-show="show">
          <div class="x_title">
              <h3>{{title}}<small>{{stitle}}</small></h3>
                <ul class="nav navbar-right panel_toolbox">
                    <li><a class="collapse-link" @click="toggle"><i class="fa fa-chevron-up"></i></a>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" ><i class="fa fa-wrench"></i></a>
                    </li>
                    <li><a class="close-link" @click="close"><i class="fa fa-close"></i></a>
                    </li>
                </ul>
            <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <slot></slot>
            </div>
        </div>
        </animated-swing>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name:'MyPanel',
    props:{
        title:{
            type:String,
            required:true
        },
        stitle:{
            type:String,
        },
        colsize:{
            type:String,
            default:'col-md-6'
        },
        show:{
            type:Boolean,
            default:true
        },
    },
    methods:{
        ...mapActions(['increment','decrement',]),
        close(){
            /*let $panel=event.target.closest('.x_panel')
            $panel.style.display='none'*/
            this.$emit('close')
        },
        toggle(){
            let $panel=event.target.closest('.x_panel')
            let $panel_content=$panel.querySelector('.x_content')
           if(event.target.classList.contains('fa-chevron-up')){
            $panel_content.style.display='none'
            event.target.classList.replace('fa-chevron-up','fa-chevron-down')
           }else
           {
               $panel_content.style.display='block'
                event.target.classList.replace('fa-chevron-down','fa-chevron-up')
           }
        }
    }
    
}
</script>
