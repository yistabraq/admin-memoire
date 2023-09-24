<template>
    <div class="row" >
        <my-panel title="Tabs" stitle="add" colsize="col-md-8">
            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Project 1</a>
                        </li>
                        <li role="presentation" class=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Project 2</a>
                        </li>
                        <li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Project 3</a>
                        </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                        <div class="col-md-6 col-sm-4 col-xs-12 profile_details">
                            <div class="well profile_view active">
                                <div class="col-sm-12">
                                    <h4 class="brief"><i>Test Issuing</i></h4>
                                    <div class="left col-xs-9">
                                        <h2>Balance Inquiry</h2>
                                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-default btn-xs">
                                                <input type="radio" name="options" id="option1" autocomplete="off"><i class="fa fa-clock-o"></i>
                                            </label>
                                            <label class="btn btn-default btn-xs">
                                                <input type="radio" name="options" id="option2" autocomplete="off"><i class="fa fa-check"></i>
                                            </label>
                                            <label class="btn btn-danger active btn-xs">
                                                <input type="radio" name="options" id="option3" autocomplete="off" checked><i class="fa fa-close"></i>
                                            </label>
                                        </div>
                                        <br>
                                        <br>
                                    </div>
                                    <div class="right col-xs-3 text-center">
                                        <img src="@/assets/no.png" alt="" class="img-circle img-responsive">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 bottom text-center">
                                    <div class="col-xs-12 col-sm-12 col-md-12 emphasis">
                                     <button class="btn btn-sm btn-info" @click="decrement"><i class="fa fa-play"></i> Run</button>
                                     <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i> Edit Request</button>
                                     <button class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Edit Response</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-4 col-xs-12 profile_details">
                            <div class="well profile_view">
                                <div class="col-sm-12">
                                    <h4 class="brief"><i>Test Issuing</i></h4>
                                    <div class="left col-xs-9">
                                        <h2>Purchase</h2>
                                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-default  btn-xs">
                                                <input type="radio" name="options" id="option1" autocomplete="off"><i class="fa fa-clock-o"></i>
                                            </label>
                                            <label class="btn btn-success active btn-xs">
                                                <input type="radio" name="options" id="option2" autocomplete="off"><i class="fa fa-check"></i>
                                            </label>
                                            <label class="btn btn-default btn-xs">
                                                <input type="radio" name="options" id="option3" autocomplete="off" checked><i class="fa fa-close"></i>
                                            </label>
                                        </div>
                                        <br>
                                        <br>
                                    </div>
                                    <div class="right col-xs-3 text-center">
                                        <img src="@/assets/chec.png" alt="" class="img-circle img-responsive">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 bottom text-center">
                                    <div class="col-xs-12 col-sm-12 col-md-12 emphasis">
                                     <button class="btn btn-sm btn-info" @click="decrement"><i class="fa fa-play"></i> Run</button>
                                     <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i> Edit Request</button>
                                     <button class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Edit Response</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-4 col-xs-12 profile_details">
                            <div class="well profile_view">
                                <div class="col-sm-12">
                                    <h4 class="brief"><i>Test Issuing</i></h4>
                                    <div class="left col-xs-9">
                                        <h2>Ministatement</h2>
                                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-primary active btn-xs">
                                                <input type="radio" name="options" id="option1" autocomplete="off"><i class="fa fa-clock-o"></i>
                                            </label>
                                            <label class="btn btn-default btn-xs">
                                                <input type="radio" name="options" id="option2" autocomplete="off"><i class="fa fa-check"></i>
                                            </label>
                                            <label class="btn btn-default btn-xs">
                                                <input type="radio" name="options" id="option3" autocomplete="off" checked><i class="fa fa-close"></i>
                                            </label>
                                        </div>
                                        <br>
                                        <br>
                                    </div>
                                    <div class="right col-xs-3 text-center">
                                        <img src="@/assets/clock.jpg" alt="" class="img-circle img-responsive">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 bottom text-center">
                                    <div class="col-xs-12 col-sm-12 col-md-12 emphasis">
                                     <button class="btn btn-sm btn-info" @click="decrement"><i class="fa fa-play"></i> Run</button>
                                     <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i> Edit Request</button>
                                     <button class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Edit Response</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                        <ul class="menu">
                            <li class="list" @click="accordion"><a href="#" >List 1 </a> 
                                <ul class="items">
                                    <li><a href="#"> Run </a></li>
                                    <li><a href="#"> Item 1-2</a></li>
                                    <li><a href="#"> Item 1-3</a></li>
                                </ul>
                            </li>
                            <li class="list" @click="accordion"><a href="#" >List 2 </a> 
                                <ul class="items">
                                    <li><a @click="decrement"> Run <i class="fa fa-play-circle pull-right" style="color:green"></i></a></li>
                                    <li><a href="#"> Request <i class="fa fa-edit pull-right" style="color:yellow"></i></a></li>
                                    <li><a href="#"> Response <i class="fa fa-edit pull-right" style="color:yellow"></i></a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                          <p>xxFood truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo
                            booth letterpress, commodo enim craft beer mlkshk </p>
                    </div>
                </div>
            </div>
        </my-panel>
        <my-panel title="Proprity" colsize="col-md-4">
            <div class="panel panel-primary">
                <div class="panel-body">
                    <h4 class="text-on-pannel text-primary">Issuer</h4>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="issradio" color="primary-o" checked>
                            <i slot="extra" class="icon fa fa-check"></i>
                            Default
                        </p-radio>
                        <br>
                        <br>
                        <p-radio class="p-icon p-round p-tada" name="issradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i> Other
                        </p-radio>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="issradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i>
                            Random
                        </p-radio>
                        <br>
                        <br>
                        <select class="form-control input-sm" size="mini">
                            <option>Values Valid</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-body">
                    <h4 class="text-on-pannel text-primary">Card </h4>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="cardradio" color="primary-o" checked>
                            <i slot="extra" class="icon fa fa-check"></i>
                            Default
                        </p-radio>
                        <br>
                        <br>
                        <p-radio class="p-icon p-round p-tada" name="cardradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i> Other
                        </p-radio>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="cardradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i>
                            Random
                        </p-radio>
                        <br>
                        <br>
                        <select class="form-control input-sm" size="mini">
                            <option>Values Valid</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-body">
                    <h4 class="text-on-pannel text-primary">Acquirer </h4>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="acqradio" color="primary-o" checked>
                            <i slot="extra" class="icon fa fa-check"></i>
                            Default
                        </p-radio>
                        <br>
                        <br>
                        <p-radio class="p-icon p-round p-tada" name="acqradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i> Other
                        </p-radio>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="acqradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i>
                            Random
                        </p-radio>
                        <br>
                        <br>
                        <select class="form-control input-sm" size="mini">
                            <option>Values Valid</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-body">
                    <h4 class="text-on-pannel text-primary"> System</h4>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="sysradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i>
                            Default
                        </p-radio>
                        <br>
                        <br>
                        <p-radio class="p-icon p-round p-tada" name="sysradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i> Other
                        </p-radio>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <p-radio class="p-icon p-round p-tada" name="sysradio" color="primary-o">
                            <i slot="extra" class="icon fa fa-check"></i>
                            Random
                        </p-radio>
                        <br>
                        <br>
                        <select class="form-control input-sm" size="mini">
                            <option>Values Valid</option>
                        </select>
                    </div>
                </div>
            </div>
        </my-panel>
        <launch :show.sync="show" @close="show=false"></launch>
    </div>  
