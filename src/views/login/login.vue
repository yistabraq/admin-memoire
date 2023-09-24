<template>
    <div id="login" >
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>

      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <form>
              <h1>Login Form</h1>
              <br>
              <div>
                <input type="text" class="form-control" placeholder="Username" v-model.trim="login.username" @input="$v.login.username.$touch" />
                <span class="fa fa-user" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.login.username.required && show_error" class="span_error"> this field is required </span>
              </div>
              <div>
                <input type="password" class="form-control" placeholder="Password" v-model="login.password" @input="$v.login.password.$touch" />
                <span class="fa fa-lock" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.login.username.required && show_error" class="span_error"> this field is required </span>
              </div>
              <div>
                <button class="btn btn-lg btn-success col-md-12" @click.prevent="userLogin" >Log in</button>
              </div>
              <div>
                <button class="btn btn-lg btn-primary col-md-12" @click.prevent="resetLogin" >Clear</button>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">
                  <a href="#signup" class="to_register btn btn-info" style="float:right;" @click="show_error=false"> Create Account </a>
                </p>

                <div class="clearfix"></div>
                <br />
              </div>
            </form>
          </section>
        </div>

        <div id="register" class="animate form registration_form">
          <section class="login_content">
            <form>
              <h1>Create Account</h1>
              <div>
                <input type="text" class="form-control " placeholder="Username" v-model.trim="newUser.username" @input="$v.newUser.username.$touch" />
                <span class="fa fa-user" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.newUser.username.required && show_error" class="span_error"> this field is required </span>
              </div>
              <div>
                <input type="email" class="form-control" placeholder="Email" v-model.trim="newUser.email" @input="$v.newUser.email.$touch" />
                <span class="fa fa-envelope" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.newUser.email.required && show_error" class="span_error"> this field is required </span>
                <span v-if="!$v.newUser.email.email && show_error" class="span_error"> this mail is not good </span>
              </div>
              <div>
                <input type="password" class="form-control error_login" placeholder="Password" v-model="newUser.password" @input="$v.newUser.password.$touch" />
                <span class="fa fa-lock" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.newUser.password.required && show_error" class="span_error"> this field is required </span>
              </div>
              <div>
                <input type="password" class="form-control" placeholder="Confirm Password" v-model="newUser.password2" @input="$v.newUser.password2.$touch" />
                <span class="fa fa-lock" style="float: right;margin-top: -50px;margin-right: 10px;font-size: 16px !important;"></span>
                <span v-if="!$v.newUser.password2.sameAsPassword && show_error" class="span_error"> Passwords must be identical  </span>
              </div>
              <div>
                <button class="btn btn-lg btn-success col-md-12" @click.prevent="createUser">Create account</button>
              </div>
              <div>
                <button class="btn btn-lg btn-primary col-md-12" @click.prevent="resetCreate">Clear</button>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">
                  <a href="#signin" class="to_register btn btn-info" style="float:right;" @click="show_error=false"> Log in </a>
                </p>

                <div class="clearfix"></div>
                <br />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import config from './config/nasa'
require('particles.js')
export default {
    name:'login',
    mounted(){
      particlesJS('login', config)
    },
    data(){
      return {
          show_error:false,
          login:{
            username :'',
            password :'',
          },
          newUser:{
            username :'',
            email :'',
            password :'',
            password2 :'',
          }
      }
    },
    validations: {
      login:{
        username :{
          required
        },
        password :{
          required
        },
      },
      newUser:{
        username :{
          required,
        },
        email :{
          required,
          email,
        },
        password :{
          required
        },
        password2 :{
          sameAsPassword: sameAs('password')
        },
      }
    },
    methods:{
      userLogin(){
        this.show_error=true
        this.$v.$touch()
        if(this.$v.login.$invalid){
          console.log('Error', this.$v.login)
        }else{
          this.$router.push('/')
        }
      },
      createUser(){
        this.show_error=true
        this.$v.$touch()
        if(this.$v.createUser.$invalid){
          console.log('Error', this.$v.createUser)
        }else{
          this.$router.push('/')
        }
      },
      resetLogin(){
        this.show_error=false
        this.$v.$reset()
      },
      resetCreate(){
        this.show_error=false
        this.$v.$reset()
      }
    }
}
</script>
<style scoped>
  #login{
    background-color: #172D44;
    position: static;
    top: 0;
    color: #ffffff;
    height: 100%;
  }
  .span_error{
    font: 1.2em "Fira Sans", sans-serif;
    float:left;
    margin-top:-10px;
    margin-bottom:2px;
    padding-left:5px;
    background-color: crimson;
  }
</style>
