<template>
    <div class="row">
      <my-panel title="Network" stitle="add" colsize="col-md-12" :show="showNetwork" @close="showNetwork=false">
        <div class="col-md-12">
          <div class="col-md-4">
            <div class="form-group" :class="[!$v.network.ip.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">IP</label>
              <input type="text" class="form-control " v-model.trim="$v.network.ip.$model">
              <span :class="[!$v.network.ip.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.network.ip.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.network.ip.ipAddress">this field must a ip address</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group" :class="[!$v.network.port.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">Port</label>
              <input type="text" class="form-control " v-model.trim="$v.network.port.$model">
              <span :class="[!$v.network.port.$anyError ? activeClass[1] : errorClass[1]]"></span>
              <span class="form-control-feedback" v-if="!$v.network.port.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.network.port.numeric">this field must a numeric</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-control-label" for="inputSuccess1" >Spec</label>
              <multiselect v-model="spec" :options="deleteType(specs)" track-by="name" label="name"></multiselect>
              <span class="glyphicon glyphicon-ok right"></span>
              <span class="form-control-feedback" aria-hidden="true">Success</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col-md-6">
            <div class="form-group" :class="[!$v.network.zmk.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">ZMK</label>
              <the-mask :mask="['FFFF-FFFF-FFFF-FFFF','FFFF-FFFF-FFFF-FFFF FFFF-FFFF-FFFF-FFFF']" :tokens="hexTokens" v-model="$v.network.zmk.$model" class="form-control" />
              <span class="form-control-feedback" v-if="!$v.network.zmk.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.network.zmk.error">this field must a HEX and lenght is 16 or 32</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="[!$v.network.zpk.$anyError ? activeClass[0] : errorClass[0]]">
              <label class="form-control-label">ZPK</label>
              <the-mask :mask="['FFFF-FFFF-FFFF-FFFF','FFFF-FFFF-FFFF-FFFF FFFF-FFFF-FFFF-FFFF']" :tokens="hexTokens" v-model="$v.network.zpk.$model" class="form-control" />
              <span class="form-control-feedback" v-if="!$v.network.zpk.required">this field is required</span>
              <span class="form-control-feedback" v-if="!$v.network.zpk.error">this field must a HEX and lenght is 16 or 32</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <div class="ln_solid"></div>
            <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-4">
						  <button class="btn btn-warning" @click="reset">Reset <i class="fa fa-refresh fa-spin fa-fw"></i></button>
              <button class="btn btn-success" @click="submit">{{action.button}} <i :class="action.icon"></i></button>
              <button class="btn btn-danger" v-if="bdel" @click="delNetwork">Delete <i class="fa fa-trash"></i></button>
            </div>
          </div>
        </div>
      </my-panel>
      <my-panel title="Network" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="networks" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick" 
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
             <button class="btn btn-primary" @click="refresh">Reloads <i class="fa fa-refresh"></i></button>
             <button class="btn btn-info" @click="showNetwork=true">Add <i class="fa fa-plus"></i></button>
          </div>
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import Multiselect from 'vue-multiselect'
import {TheMask} from 'vue-the-mask'
import toastr from 'toastr'
import {ALL_NETWORKS_QUERY,ALL_SPECS_QUERY,ADD_NETWORK_MUTATION,DELETE_NETWORK_MUTATION} from '@/graphql/network.js'
import { required, email, numeric,ipAddress, helpers } from 'vuelidate/lib/validators';
const hex=helpers.regex('hex',/([0-9a-fA-F]{16})|([0-9a-fA-F]{32})/)
export default {
  components:{MyPanel,Multiselect,TheMask},
  data(){
    return{
      hexTokens: {
        F: {
          pattern: /[0-9a-fA-F]/,
          transform: v => v.toLocaleUpperCase()
        }
      },
      showNetwork:false,
      activeClass:['','glyphicon glyphicon-check right'],
      errorClass:['has-error','glyphicon glyphicon-remove-circle right'],
      network:{
        id:'',
        ip:'',
        port:'',
        spec:'',
        zpk:'',
        zmk:'',
      },
      specs:[],
      spec:{},
      networks:[],
      showAdd:false,
      columns: [
        {
          label: 'IP',
          field: 'ip',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Ip ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Port',
          field: 'port',
          type: 'number',
          width:'200px',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Port ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Spec',
          field: 'spec',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Spect ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'ZMK',
          field: 'zmk',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'ZMK ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'ZPK',
          field: 'zpk',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'ZPK ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
      ],
      bdel:false,
      action:{
        button:'Add',
        icon:'fa fa-plus',
      },
    }
  }, 
  methods : {
    onRowDoubleClick(params) {
      this.network=Object.assign({},params.row)
      //this.spec.name=this.network.spec
      this.action={
        button:'Update',
        icon:'fa fa-edit',
      }
      this.bdel=true
      this.showNetwork=true
    },
    refresh(){
        this.$apollo.queries.networks.refetch() 
      },
    deleteType(list){
        let l=[]
        for (let element of list){
          delete element.__typename
          l.push(element)
        }
        return l
    },
    submit(){
        this.activeClass[0]='has-success'
        this.$v.$touch()
        if (this.$v.$invalid){
          console.log()
        }else
         console.log('Success')
         let network=this.network
         network.spec=this.spec.name
         console.log(network)
         this.$apollo
          .mutate(
            {
            mutation: ADD_NETWORK_MUTATION,
            variables: {
              input: network
            },
            update: (cache, { data: { createNetwork } }) => {
              const allNetworkss = cache.readQuery({ query: ALL_NETWORKS_QUERY });
              let id=createNetwork.id
              let index = allNetworkss.networks.findIndex(network => network.id==id)
              if(index==-1){
                allNetworkss.networks.push(createNetwork)
                toastr.success('A new network is created')
              }else{
                allNetworkss.networks.splice(index,1,createNetwork)
                toastr.success('The network is updated')
              }
              cache.writeQuery({
                query: ALL_NETWORKS_QUERY,
                data: {
                  allNetworkss: allNetworkss
                }
              });
              
            },
          })
          .catch(error =>{
            console.log('Error ::: ',error)
          })
          this.reset()
    },
    delNetwork(){
      this.$apollo
          .mutate({
            mutation: DELETE_NETWORK_MUTATION,
            variables: {
              id: this.network.id
            },
            update: (cache, { data: { deleteNetwork } }) => {
              const { allNetworkss } = cache.readQuery({ query: ALL_NETWORKS_QUERY });
              let id=deleteNetwork.id
              let index = allNetworkss.networks.findIndex(network => network.id==id)
              if(index > -1){
                allNetworkss.networks.splice(index,1)
                this.reset()
              }
              cache.writeQuery({
                query: ALL_NETWORKS_QUERY,
                data: {
                  allNetworkss: allNetworkss
                }
              });
            },
          },
          )
          .catch(error =>{
            console.log('Error ::: ',error)
          })
          this.reset()
    },
    reset(){
        this.activeClass[0]=''
        this.$v.$reset()
        this.spec={}
        this.network={
                        ip:'',
                        port:'',
                        spec:'',
                        zpk:'',
                        zmk:'',
                      }
    }
  },
  validations:{
    network:{
      ip:{
        required,
        ipAddress
      },
      port:{
        required,
        numeric,
      },
      spec:{
        required
      },
      zmk:{
        required,
        hex
      },
      zpk:{
        required,
        hex
      }
    }
  },
  apollo:{
        specs:{
            query:ALL_SPECS_QUERY,
        },
        networks:{
            query:ALL_NETWORKS_QUERY,
        },

    }

}
</script>

