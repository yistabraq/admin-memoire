<template>
    <div class="row">
      <my-panel title="Card" stitle="add" colsize="col-md-12" :show="showCard" @close="showCard=false">
        <div class="col-md-12">
          <div class="col-md-6">
            <div class="form-group" :class="[!$v.card.track2.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Track 2</label>
              <input type="text" v-model.trim="$v.card.track2.$model" class="form-control">
              <span :class="[!$v.card.track2.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.card.track2.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.card.track2.track">this field is must in format hh</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="[$v.card.cardholder.$anyError ? errorClass[0] : activeClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >Cardholder</label>
              <input type="text" v-model="$v.card.cardholder.$model" class="form-control">
              <span :class="[$v.card.cardholder.$anyError ? errorClass[1] : activeClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.card.cardholder.required">this field is required</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.card.pin.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputSuccess1" >PIN</label>
              <input type="text" v-model="$v.card.pin.$model" class="form-control">
              <span :class="[!$v.card.pin.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.card.pin.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.card.pin.numeric">this field is must numeric</span>
              <span class="form-control-feedback" v-if="!$v.card.pin.minLength">this field is must more 4 digit</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" >
              <label class="form-control-label" for="inputSuccess1" >Account</label>
              <multiselect v-model="card.accounts" :options="accounts" :multiple="true" track-by="account" label="account" selectLabel="Enter for Select" deselectLabel="Enter for remove "></multiselect>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.card.status.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputWarning1">Status</label>
              <select class="form-control" id="exampleSelect1" v-model="$v.card.status.$model">
                <option>Active</option>
                <option>Inactive</option>
                <option>Forced Pin Change</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.card.status.required">Select at least one status</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group" :class="[!$v.card.type.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label" for="inputWarning1">Type</label>
              <select class="form-control" id="exampleSelect1" v-model="$v.card.type.$model" @change="activeEmv">
                <option>Chips</option>
                <option>Magtrip</option>
              </select>
              <span class="form-control-feedback" v-if="!$v.card.type.required">Select at least one type</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-12 form-group">
            <label class="form-control-label" for="inputWarning1">EMV</label>
            <textarea class="form-control " id="inputSuccess1" v-model="card.emv" :disabled="activedEmv"></textarea>
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
              <button class="btn btn-danger" v-if="bdel" @click="delCard">Delete <i class="fa fa-trash"></i></button>
            </div>
          </div>
        </div>
      </my-panel>
      <my-panel title="card" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="cards" styleClass="table table-striped table-bordered jambo_table bulk_action"
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
             <button class="btn btn-info" @click="showCard=true">Add <i class="fa fa-plus"></i></button>
          </div>
        </vue-good-table>
      </my-panel>
      <my-panel title="Account" stitle="list" colsize="col-md-6">
        <vue-good-table :columns="columns1" :rows="CardAccounts" styleClass="table table-striped table-bordered jambo_table bulk_action">
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
import { ALL_CARDS_QUERY,ALL_ACCOUNTS_QUERY,ADD_CARD_MUTATION,DELETE_CARD_MUTATION, } from '@/graphql/card.js'
import { required, minLength, between, numeric,helpers } from 'vuelidate/lib/validators'
import { error } from 'util';
import { all } from 'async';
const track=helpers.regex('track',/\d{0,19}=\d{15}[0-9a-fA-F]{5,}/)
export default {
  components:{MyPanel,Multiselect},
  data(){
    return{
      showCard:false,
      activeClass:['','glyphicon glyphicon-check right'],
      errorClass:['has-error','glyphicon glyphicon-remove-circle right'],
      activedEmv:true,
      accounts:[],
      card:{
        id:'',
        track2:'',
        cardholder:'',
        type:'',
        pin:'',
        accounts:[],
        emv:'',
        status:'',
      },
      bdel:false,
      action:{
        button:'Add',
        icon:'fa fa-plus',
      },
      cards:[],
      CardAccounts:[],
      showAdd:false,
      columns: [
        {
          label: 'Track2',
          field: 'track2',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'track2 ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },

        },
        {
          label: 'PIN',
          field: 'pin', 
        },
        {
          label: 'Cardholder',
          field: 'cardholder',
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
    card:{
          track2:{
            required,
            track
          },
          cardholder:{
            required,
          },
          type:{
            required,
          },
          status:{
            required,
          },
          pin:{
            required,
            minLength:minLength(4),
            numeric
          }
    }
  },
  methods:{
    refresh(){
      this.$apollo.queries.cards.refetch() 
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
          let card={
            id:this.card.id,
            track2:this.card.track2,
            cardholder:this.card.cardholder,
            pin:this.card.pin,
            type:this.card.type,
            emv:this.card.emv,
            status:this.card.status,
            accounts:this.getAccount(this.card.accounts),
          }
          this.$apollo
          .mutate(
            {
            mutation: ADD_CARD_MUTATION,
            variables: {
              input: card
            },
            update: (cache, { data: { createCard } }) => {
              const allCardss = cache.readQuery({ query: ALL_CARDS_QUERY });
              let id=createCard.id
              let index = allCardss.cards.findIndex(card => card.id==id)
              if(index==-1){
                allCardss.cards.push(createCard)
              }else{
                allCardss.cards.splice(index,1,createCard)
              }
              cache.writeQuery({
                query: ALL_CARDS_QUERY,
                data: {
                  allCardss: allCardss
                }
              });
            },
            /*optimisticResponse: {
              __typename: 'Mutation',
              createCard: {
                __typename: 'Card',
                id: -1,
                card: card,
              },
            },*/
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
        }
      },
    delCard(){
      this.$apollo
          .mutate({
            mutation: DELETE_CARD_MUTATION,
            variables: {
              id: this.card.id
            },
            update: (cache, { data: { deleteCard } }) => {
              const { allCardss } = cache.readQuery({ query: ALL_CARDS_QUERY });
              let id=deleteCard.id
              let index = allCardss.cards.findIndex(card => card.id==id)
              if(index > -1){
                allCardss.cards.splice(index,1)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_CARDS_QUERY,
                data: {
                  allCardss: allCardss
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
      this.card={
        id:'',
        track2:'',
        cardholder:'',
        type:'',
        pin:'',
        accounts:[],
        emv:'',
        status:'',
      }
    },
    activeEmv(){
      if(this.card.type =='Chips')
         this.activedEmv=false
      else
        this.activedEmv=true  
    },
    onRowClick(params){
      this.CardAccounts=params.row.accounts
    },
    onRowDoubleClick(params){
      let accounts=[]
      for (let element of params.row.accounts)
        accounts.push(element.account)
      this.card=Object.assign({},params.row)
      this.card.accounts=accounts
      this.action={
        button:'Update',
        icon:'fa fa-edit',
      }
      this.bdel=true
      this.showCard=true
    }
  },
  apollo:{
    cards:{
      query:ALL_CARDS_QUERY,
      //fetchPolicy: 'no-cache'
    },
    accounts:{
      query:ALL_ACCOUNTS_QUERY,
      //fetchPolicy: 'no-cache'
    }
  }
}
</script>