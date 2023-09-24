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
              <a id="step-2"  class="disabled">
                <span class="step_no">2</span>
                <span class="step_descr">Step 2<br /><small>Fields request</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-3" class="disabled">
                <span class="step_no">3</span>
                <span class="step_descr">Step 3<br /><small>Fields response</small></span>
              </a>
            </li>                  
            <li>
              <a id="step-4" class="disabled">
                <span class="step_no">4</span>
               <span class="step_descr">Step 4<br /><small>Validation</small></span>
              </a>
            </li>                  
          </ul>             
        </div>
        <div class="ln_solid"></div>
        <div class="col-md-12" v-if="showInfo">
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Name</label>
              <input type="text" class="form-control " v-model="transactionType.name">
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Spec</label>
              <multiselect v-model="transactionType.spec"  track-by="name" label="name" :options="specs" @select="selectionChanged">
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">MTI</label>
              <multiselect v-model="transactionType.mti"  track-by="value" label="value" :options="messageType">
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">Type</label>
              <multiselect v-model="transactionType.type" :options="types">
              </multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success!</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-control-label">Request</label>
              <multiselect v-model="transactionType.request"  track-by="field" label="field" :options="request" :multiple="true" hideSelected="false"></multiselect>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-control-label">Response</label>
              <multiselect v-model="transactionType.response"  track-by="field" label="field" :options="response" :multiple="true" hideSelected="false"></multiselect>
            </div>
          </div>
          
        </div>
        <div class="col-md-12" v-if="showRequest">
          <vue-good-table :columns="colFields" :rows="transactionType.request" styleClass="table table-striped jambo_table table-bordered"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 10,
              position: 'bottom',
              perPageDropdown: [10, 20, 30],
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
                <span v-if="props.column.field == 'field'">
                    <input type="text" v-model="props.row.field" class="form-control" disabled/>
                </span>
                <span v-if="props.column.field == 'description'">
                    <textarea v-model="props.row.description" class="form-control" disabled></textarea>
                </span>
                <span v-else-if="props.column.field == 'action'">
                  <select class="form-control" >
                      <option v-for="item in generateAction(props.row.category)" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'value'">
                    <input type="text" class="form-control" v-model="props.row.value" />
                </span>
            </template>
          </vue-good-table>
        </div>
        <div class="col-md-12" v-if="showResponse">
          <vue-good-table :columns="colFields" :rows="transactionType.response" styleClass="table table-striped jambo_table table-bordered"
            :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 10,
              position: 'bottom',
              perPageDropdown: [10, 20, 30],
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
                <span v-if="props.column.field == 'field'">
                    <input type="text" v-model="props.row.field" class="form-control" disabled/>
                </span>
                <span v-if="props.column.field == 'description'">
                    <textarea v-model="props.row.description" class="form-control" disabled></textarea>
                </span>
                <span v-else-if="props.column.field == 'action'">
                  <select class="form-control" >
                      <option v-for="item in generateAction(props.row.category)" :key="item">{{item}}</option>
                  </select>
                </span>
                <span v-else-if="props.column.field == 'value'">
                    <input type="text" class="form-control" v-model="props.row.value" />
                </span>
            </template>
          </vue-good-table>
        </div>
        <div class="col-md-12" v-if="showValid">
          <div class="col-md-4">
            <button class="btn btn-success btn-lg">Confirm</button>
          </div>
          <div class="col-md-4 col-md-offset-4">
            <button class="btn btn-danger btn-lg">Cancel</button>
          </div>
        </div>
        <div class="col-md-12">
          <div class="ln_solid"></div>
        </div>
        <div class="col-md-3 col-md-offset-12" style="float:right;">
          <button id="b-finish" class="btn btn-default" disabled>Finish</button>
          <button id="b-next" class="btn btn-success" @click="next_step">Next</button>
          <button id="b-previous" class="btn btn-primary" @click="previous_step" disabled>Previous</button>
        </div>
        
      </my-panel>
      <my-panel title="transaction" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="transactionTypes" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick" @on-row-click="onRowClick" 
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
             <button class="btn btn-primary" @click="refresh">Reloads <i class="fa fa-refresh"></i></button>
             <button class="btn btn-info" @click="showTransactionType=true">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Request" stitle="fields" colsize="col-md-6">
        <vue-good-table :columns="columns1" :rows="rowsRequest" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick">
        </vue-good-table>
      </my-panel>
      <my-panel title="Response" stitle="fields" colsize="col-md-6">
        <vue-good-table :columns="columns2" :rows="rowsResponse" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick">
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import { throws } from 'assert';
import Multiselect from 'vue-multiselect'
import { ALL_TRANSACTIONTYPES_QUERY,ADD_TRANSACTIONTYPE_MUTATION,DELETE_TRANSACTIONTYPE_MUTATION,ALL_SPECS_QUERY,GET_SPEC_QUERY} from '@/graphql/transactionType.js'
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
      messageType:[],
      request:[],
      response:[],
      action:[],
      transactionTypes:[],
      transactionType:{
        name:'',
        spec:'',
        mti:'',
        type:'',
        request:[],
        response:[],
      },
      columns: [
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
      
      columns1: [
        {
          label: 'Field',
          field: 'field',
        },
        {
          label: 'Value',
          field: 'value',
        },
      ],
      columns2: [
        {
          label: 'Field',
          field: 'field',
        },
        {
          label: 'Value',
          field: 'value',
        },
      ],
      colFields:[
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
      rowsRequest:[],
      rowsResponse:[],
      showInfo:true,
      showRequest:false,
      showResponse:false,
      showValid:false,
    }
  }, 
  methods : {
      refresh(){
        this.$apollo.queries.transactionTypes.refetch() 
      },
      onRowDoubleClick(params) {
       console.log(params)
      },
      onRowClick(params) {
        this.rowsRequest=params.row.request
        this.rowsResponse=params.row.response
      },
      generateAction( action){
        let output=[]
        if(action=='Card'){
          output.push('getValue')
          output.push('getTrack2')
          output.push('getCardhodername')
          output.push('getPin')
          output.push('getPan')
          output.push('getAccount')
        }
        if(action=='Terminal'){
          output.push('getValue')
          output.push('getTerminalID')
          output.push('getMerchantID')
          output.push('getTpk')
          output.push('getTmk')
          output.push('getCountry')
          output.push('getMCC')
          output.push('getCurrency')
        }
        if(action=='System'){
          output.push('getValue')
          output.push('getDate(MMDDhhmmss)')
          output.push('getDate(YYMMDDhhmmss)')
          output.push('getDate(YYMMDD)')
          output.push('getRRN')
          output.push('getUtrno')
          output.push('getTmk')
          output.push('getCountry')
          output.push('getCurrency')
        }
        return output
      },
      selectionChanged(selectedOption, id){
        console.log(selectedOption)
        this.messageType=selectedOption.messageType
        this.response=Array.from(selectedOption.fields)
        this.request=Array.from(selectedOption.fields)
      },
      next_step(){
        if(this.showInfo){
          this.showInfo=!this.showInfo
          this.showRequest=true
          document.getElementById('step-1').classList.replace('selected','done')
          document.getElementById('step-1').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
          document.getElementById('step-2').classList.replace('disabled','selected')
          document.getElementById('b-previous').removeAttribute('disabled')
          return 1
        }
        if(this.showRequest){
          this.showRequest=!this.showRequest
          this.showResponse=true
          document.getElementById('step-2').classList.replace('selected','done')
          document.getElementById('step-2').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
          document.getElementById('step-3').classList.replace('disabled','selected')
          return 1
        }
        if(this.showResponse){
          this.showResponse=!this.showResponse
          this.showValid=true
          document.getElementById('step-3').classList.replace('selected','done')
          document.getElementById('step-3').querySelector('.step_no').innerHTML='<i class="fa fa-check"></i>'
          document.getElementById('step-4').classList.replace('disabled','selected')
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
        if(this.showValid){
          this.showValid=!this.showValid
          this.showResponse=true
          document.getElementById('step-3').classList.replace('done','selected')
          document.getElementById('step-3').querySelector('.step_no').innerHTML='3'
          document.getElementById('step-4').classList.replace('selected','disabled')
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
      //fetchPolicy: 'no-cache'
    },
  }
}
</script>

