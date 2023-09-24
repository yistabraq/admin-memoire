<template>
    <div class="launch" v-show="show" @click="closeModal">
        <div class="launch_back" @click.stop>
            <div class="launch_header">
              <div class="col-md-12">
                  <div class="col-md-4"><button class="btn btn-success btn-lg" @click="consol">00:00:{{secondes}}</button></div>
                  <div class="col-md-4"><img id="img" src="@/assets/giphy.gif" alt="..." class="img-circle image_launch" width="70%"></div>
                  <div class="col-md-4"><button class="btn btn-danger btn-lg" @click="closeModal">Close</button></div>
              </div>
            </div>
            <div class="launch_body">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-control-label">Message send</label>
                            <input type="text" class="form-control" disabled value="1">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-control-label">Message receveid</label>
                            <input type="text" class="form-control" disabled value="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <vue-typed-js :strings="option.strings" >
                        <textarea name="" class="typing form-control" cols="50" rows="10" disabled style="color:green;"></textarea>
                    </vue-typed-js>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { store } from '@/store/index'
import { setTimeout, setInterval, clearTimeout } from 'timers';
import chec from '@/assets/chec.png'
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        },
        times:{
            type:Number,
            default:60
        },
        
    },
    data(){
        return {
            secondes:this.times,
            option:{
                strings: [],
                typeSpeed: 80,
                backSpeed: 10,
                loop: false
            },
        }
    },
    mounted(){
        //this.chrono()
        this.esc()
    },
    methods:{
        ...mapActions(['increment','decrement',]),
        consol(){
            console.log('show', this.show)
            document.getElementById('img').src=chec
            this.$timer.start('chrono')
            this.option.strings=[' 25 Bytes Send to 127.0.0.1:1337^1000\n `==============Message iso ====================` ^1000\n  \t Parsed Message  ^1000\n \t MTI:    [0800]  ^1000\n \t Fields: [ 24 ] \n \t 24 - Network International identifier (NII)    [809] \n `==============End Message iso ====================` ^1000\n 25 Bytes Received from 127.0.0.1:1337^1000\n `==============Message iso ====================` ^1000\n  \t Parsed Message  ^1000\n \t MTI:    [0810]  ^1000\n \t Fields: [ 39 ] \n \t 39 - Response Code       [809]     [APPROUVED]\n `==============End Message iso ====================` ^1000\n']
            //let typed6 = new window.Typed('#typed6', this.option)
        },
        chrono(){
            if (this.secondes > 0 ){
                this.secondes --
            }else
                this.$timer.stop('chrono')

            
        },
        esc(){
            
            document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.closeModal();
            }
            })
        },
        closeModal (){
            this.increment()
        }
    },
    timers: {
        chrono: { time: 1000, autostart: false, repeat:true }
    },
}
</script>

<style>
    .launch{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(7, 7, 7, 0.3);
        z-index: 9900;
    }
    .launch_back{
        margin-left: 35%;
        margin-top: 13%;
        vertical-align: middle;
        background: white;
        width: 600px;
        height: 500px;
        z-index: 9905;
        border-radius: 5px;

    }
    .launch_header{
        border-bottom: 1px solid white;
        padding-top: 3%;
        height: 75px;
        background-color: aqua;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .image_launch{
        margin-top: -50px;
    }
    .launch_body{
        padding-top: 3%;
    }
</style>
