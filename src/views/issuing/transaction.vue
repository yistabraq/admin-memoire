<template>
    <div class="row">
      <my-panel title="transaction" stitle="add" colsize="col-md-12" :show="showTransactionType" @close="showTransactionType=false">
        <div id="wizard" class="form_wizard wizard_horizontal">
         <ul class="wizard_steps">
            <li>
              <a id="step-1"  class="selected">
                <span class="step_no">1</span>
                <span class="step_descr">Step 1<br /><small>Information</small></span>
              </a>
            </li>                                   
            <li>
              <a id="step-2" class="disabled">
                <span class="step_no">2</span>
                <span class="step_descr">Step 2<br /><small>Fields</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-3" class="disabled">
                <span class="step_no">3</span>
               <span class="step_descr">Step 3<br /><small>Validation</small></span>
              </a>
            </li>                  
          </ul>             
        </div>
        <div class="ln_solid"></div>
        <div class="col-md-12" v-if="showInfo">
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">Spec</label>
              <multiselect v-model="spec"  track-by="name" label="name" :options="specs" @select="selectionChanged">
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">MTI</label>
              <multiselect v-model="mti"  track-by="value" label="value" :options="messageType">
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">Type</label>
              <multiselect v-model="transactionType.type" :options="types" >
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">Name</label>
              <input type="text" class="form-control " v-model="transactionType.name">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">Fields</label>
              <multiselect v-model="transactionType.fields"  track-by="field" label="field" :close-on-select="false" :options="fields" :multiple="true"></multiselect>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label">Processing Code</label>
              <multiselect v-model="lineCodeP"  track-by="code" label="code" :custom-label="showTt" :options="processingCode"></multiselect>
            </div>
          </div>
        </div>
        <div class="col-md-12" v-if="showResponse">
          <vue-good-table :columns="colFields1" :rows="transactionType.fields" styleClass="table table-striped jambo_table">
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'field'">
                    <input type="text" class="form-control" v-model="transactionType.fields[props.index].field" disabled>
                </span>
                <span v-if="props.column.field == 'description'">
                    <textarea v-model="transactionType.fields[props.index].description" class="form-control" disabled></textarea>
                </span>
                <span v-else-if="props.column.field == 'action'">
                  <select class="form-control" v-model="transactionType.fields[props.index].action">
                      <option v-for="item in generateAction(props.row.category)" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'value'">
                    <input type="text" class="form-control" v-model="transactionType.fields[props.index].value" />
                </span>
            </template>
          </vue-good-table>
        </div>
        <div class="col-md-12" v-if="showValid">
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Spec</label>
              <input type="text" class="form-control " v-model="transactionType.spec" disabled>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">MTI</label>
              <input type="text" class="form-control " v-model="mti.value" disabled>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Type</label>
              <input type="text" class="form-control " v-model="transactionType.type" disabled>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Name</label>
              <input type="text" class="form-control " v-model="transactionType.name" disabled>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-12">
            <vue-good-table :columns="colFields" :rows="transactionType.fields" styleClass="table table-striped table-bordered jambo_table">
            </vue-good-table>
          </div>
          
        </div>
        <div class="col-md-12">
          <div class="ln_solid"></div>
        </div>
        <div class="col-md-offset-4 col-md-3">
          <button id="b-finish" class="btn btn-success" @click="submit('add')" disabled>Finish</button>
          <button id="b-finish" class="btn btn-danger" @click="delTrxType" >Delete <i class="fa fa-trash"></i></button>
          <button id="b-finish" class="btn btn-warning" @click=reset >Reset <i class="fa fa-refresh"></i></button>
        </div>
        <div class="col-md-3" style="float:right;">
          <button id="b-next" class="btn btn-info" @click="next_step">Next</button>
          <button id="b-previous" class="btn btn-primary" @click="previous_step" disabled>Previous</button>
        </div>
        
      </my-panel>
      <my-panel title="transaction" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="colTransactionType" :rows="transactionTypes" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick" @on-row-click="onRowClick" 
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
          >
          <div slot="table-actions">
             <button class="btn btn-primary" @click="refresh">Reloads <i class="fa fa-refresh"></i></button>
             <button class="btn btn-info" @click="showTransactionType=true">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Resquest" stitle="fields" colsize="col-md-12">
        <vue-good-table :columns="colFields" :rows="Rfields" styleClass="table table-striped table-bordered jambo_table bulk_action">
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import { throws } from 'assert';
import toastr from 'toastr'
import Multiselect from 'vue-multiselect'
import { ALL_TRANSACTIONTYPES_QUERY,ADD_TRASACTIONTYPE_MUTATION,DELETE_TRANSACTIONTYPE_MUTATION,ALL_SPECS_QUERY} from '@/graphql/transactionType.js'
import { from } from 'zen-observable';
export default {
  components:{MyPanel,Multiselect},
  data(){
    return{
      showTransactionType:false,
      types:[
        'Default',
        'Dedit',
        'Credit',
        'Other',
      ],
      specs:[],
      spec:null,
      messageType:[],
      request:[],
      response:[],
      action:[],
      transactionTypes:[],
      transactionType:{
        id:'',
        name:'',
        spec:'',
        mti:'',
        code:'',
        type:'',
        fields:[],
      },
      lineCodeP:	{},
      processingCode:	[],
      colTransactionType: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Name ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Spec',
          field: 'spec',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Spec ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'MTI',
          field: 'mti',
          type: 'number',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'mti ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Code Processing',
          field: 'code',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'type ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Type',
          field: 'type',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'type ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
          },
        },
      ],
      colFields: [
        {
          label: 'Field',
          field: 'field',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Action',
          field: 'action',
        },
        {
          label: 'Value',
          field: 'value',
        },
      ],
      colFields1:[
        {
          label: 'Field',
          field: 'field',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Action',
          field: 'action',
        },
        {
          label: 'Value',
          field: 'value',
        },
      ],
      fields:[],
      Rfields:[],
      mti:null,
      showInfo:true,
      showResponse:false,
      showValid:false,
    }
  }, 
  methods : {
      refresh(){
        this.$apollo.queries.transactionTypes.refetch() 
      },
      showTt({code,description}){   
             return  `${code} - [${description}]`
         },
      reset(){
        this.transactionType={
        id:'',
        name:'',
        spec:'',
        mti:'',
        type:'',
        code:'',
        fields:[],
        }
        this.spec=null
        this.fields=[]
        this.Rfields=[]
        this.mti=null
        this.showInfo=true
        this.showResponse=false
        this.showValid=false
        document.getElementById('step-1').classList.replace('done','selected')
        document.getElementById('step-2').classList.replace('done','disabled')
        document.getElementById('step-3').classList.replace('selected','disabled')
        document.getElementById('step-1').querySelector('.step_no').innerHTML='1'
        document.getElementById('step-2').classList.replace('selected','disabled')
        document.getElementById('b-finish').setAttribute('disabled','disabled')
        document.getElementById('b-next').removeAttribute('disabled')
      },
      deleteType(list){
        let l=[]
        for (let element of list){
          delete element.__typename
          l.push(element)
        }
        return l
      },
      delTrxType(){
        this.$apollo
          .mutate({
            mutation: DELETE_TRANSACTIONTYPE_MUTATION,
            variables: {
              id: this.transactionType.id
            },
            update: (cache, { data: { deleteTransactionType } }) => {
                this.showTransactionType=false
                this.reset()
                this.refresh()
                this.Rfields=[]
            },
          },
          )
          .catch(error =>{
            console.log('Error ::: ',error)
          })
      },
      submit(){
        let transactionType=this.transactionType
        transactionType.mti=this.mti.value
        transactionType.fields=this.deleteType(transactionType.fields)
        transactionType.code=this.lineCodeP.code
        transactionType.category="Issuing"
        console.log(transactionType)
        this.$apollo
          .mutate(
            {
            mutation: ADD_TRASACTIONTYPE_MUTATION,
            variables: {
              input: transactionType
            },
            update: (cache, { data: { createTransactionType } }) => {
              this.showTransactionType=false
              this.reset()
              this.refresh()
              this.Rfields=[]
              toastr.success('A new transaction is added ....')
            },
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
      },
      onRowDoubleClick(params) {
        console.log(params.row)
        this.spec=this.specs.find(element=>{
          return element.name == params.row.spec
        })
        this.messageType=this.spec.messageType
        this.mti=this.messageType.find(element=>{
          return element.value == params.row.mti
        })
        this.transactionType.type=params.row.type
        this.transactionType.name=params.row.name
        this.transactionType.spec=params.row.spec
        this.transactionType.fields=params.row.fields
        this.fields=this.deleteType(this.spec.fields)
        this.transactionType.id=params.row.id
        this.showTransactionType=true
      },
      onRowClick(params) { 
        this.Rfields=params.row.fields
      },
      generateAction( action){
        let output=[]
        if(action=='Card'){
          output.push('getValue')
          output.push('getTrack2')
          output.push('getPin')
          output.push('getPan')
        }
        if(action=='Terminal'){
          output.push('getValue')
          output.push('getTerminalID')
          output.push('getMerchantID')
          output.push('getCountry')
        }
        if(action=='System'){
          output.push('getValue')
          output.push('getDate(MMDDhhmmss)')
          output.push('getDate(YYMMDDhhmmss)')
          output.push('getDate(YYMMDD)')
          output.push('getRRN')
          output.push('getUtrno')
        }
        return output
      },
      selectionChanged(selectedOption, id){
        console.log(selectedOption)
        this.transactionType.spec=selectedOption.name
        this.messageType=this.deleteType(selectedOption.messageType)
        this.fields=this.deleteType(selectedOption.fields)
        this.processingCode=this.deleteType(selectedOption.processingCode)
      },
      next_step(){
        if(this.showInfo){
          this.showInfo=!this.showInfo
          this.showResponse=true
          document.getElementById('step-1').classList.replace('selected','done')
          document.getElementById('step-1').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
          document.getElementById('step-2').classList.replace('disabled','selected')
          document.getElementById('b-previous').removeAttribute('disabled')
          return 1
        }
        if(this.showResponse){
          this.showResponse=!this.showResponse
          this.showValid=true
          document.getElementById('step-2').classList.replace('selected','done')
          document.getElementById('step-2').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
          document.getElementById('step-3').classList.replace('disabled','selected')
          document.getElementById('b-finish').removeAttribute('disabled')
          document.getElementById('b-next').setAttribute('disabled','disabled')
          return 1
        }
      },
      previous_step(){
        
        if(this.showResponse){
          this.showResponse=!this.showResponse
          this.showInfo=true
          document.getElementById('step-1').classList.replace('done','selected')
          document.getElementById('step-1').querySelector('.step_no').innerHTML='1'
          document.getElementById('step-2').classList.replace('selected','disabled')
          document.getElementById('b-previous').setAttribute('disabled','disabled')
          return 1
        }
        if(this.showValid){
          this.showValid=!this.showValid
          this.showResponse=true
          document.getElementById('step-2').classList.replace('done','selected')
          document.getElementById('step-2').querySelector('.step_no').innerHTML='3'
          document.getElementById('step-3').classList.replace('selected','disabled')
          document.getElementById('b-finish').setAttribute('disabled','disabled')
          document.getElementById('b-next').removeAttribute('disabled')
          return 1
        }
      },
  },
 apollo:{
    specs:{
      query:ALL_SPECS_QUERY,
      //fetchPolicy: 'no-cache'
    },
    transactionTypes:{
      query:ALL_TRANSACTIONTYPES_QUERY,
      variables:{
        category:"Issuing"
      }
    },
  }
}
</script>

