<template>
    <div class="row">
      <my-panel title="Upload" stitle="File" colsize="col-md-12" :show="showFile" @close="showFile=false">
          <p> <a class="btn btn-success" href="http://localhost:3000/download" id="exemple" target="_bank"><i class="fa fa-download"></i> Download a exemple</a></p>
          <form action="http://localhost:3000/upload" class="dropzone" id="myAwesomeDropzone" >
          </form>
          <br />
          <br />
          <br />
        </my-panel>
      <my-panel title="Spec" stitle="add" colsize="col-md-12" :show="showSpec" @close="showSpec=false">
        <div id="wizard" class="form_wizard wizard_horizontal">
          <ul class="wizard_steps">
            <li>
              <a id="step-1"  class="selected">
                <span class="step_no">1</span>
                <span class="step_descr">Step 1<br /><small>Information</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-2"  class="disabled">
                <span class="step_no">2</span>
                <span class="step_descr">Step 2<br /><small>Set Fields</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-3" class="disabled">
                <span class="step_no">3</span>
                <span class="step_descr">Step 3<br /><small>Set code Response</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-4" class="disabled">
                <span class="step_no">4</span>
               <span class="step_descr">Step 4<br /><small>Set Message Type</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-5" class="disabled">
                <span class="step_no">5</span>
               <span class="step_descr">Step 5<br /><small>Set Transactions Type</small></span>
              </a>
            </li>                  
          </ul>             
        </div>
        <div class="ln_solid"></div>
        <div class="col-md-12" v-if="showInfo">
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.spec.name.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Name</label>
              <input type="text" class="form-control " v-model.trim="$v.spec.name.$model">
              <span :class="[!$v.spec.name.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.spec.name.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.spec.pinField.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Pin Field</label>
              <input type="text" class="form-control " v-model.trim="$v.spec.pinField.$model">
              <span :class="[!$v.spec.pinField.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.spec.pinField.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.spec.version.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Version</label>
              <select class="form-control " v-model.trim="$v.spec.version.$model">
                <option>1987</option>
                <option>1993</option>
                <option>2003</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.spec.version.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.spec.numberOfField.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Number of Field</label>
              <select class="form-control " v-model.trim="$v.spec.numberOfField.$model">
                <option>64</option>
                <option>128</option>
                <option>192</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.spec.numberOfField.required">this field is required</span>
            </div>
          </div>
        </div>
        <div class="col-md-12" v-if="showRequest">
          <vue-good-table :columns="colfield" :rows="spec.fields" styleClass="table table-striped table-bordered"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 5,
              position: 'bottom',
              perPageDropdown: [5, 10, 20, 30],
              dropdownAllowAll: false,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
            }">
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'contentType'">
                  <select class="form-control" v-model="spec.fields[props.index].contentType">
                      <option v-for="item in contentType" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'lenType'">
                  <select class="form-control" v-model="spec.fields[props.index].lenType">
                      <option v-for="item in lenType" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'category'">
                  <select class="form-control" v-model="spec.fields[props.index].category">
                      <option v-for="item in category" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'maxLen'">
                  <input type="text" class="form-control" v-model="spec.fields[props.index].maxLen">
                </span>
                <span v-else-if="props.column.field == 'description'">
                  <textarea type="text" class="form-control" v-model="spec.fields[props.index].description"></textarea>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
            </template>
          </vue-good-table>
        </div>
        <div class="col-md-12" v-if="showResponse">
          <div v-for="line in spec.codeResponse" :key="line">
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label" for="inputSuccess1">Code</label>
              <input type="text" class="form-control" v-model="line.code">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group">
              <label class="form-control-label">Message</label>
              <input type="text" class="form-control "  v-model="line.message">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          </div>
          <button @click="addcode" class="btn btn-primary"> Add code <i class="fa fa-plus"></i></button>
        </div>
        <div class="col-md-12" v-if="showMessage">
          <div v-for="line in spec.messageType" :key="line">
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label" for="inputSuccess1">Value</label>
              <input type="text" class="form-control" v-model="line.value">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group">
              <label class="form-control-label">Description</label>
              <input type="text" class="form-control "  v-model="line.description">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          </div>
          <button @click="addmessage" class="btn btn-primary"> Add code <i class="fa fa-plus"></i></button>
        </div>
        <div class="col-md-12" v-if="showData">
            <div v-for="line in spec.processingCode" :key="line">
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label" for="inputSuccess1">Code</label>
              <input type="text" class="form-control" v-model="line.code">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group">
              <label class="form-control-label">Description</label>
              <input type="text" class="form-control "  v-model="line.description">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          </div>
          <button @click="addtrxtype" class="btn btn-primary"> Add code processing <i class="fa fa-plus"></i></button>
        </div>
        <div class="col-md-12">
          <div class="ln_solid"></div>
        </div>
        <div class="col-md-offset-4 col-md-3">
          <button id="b-finish" class="btn btn-success" @click="submit('add')" disabled>Finish</button>
          <button id="b-finish" class="btn btn-danger" @click="delSpec" >Delete <i class="fa fa-trash"></i></button>
        </div>
        <div class="col-md-3" style="float:right;">
          <button id="b-next" class="btn btn-info" @click="next_step">Next</button>
          <button id="b-previous" class="btn btn-primary" @click="previous_step" disabled>Previous</button>
        </div>
        
      </my-panel>
      <my-panel title="Spec" stitle="list" colsize="col-md-11">
        <vue-good-table :columns="colspec" :rows="specs" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick" @on-row-click="onRowClick"
        :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 5,
            position: 'bottom',
            perPageDropdown: [10, 15, 20],
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'page', // for 'pages' mode
            allLabel: 'All',
          }"
          :selectOptions="{
            enabled: true,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectionInfoClass: 'flat',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
          }">
          <div slot="table-actions">
             <button class="btn btn-success" @click="showDropzone">File <i class="fa fa-file"></i></button>
             <button class="btn btn-primary" @click="refresh">Reloads <i class="fa fa-refresh"></i></button>
             <button class="btn btn-info" @click="showSpec=true">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Code Response" stitle="data" colsize="col-md-4">
        <vue-good-table :columns="colcode" :rows="rowscode" styleClass="table table-striped table-bordered jambo_table bulk_action"
        :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 5,
              position: 'bottom',
              perPageDropdown: [5, 10, 20, 30],
              dropdownAllowAll: false,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
            }">
        </vue-good-table>
      </my-panel>
      <my-panel title="Processing Code" stitle="data" colsize="col-md-4">
        <vue-good-table :columns="colprocessing" :rows="rowsprocessing" styleClass="table table-striped table-bordered jambo_table bulk_action"
        :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 5,
              position: 'bottom',
              perPageDropdown: [5, 10, 20, 30],
              dropdownAllowAll: false,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
            }">
        </vue-good-table>
      </my-panel>
      <my-panel title="Message Type" stitle="data" colsize="col-md-4">
        <vue-good-table :columns="colmessage" :rows="rowsmessage" styleClass="table table-striped table-bordered jambo_table bulk_action"
        :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 5,
              position: 'bottom',
              perPageDropdown: [5, 10, 20, 30],
              dropdownAllowAll: false,
              setCurrentPage: 1,
              nextLabel: 'next',
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
            }">
        </vue-good-table>
      </my-panel>
      <my-panel title="Field" stitle="fields" colsize="col-md-12">
        <vue-good-table :columns="colfield" :rows="rowsfield" styleClass="table table-striped table-bordered jambo_table bulk_action" 
        :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 16,
            position: 'bottom',
            perPageDropdown: [16, 32, 64],
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'page', // for 'pages' mode
            allLabel: 'All',
          }"
          >
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import { required, numeric } from 'vuelidate/lib/validators';
import { throws } from 'assert';
import toastr from 'toastr'
import { ALL_SPECS_QUERY,ADD_SPEC_MUTATION,DELETE_SPEC_MUTATION, } from '@/graphql/spec.js'
export default {
  components:{MyPanel},
  data(){
    return{
      rowscode:[],
      rowsmessage:[],
      rowsprocessing:[],
      rowsfield:[],
      activeClass:['','glyphicon glyphicon-check right'],
      errorClass:['has-error','glyphicon glyphicon-remove-circle right'],
      contentType:['b','n','a','z','s','an','as','ns','ans'],
      lenType:[ 'LT.FIXED','LT.LLVAR','LT.LLLVAR'],
      category:['Card','Terminal','System'],
      spec:{
        id:'',
        name:'',
        pinField:'',
        version:'',
        numberOfField:'',
        fields:[],
        codeResponse:[],
        messageType:[],
        processingCode:[],
      },
      colspec: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
          filterOptions: {
          enabled: true, 
          placeholder:'Name ... ', 
          filterDropdownItems: [],
          filterFn: this.columnFilterFn, 
          },
        },
        {
          label: 'Version',
          field: 'version',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Version ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Number of field',
          field: 'numberOfField',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Version ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
        {
          label: 'FIELD OF PIN',
          field: 'pinField',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Version ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
        
      ],
      colcode: [
        {
          label: 'Code',
          field: 'code',
        },
        {
          label: 'Message',
          field: 'message',
        },
      ],
      colprocessing: [
        {
          label: 'Code',
          field: 'code',
        },
        {
          label: 'Description',
          field: 'description',
        },
      ],
      colmessage: [
        {
          label: 'Value',
          field: 'value',
        },
        {
          label: 'Description',
          field: 'description',
        },
      ],
      colfield: [
        {
          label: 'Field',
          field: 'field',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Content Type',
          field: 'contentType',
        },
        {
          label: 'Len Type',
          field: 'lenType',
        },
        {
          label: 'Max Len',
          field: 'maxLen',
        },
        {
          label: 'Category',
          field: 'category',
        },
      ],
      rowFields: [],
      showInfo:true,
      showRequest:false,
      showResponse:false,
      showMessage:false,
      showData:false,
      specs:[],
      showSpec:false,
      showFile:false,
      bdel:false,
      action:{
        button:'Add',
        icon:'fa fa-plus',
      },
    }

  }, 
  methods : {
    showDropzone(){
      this.showFile=true;
      let options= {
        maxFilesize: 5,
        addRemoveLinks: false,
        createImageThumbnails:true,
        dictResponseError: 'Server not Configured',
        acceptedFiles: ".json",
        init:function(){
          var self = this;
          self.options.addRemoveLinks = true;
          self.options.dictRemoveFile = "Delete";
          //New file added
          self.on("addedfile", function (file) {
            console.log('new file added ', file);
            toastr.success('A new spec is added ....')
          });
          // Send file starts
          self.on("sending", function (file) {
            console.log('upload started', file);
            $('.meter').show();
          });
          
          // File upload Progress
          self.on("totaluploadprogress", function (progress) {
            console.log("progress ", progress);
            $('.roller').width(progress + '%');
          });

          self.on("queuecomplete", function (progress) {
            $('.meter').delay(999).slideUp(999);
          });
          
          // On removing file
          self.on("removedfile", function (file) {
            console.log(file);
          });
        }
      };
      window.$("#myAwesomeDropzone").dropzone(options)
    },
    deleteType(list){
      let l=[]
      for (let element of list){
        delete element.__typename
        l.push(element)
      }
      return l
    },
    onRowDoubleClick(params) {
      this.action={
        button:'Update',
        icon:'fa fa-edit',
      }
      this.spec.id=params.row.id
      this.spec.name=params.row.name
      this.spec.binaryField=params.row.binaryField
      this.spec.fields=this.deleteType(params.row.fields)
      this.spec.version=params.row.version
      this.spec.messageType=this.deleteType(params.row.messageType)
      this.spec.codeResponse=this.deleteType(params.row.codeResponse)
      this.bdel=true
      this.showSpec=true
      console.log(this.spec)
    },
    onRowClick(params) {
      this.rowscode=params.row.codeResponse
      this.rowsmessage=params.row.messageType
      this.rowsprocessing=params.row.processingCode
      this.rowsfield=params.row.fields
    },
    next_step(){
      if(this.showInfo){
        this.showInfo=!this.showInfo
        this.showRequest=true
        document.getElementById('step-1').classList.replace('selected','done')
        document.getElementById('step-1').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
        document.getElementById('step-2').classList.replace('disabled','selected')
        document.getElementById('b-previous').removeAttribute('disabled')
        if(this.spec.fields.length == 0)
          this.generateField()
        return 1
      }
      if(this.showRequest){
        this.showRequest=!this.showRequest
        this.showResponse=true
        document.getElementById('step-2').classList.replace('selected','done')
        document.getElementById('step-2').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
        document.getElementById('step-3').classList.replace('disabled','selected')
        console.log(this.spec.fields)
        return 1
      }
      if(this.showResponse){
        this.showResponse=!this.showResponse
        this.showMessage=true
        document.getElementById('step-3').classList.replace('selected','done')
        document.getElementById('step-3').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
        document.getElementById('step-4').classList.replace('disabled','selected')
        return 1
      }
      if(this.showMessage){
        this.showMessage=!this.showMessage
        this.showData=true
        document.getElementById('step-4').classList.replace('selected','done')
        document.getElementById('step-4').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
        document.getElementById('step-5').classList.replace('disabled','selected')
        document.getElementById('b-finish').removeAttribute('disabled')
        document.getElementById('b-next').setAttribute('disabled','disabled')
        return 1
      }
    },
    previous_step(){      
      if(this.showRequest){
        this.showRequest=!this.showRequest
        this.showInfo=true
        document.getElementById('step-1').classList.replace('done','selected')
        document.getElementById('step-1').querySelector('.step_no').innerHTML='1'
        document.getElementById('step-2').classList.replace('selected','disabled')
        document.getElementById('b-previous').setAttribute('disabled','disabled')
        return 1
      }
      if(this.showResponse){
        this.showResponse=!this.showResponse
        this.showRequest=true
        document.getElementById('step-2').classList.replace('done','selected')
        document.getElementById('step-2').querySelector('.step_no').innerHTML='2'
        document.getElementById('step-3').classList.replace('selected','disabled')
        return 1
      }
      if(this.showMessage){
        this.showMessage=!this.showMessage
        this.showResponse=true
        document.getElementById('step-3').classList.replace('done','selected')
        document.getElementById('step-3').querySelector('.step_no').innerHTML='3'
        document.getElementById('step-4').classList.replace('selected','disabled')
        return 1
      }
      if(this.showData){
        this.showData=!this.showData
        this.showMessage=true
        document.getElementById('step-4').classList.replace('done','selected')
        document.getElementById('step-4').querySelector('.step_no').innerHTML='4'
        document.getElementById('step-5').classList.replace('selected','disabled')
        document.getElementById('b-finish').setAttribute('disabled','disabled')
        document.getElementById('b-next').removeAttribute('disabled')
        return 1
      }
    },
    generateField(){
      for (let i = 2 ; i <= this.spec.numberOfField ; i++) {
      let field=i.toString()
        field=field.padStart(3,'0')
        let row={
          field:field,
          description:'',
          contentType:'',
          lenType:'',
          maxLen:'',
          category:''
        }
        this.spec.fields.push(row)
      }
    },
    addcode(){
      this.spec.codeResponse.push({
        code:'',
        message:'',
      })
    },
    addtrxtype(){
      this.spec.processingCode.push({
        code:'',
        description:'',
      })
    },
    addmessage(){
      this.spec.messageType.push({
          value:'',
          description:'',
          })
    },
    refresh(){
      this.$apollo.queries.specs.refetch() 
    },
    getAccount(accounts){
      return accounts.map(function(account){
        return account.account
      })
    },
    submit(action){
        if (action=='copy')
          this.spec.id=''
        this.activeClass[0]='has-success'
        this.$v.$touch()
        if (this.$v.$invalid){
          console.log('Error')
        }else{
          let spec=this.spec
          this.$apollo
          .mutate(
            {
            mutation: ADD_SPEC_MUTATION,
            variables: {
              input: spec
            },
            update: (cache, { data: { createSpec } }) => {
              const allSpecss = cache.readQuery({ query: ALL_SPECS_QUERY });
              let id=createSpec.id
              let index = allSpecss.specs.findIndex(spec => spec.id==id)
              if(index==-1){
                allSpecss.specs.push(createSpec)
              }else{
                allSpecss.specs.splice(index,1,createSpec)
              }
              cache.writeQuery({
                query: ALL_SPECS_QUERY,
                data: {
                  allSpecss: allSpecss
                }
              });
            },
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
        }
      },
    delSpec(){
      this.$apollo
          .mutate({
            mutation: DELETE_SPEC_MUTATION,
            variables: {
              id: this.spec.id
            },
            update: (cache, { data: { deleteSpec } }) => {
              const { allSpecss } = cache.readQuery({ query: ALL_SPECS_QUERY });
              let id=deleteSpec.id
              let index = allSpecss.specs.findIndex(spec => spec.id==id)
              if(index > -1){
                allSpecss.specs.splice(index,1)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_SPECS_QUERY,
                data: {
                  allSpecss: allSpecss
                }
              });
            },
          },
          )
          .catch(error =>{
            console.log('Error ::: ',error)
          })
    },
    reset(){
      this.activeClass[0]=''
      this.$v.$reset()
      this.spec={
        id:'',
        name:'',
        version:'',
        fields:{
            field:'',
            value:'',
            description:'',
            contentType:'',
            lenType:'',
            max:'',
            action:'',
            type:'',
        },
        codeResponse:{
            code:'',
            message:'',
        },
        messageType:{
            value:'',
            message:'',
        },
        binaryField:'',
      }
    },
  },
  validations:{
    spec:{
      name:{
        required,
      },
      version:{
        required,
      },
      numberOfField:{
        required,
      },
      pinField:{
        required,
      }
    }
  },
  apollo:{
    specs:{
      query:ALL_SPECS_QUERY,
      //fetchPolicy: 'no-cache'
    }
  }
}
</script>