</template>
<script>
import MyPanel from '@/components/panel.vue'
import Launch from '@/components/launch.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    components:{MyPanel,Launch},
    data(){
        return{
            show:false,
            active:false,
            panel1Form: {
                openOn: "right"
            }
        }
    },
    methods: {
        ...mapActions(['increment','decrement',]),
        accordion(e){
            const list = document.querySelectorAll('.list');
            //console.log('ll',list.length)
            e.stopPropagation(); 
            const a=e.target.parentElement
            if(a.classList.contains('active')){
                a.classList.remove('active');
            }
            /*else if(a.parentElement.parentElement.classList.contains('active')){
                a.classList.add('active');
            }*/
            else{
                for(let i=0; i < list.length; i++){
                    //console.log('tag', list[i].classList.contains('active'))
                    list[i].classList.remove('active');
                }
                    a.classList.add('active');
                }
        }
  }
}
</script>
<style lang="scss" scoped>
    .text-on-pannel {
        background: #fff none repeat scroll 0 0;
        height: auto;
        margin-left: 20px;
        padding: 3px 5px;
        position: absolute;
        margin-top: -30px;
        border: 1px solid #337ab7;
        border-radius: 8px;
    }
    .panel{
        margin-top: 10px
    }
    ul.menu{
   padding: 0;
   list-style: none;
   width: 400px;
   margin: 20px auto;
   font-family: 'Century Gothic'; 
   box-shadow: 0px 0px 25px #00000070;
   clear: both;
   display: table;
   .list{
      font-size: 14px;
      border-bottom:1px solid #324252;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      height: 50px;
      vertical-align: sub;
      background: #3e5165;
      clear: both;
      &:after{
         content: "\f107";
         font-family:FontAwesome;
         position: absolute;
         right: 17px;
         top: 17px;
         padding: 0px 5px;
         color:#fff;
      }
      &:before{
         content: '\f07b';
         font-family:FontAwesome;
         position: absolute;
         left: 17px;
         top: 17px;
         padding: 0px 5px;
         color:#fff;  
      }
      a{
         text-decoration: none;
         color: #fff;
         padding: 17px 0px 17px 45px;
         display: block;
         height: 100%;
         box-sizing: border-box;
         &:hover{
            background-color: #324252;
            transition:  300ms all;
            color: #09fbd2;
         }
         
      }
      .items{
         height: 0px;
         overflow: hidden;
         a{
            padding:17px;
            &:hover{
               background-color: #3f5d79;
               color:#fff;
               transition:  300ms all;

            }
         }
      }
      &:last-child{
         border-bottom:none;
      }
   }
   .active{
      &:after{
         content: "\f106";
         font-family:FontAwesome;
         position: absolute;
         right: 17px;
         top: 17px;
         padding: 0px 5px;
         color:#fff;
      }
      &:before{
         content: '\f07c';
         font-family:FontAwesome;
         position: absolute;
         left: 17px;
         top: 17px;
         padding: 0px 5px;
         color:#fff;  
      }
      >.items{
         display: block;
         background: #23313f;
         padding: 0px;
         height: auto;
         color:#fff;
         transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
         transition: all 200ms;
         clear: both;
         float: left;
         width: 100%;
         li{
            padding:0px;
            border-bottom:1px solid #324252;
            list-style: none;
         }
         li:last-child{
            border-color:transparent;
            padding-bottom: 0px;
         }
         .active{
            > .items{
               background-color: #2f4b67;
            }
         }
      }
      > a{
         color:#46efa4;
         text-transform: uppercase;
         font-weight: bold;

      }
      .list{
         background: #697d92;
         a{
            padding: 17px 0px 17px 45px;

         }
      }
   }
}


</style>