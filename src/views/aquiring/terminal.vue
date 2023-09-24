<template>
    <div class="row">
      <my-panel title="Terminal" stitle="add" colsize="col-md-12" :show="showTerminal" @close="showTerminal=false">
        <div class="col-md-12">
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.terminal.terminalId.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Terminal Id</label>
              <input type="text" v-model.trim="$v.terminal.terminalId.$model" class="form-control">
              <span :class="[!$v.terminal.terminalId.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.terminal.terminalId.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[$v.terminal.merchantId.$anyError ? errorClass[0] : activeClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >Merchant Id</label>
              <input type="text" v-model="$v.terminal.merchantId.$model" class="form-control">
              <span :class="[$v.terminal.merchantId.$anyError ? errorClass[1] : activeClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.terminal.merchantId.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.terminal.type.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputWarning1">Type</label>
              <select class="form-control" id="exampleSelect1" v-model="$v.terminal.type.$model">
                <option>ATM</option>
                <option>POS</option>
                <option>EPOS</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.terminal.type.required">Select at least one type</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.terminal.formatPinBlock.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >Pin Block Format</label>
              <input type="text" v-model="$v.terminal.formatPinBlock.$model" class="form-control">
              <span :class="[!$v.terminal.formatPinBlock.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.terminal.formatPinBlock.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.terminal.formatPinBlock.numeric">this field is must numeric</span>
              <span class="form-control-feedback" v-if="!$v.terminal.formatPinBlock.minLength">this field is must more 2 digit</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-3">
            <div class="form-group" >
              <label class="form-control-label" for="inputSuccess1" >Account</label>
              <multiselect v-model="terminal.accounts" :options="accounts" :multiple="true" track-by="account" label="account" selectLabel="Enter for Select" deselectLabel="Enter for remove "></multiselect>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.terminal.country.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputWarning1">Country</label>
              <select class="form-control" id="exampleSelect1" v-model="$v.terminal.country.$model">
                <option>686 SENEGAL</option>
                <option>404 Kenya</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.terminal.country.required">Select at least one status</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.terminal.tmk.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">TMK</label>
              <input type="text" v-model.trim="$v.terminal.tmk.$model" class="form-control">
              <span :class="[!$v.terminal.tmk.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.terminal.tmk.required">this field is required</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label class="form-control-label">TPK </label>
              <input type="text" v-model="terminal.tpk" class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-12 form-group">
            <label class="form-control-label" for="inputWarning1">EMV</label>
            <textarea class="form-control " id="inputSuccess1" v-model="terminal.emv" ></textarea>
            <span class="glyphicon glyphicon-alert right"></span>
            <span class="form-control-feedback"></span>
            </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <div class="ln_solid"></div>
            <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-4">
						  <button class="btn btn-warning" @click="reset">Reset <i class="fa fa-refresh fa-spin fa-fw"></i></button>
              <button class="btn btn-success" @click="submit">{{action.button}} <i :class="action.icon"></i></button>
              <button class="btn btn-danger" v-if="bdel" @click="delTerminal">Delete <i class="fa fa-trash"></i></button>
            </div>
          </div>
        </div>
      </my-panel>
      <my-panel title="terminal" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="terminals" styleClass="table table-striped table-bordered jambo_table bulk_action"
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
           @on-row-click="onRowClick"
           @on-row-dblclick="onRowDoubleClick"
          >
          <div slot="table-actions">
             <button class="btn btn-success">Export <i class="fa fa-file"></i></button>
             <button class="btn btn-primary" @click="refresh">Reloads <i class="fa fa-refresh"></i></button>
             <button class="btn btn-info" @click="showTerminal=true">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Account" stitle="list" colsize="col-md-6">
        <vue-good-table :columns="columns1" :rows="TerminalAccounts" styleClass="table table-striped table-bordered jambo_table bulk_action">
        </vue-good-table>
      </my-panel>
      <my-panel title="EMV" stitle="Tags" colsize="col-md-6">
        <vue-good-table :columns="columns2" :rows="rows2" styleClass="table table-striped table-bordered jambo_table bulk_action">
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import Multiselect from 'vue-multiselect'
import { ALL_TERMINALS_QUERY,ALL_ACCOUNTS_QUERY,ADD_TERMINAL_MUTATION,DELETE_TERMINAL_MUTATION, } from '@/graphql/terminal.js'
import { required, minLength, between, numeric,helpers } from 'vuelidate/lib/validators'
import { error } from 'util';
import { all } from 'async';
const track=helpers.regex('track',/\d{0,19}=\d{15}[0-9a-fA-F]{5,}\?/)
export default {
  components:{MyPanel,Multiselect},
  data(){
    return{
      showTerminal:false,
      activeClass:['','glyphicon glyphicon-check right'],
      errorClass:['has-error','glyphicon glyphicon-remove-circle right'],
      activedEmv:true,
      accounts:[],
      terminal:{
        id:'',
        terminalId:'',
        merchantId:'',
        type:'',
        formatPinBlock:'',
        accounts:[],
        emv:'',
        country:'',
        tmk:'',
        tpk:'',
      },
      bdel:false,
      action:{
        button:'Add',
        icon:'fa fa-plus',
      },
      terminals:[],
      TerminalAccounts:[],
      showAdd:false,
      columns: [
        {
          label: 'Terminal Id',
          field: 'terminalId',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Terminal Id ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },

        },
        {
          label: 'Pin',
          field: 'formatPinBlock', 
        },
        {
          label: 'Merchant Id',
          field: 'merchantId',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Merchant ID ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Type',
          field: 'type',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Type ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Country',
          field: 'country',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Country ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'TMK',
          field: 'tmk',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'TMK ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'TPK',
          field: 'tpk',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'TPK ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
      ],
      columns1: [
        {
          label: 'Account',
          field: 'account',
          filterable: true,
        },
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Balance',
          field: 'balance',
        },
      ],
      columns2: [
        {
          label: 'Tag',
          field: 'tag',
        },
        {
          label: 'Len',
          field: 'len',
        },
        {
          label: 'Value',
          field: 'value',
        },
      ],
      rows2: [
        { id:1, tag:"0f27", value: '001255',len: "03"},
        { id:2, tag:"0f28", value: '00000001',len: "05"},
        { id:3, tag:"91", value: '001255007722',len: "06"},
        ],
        rowSelected:{},
    }
  }, 
  validations:{
    terminal:{
          terminalId:{
            required,
          },
          merchantId:{
            required,
          },
          type:{
            required,
          },
          country:{
            required,
          },
          tmk:{
            required,
          },
          formatPinBlock:{
            required,
            minLength:minLength(2),
            numeric
          }
    }
  },
  methods:{
    refresh(){
      this.$apollo.queries.terminals.refetch() 
    },
    getAccount(accounts){
      return accounts.map(function(account){
        return account.account
      })
    },
    submit(){
        this.activeClass[0]='has-success'
        this.$v.$touch()
        if (this.$v.$invalid){
          console.log('Error')
        }else{
          let terminal={
            id:this.terminal.id,
            terminalId:this.terminal.terminalId,
            merchantId:this.terminal.merchantId,
            formatPinBlock:this.terminal.formatPinBlock,
            type:this.terminal.type,
            emv:this.terminal.emv,
            tmk:this.terminal.tmk,
            tpk:this.terminal.tpk,
            country:this.terminal.country,
            accounts:this.getAccount(this.terminal.accounts),
          }
          console.log(terminal)
          this.$apollo
          .mutate(
            {
            mutation: ADD_TERMINAL_MUTATION,
            variables: {
              input: terminal
            },
            update: (cache, { data: { createTerminal } }) => {
              const allTerminalss = cache.readQuery({ query: ALL_TERMINALS_QUERY });
              let id=createTerminal.id
              let index = allTerminalss.terminals.findIndex(terminal => terminal.id==id)
              if(index==-1){
                allTerminalss.terminals.push(createTerminal)
              }else{
                allTerminalss.terminals.splice(index,1,createTerminal)
              }
              cache.writeQuery({
                query: ALL_TERMINALS_QUERY,
                data: {
                  allTerminalss: allTerminalss
                }
              });
            },
            /*optimisticResponse: {
              __typename: 'Mutation',
              createTerminal: {
                __typename: 'Terminal',
                id: -1,
                terminal: terminal,
              },
            },*/
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
        }
      },
    delTerminal(){
      this.$apollo
          .mutate({
            mutation: DELETE_TERMINAL_MUTATION,
            variables: {
              id: this.terminal.id
            },
            update: (cache, { data: { deleteTerminal } }) => {
              const { allTerminalss } = cache.readQuery({ query: ALL_TERMINALS_QUERY });
              let id=deleteTerminal.id
              let index = allTerminalss.terminals.findIndex(terminal => terminal.id==id)
              if(index > -1){
                allTerminalss.terminals.splice(index,1)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_TERMINALS_QUERY,
                data: {
                  allTerminalss: allTerminalss
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
      this.terminal={
        id:'',
        terminalId:'',
        merchantId:'',
        type:'',
        formatPinBlock:'',
        accounts:[],
        emv:'',
        country:'',
      }
    },
    onRowClick(params){
      this.TerminalAccounts=params.row.accounts
    },
    onRowDoubleClick(params){
      let accounts=[]
      for (let element of params.row.accounts)
        accounts.push(element.account)
      this.terminal=Object.assign({},params.row)
      this.terminal.accounts=accounts
      this.action={
        button:'Update',
        icon:'fa fa-edit',
      }
      this.bdel=true
      this.showTerminal=true
    }
  },
  apollo:{
    terminals:{
      query:ALL_TERMINALS_QUERY,
      //fetchPolicy: 'no-cache'
    },
    accounts:{
      query:ALL_ACCOUNTS_QUERY,
      //fetchPolicy: 'no-cache'
    }
  }
}
</script>