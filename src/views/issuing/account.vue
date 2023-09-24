<template>
    <div class="row">
      <my-panel title="Account" stitle="add" colsize="col-md-12" :show="showAccount" @close="showAccount=false">
        <div class="col-md-12">
          <div class="col-md-4">
            <div class="form-group" :class="[!$v.account.account.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >Account</label>
              <input type="text" v-model="$v.account.account.$model" class="form-control">
              <span :class="[!$v.account.account.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.account.account.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.account.account.numeric">this field must numeric</span>
              <span class="form-control-feedback" v-if="!$v.account.account.minLenght">this field must more 11</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group" :class="[!$v.account.balance.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >Balance</label>
              <input type="text" v-model="$v.account.balance.$model" class="form-control">
              <span :class="[!$v.account.balance.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.account.balance.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.account.balance.numeric">this field must numeric</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label" for="inputSuccess1" >Currency</label>
              <select class="form-control" id="exampleSelect1" v-model="account.currency">
                <option>952 (XOF)</option>
                <option>840 (USD)</option>
                <option>978 (EUR)</option>
              </select>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-control-label" for="inputWarning1">Type</label>
              <select class="form-control" id="exampleSelect1" v-model="account.type">
                <option>Saving</option>
                <option>Checking</option>
                <option>Prepayed</option>
              </select>
              <span class="glyphicon glyphicon-alert right"></span>
              <span class="form-control-feedback"></span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-control-label" for="inputWarning1">Status</label>
              <select class="form-control" id="exampleSelect1" v-model="account.status">
                <option>No Restriction</option>
                <option>No Transfer</option>
                <option>No Balance</option>
              </select>
              <span class="glyphicon glyphicon-alert right"></span>
              <span class="form-control-feedback"></span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <div class="ln_solid"></div>
            <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-4">
						  <button class="btn btn-warning" @click="reset">Reset <i class="fa fa-refresh fa-spin fa-fw"></i></button>
              <button class="btn btn-success" @click="submit">{{action.button}} <i :class="action.icon"></i></button>
              <button class="btn btn-danger" v-if="bdel" @click="delAccount">Delete <i class="fa fa-trash"></i></button>
            </div>
          </div>
        </div>
      </my-panel>
      <my-panel title="Account" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="accounts" styleClass="table table-striped table-bordered jambo_table bulk_action" 
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
             <button class="btn btn-info" @click="showAccount=true">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Operation" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns1" :rows="operations" styleClass="table table-striped table-bordered jambo_table bulk_action" 
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
             <button class="btn btn-success">Export <i class="fa fa-file"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import { ALL_ACCOUNTS_QUERY,ADD_ACCOUNT_MUTATION,DELETE_ACCOUNT_MUTATION, } from '@/graphql/account.js'
import { required, minLength,maxLenght, between, numeric } from 'vuelidate/lib/validators'
export default {
  components:{MyPanel},
  data(){
    return{
      showAccount:false,
      activeClass:['','glyphicon glyphicon-check right'],
      errorClass:['has-error','glyphicon glyphicon-remove-circle right'],
      bdel:false,
      action:{
        button:'Add',
        icon:'fa fa-plus',
      },
      account:{
        id:'',
        account:'',
        balance:'',
        currency:'',
        type:'',
        status:'',
      },
      accounts:[],
      operations:[],
      showAdd:false,
      columns: [
        {
          label: 'Account',
          field: 'account',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Account ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },

        },
        {
          label: 'Balance',
          field: 'balance',
          type: 'number',
          width:'200px',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Amount ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Currency',
          field: 'currency',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Currency ... ',  // placeholder for filter input
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
          label: 'Status',
          field: 'status',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Status ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
      ],
      columns1: [
        {
          label: 'Operation',
          field: 'operation',
          filterable: true,
        },
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Date',
          field: 'date',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD', // expects 2018-03-16
          dateOutputFormat: 'D MMM  YYYY', // outputs Mar 16th 2018
        },
        {
          label: 'Amount',
          field: 'amount',
          type: 'number'
        },
        {
          label: 'Old Balance',
          field: 'old_balance',
          type:'number',
        },
        {
          label: 'New balance',
          field: 'new_balance',
          type:'number',
        },
      ],
    }
  }, 
  methods : {

    refresh(){
      this.$apollo.queries.accounts.refetch() 
    },
    submit(){
        this.activeClass[0]='has-success'
        this.$v.$touch()
        if (this.$v.$invalid){
          console.log('Error')
        }else{
         let account={
            id:this.account.id,
            account:this.account.account,
            balance:this.account.balance,
            currency:this.account.currency,
            type:this.account.type,
            status:this.account.status,
          }
          console.log('account',account)
          this.$apollo
          .mutate({
            mutation: ADD_ACCOUNT_MUTATION,
            variables: {
              input: account
            },
            update: (cache, { data: { createAccount } }) => {
              const allAccountss = cache.readQuery({ query: ALL_ACCOUNTS_QUERY });
              let id=this.account.id
              if(id==''){
                allAccountss.accounts.push(createAccount)
                this.reset()
              }else{
                let index = allAccountss.accounts.findIndex(account => account.id==id)
                allAccountss.accounts.splice(index,1,createAccount)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_ACCOUNTS_QUERY,
                data: {
                  allAccountss: allAccountss
                }
              });
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createAccount: {
                __typename: 'Account',
                id: -1,
                account: account,
              },
            },
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
        }
    },
    delAccount(){
       this.$apollo
          .mutate({
            mutation: DELETE_ACCOUNT_MUTATION,
            variables: {
              id: this.account.id
            },
            update: (cache, { data: { deleteAccount } }) => {
              const  allAccountss  = cache.readQuery({ query: ALL_ACCOUNTS_QUERY });
              let index = allAccountss.accounts.findIndex(account => account.id==id)
              if(index>-1){
                allAccountss.accounts.splice(index,1)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_ACCOUNTS_QUERY,
                data: {
                  allAccountss: allAccountss
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
      this.account={
        id:'',
        account:'',
        balance:'',
        type:'',
        currency:'',
        status:'',
      }
      this.action={
        button:'Add',
        icon:'fa fa-plus',
      }
      this.bdel=false
    },
    onRowClick(params){
      this.operations=params.row.operation
    },
    onRowDoubleClick(params){
      this.account=params.row
      delete this.account.operation
      this.action={
        button:'Update',
        icon:'fa fa-edit',
      }
      this.bdel=true
      this.showAccount=true
    }

  },
  validations:{
    account:{
      account:{
        required,
        numeric,
        minLength:minLength(11),
      },  
      balance:{
        required,
        numeric,
      },
    }
  },
  apollo:{
    accounts:{
      query:ALL_ACCOUNTS_QUERY
    }
  }
}
</script>