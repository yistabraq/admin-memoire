<template>
    <div class="animate right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>{{$route.name | capitalize}} <small style="color:blue;">{{$route.path}}</small></h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button">Go!</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="clearfix"></div>
              <animated-wobble name="slide">
                <router-view></router-view>
              </animated-wobble>
          </div>
        </div>
</template>
<script>
import VueFormGenerator from "vue-form-generator"
export default {
    name: 'MyMain',
    components:{ "vue-form-generator": VueFormGenerator.component},
    data() {
      return {
        model: {
          id: 1,
          name: "John Doe",
          password: "J0hnD03!x4",
          skills: ["Javascript", "VueJS"],
          email: "john.doe@gmail.com",
          status: true
        },
        schema: {
                fields: [{
                  type: "input",
                  inputType: "text",
                  label: "ID (disabled text field)",
                  model: "id",
                  styleClasses: 'sss',
                  readonly: true,
                  disabled: true
                },{
                  type: "input",
                  inputType: "text",
                  label: "Name",
                  model: "name",
                  placeholder: "Your name",
                  featured: true,
                  required: true
                },{
                  type: "input",
                  inputType: "password",
                  label: "Password",
                  model: "password",
                  min: 6,
                  required: true,
                  hint: "Minimum 6 characters",
                  validator: VueFormGenerator.validators.string
                },{
                  type: "select",
                  label: "Skills",
                  model: "skills",
                  values: ["Javascript", "VueJS", "CSS3", "HTML5"]
                },{
                  type: "input",
                  inputType: "email",
                  label: "E-mail",
                  model: "email",
                  placeholder: "User's e-mail address"
                },{
                  type: "checkbox",
                  label: "Status",
                  model: "status",
                  default: true
                }]

        },
        formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true
          }
    }
    }   
}
</script>
