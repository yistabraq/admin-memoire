<template>
    <div class="row">
        <my-panel title="Run" stitle="Test" colsize="col-md-12" :show="showRun" @close="showRun=false">
            <div class="col-md-12">
                <div class="col-md-3">
                    <label class="form-control-label">SPEC</label>
                    <multiselect v-model="params.spec" label="name" track-by="name"  :options="getSpecs()" :disabled="!isDisabled">
                    </multiselect>
                </div>
                <div class="col-md-2">
                    <label class="form-control-label">Category</label>
                    <multiselect v-model="params.category"  :options="category" :disabled="!isDisabled">
                    </multiselect>
                </div>
                <div class="col-md-4">
                    <label class="form-control-label">CARD</label>
                    <multiselect v-model="params.card" :disabled="isDisabled" label="pan" track-by="pan" :options="getCard()">
                    </multiselect>
                </div>
                <div class="col-md-3">
                    <label class="form-control-label">TERMINAL</label>
                    <multiselect v-model="params.terminal" :disabled="isDisabled"  track-by="terminalId" label="terminalId" :options="getTerminal()">
                    </multiselect>
                </div>
            </div>
            <div class="col-md-12">
                <div class="ln_solid"></div>
                <div class="col-md-offset-4 col-md-2">
                    <button class="btn btn-success" @click="loads()"> Loads</button>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary" @click="reset()"> Reset</button>
                </div>
            </div>
            <div class="col-md-12">
                <div class="ln_solid"></div>
            </div>
            <div class="col-md-12">
                <vue-good-table :columns="colTransactionType" :rows="transactionTypes" styleClass="table table-striped table-bordered jambo_table bulk_action" 
                    :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 15,
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
                    }">
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'fields'">
                            <div class="btn-group" v-for="item in props.row.fields" :key="item.field">
                                <button class="btn btn-sm btn-default" type="button"  data-placement="top" data-toggle="tooltip" :title="item.action">{{item.field}}</button>
                            </div>
                        </span>
                        <span v-else-if="props.column.field == 'id'">
                            <button class="btn btn-warning"><i class="fa fa-edit"> Edit</i></button>
                            <button class="btn btn-info" @click="play(props.row)"><i class="fa fa-play"> Play</i></button>
                        </span>
                        <span v-else>
                            {{props.formattedRow[props.column.field]}}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </my-panel>
    </div>
</template>
<script>
import MyPanel from '@/components/panel.vue'
import Multiselect from 'vue-multiselect'
import toastr from 'toastr'
import { ALL_CARDS_QUERY,ALL_TERMINALS_QUERY,ALL_SPECS_QUERY,ALL_TRANSACTIONTYPES_QUERY,ADD_TRASACTION_MUTATION} from '@/graphql/run.js'
export default {
     components:{MyPanel,Multiselect},
     data(){
         return{
             showRun:true,
             isDisabled:true,
             specs:[],
             cards:[],
             terminals:[],
             transactionTypes:[],
             category:[
                 'Issuing',
                 'Aquering',
             ],
             params:{
                 spec:{},
                 category:'',
                 card:{},
                 terminal:{},
             },
             colTransactionType: [
                {
                label: 'Name',
                field: 'name',
                },
                {
                label: 'mti',
                field: 'mti',
                },
                {
                label: 'Fields',
                field: 'fields',
                },
                {
                label: 'Action',
                field: 'id',
                },
             ]

         }
     },
     methods:{
         loads(){
             this.isDisabled=false
             this.$apollo.queries.transactionTypes.skip = false
             this.$apollo.queries.transactionTypes.refetch()
             this.$apollo.queries.cards.refetch()
             this.$apollo.queries.terminals.refetch()
         },
         reset(){
             this.isDisabled=true
             this.transactionTypes=[]
         },
         getCard(){
             let cards=[]
             for(let card of this.cards){
                 let element={}
                 element.track2=card.track2
                 element.pin=card.pin
                 element.pan=card.track2.substr(0, card.track2.indexOf('=')-1)
                 cards.push(element)
             }
            return cards
         },
         getTerminal(){
             let terminals=[]
             for(let terminal of this.terminals){
                 let element={}
                 element.terminalId=terminal.terminalId
                 element.merchantId=terminal.merchantId
                 element.country=terminal.country
                 terminals.push(element)
             }
            return terminals
         },
         getSpecs(){
             return this.deleteType(this.specs)
         },
         getFields(fields){
             let output=[]
             for (let i = 0; i < fields.length; i++) {
                 const element = fields[i].field;
                 output.push(element)
             }
             return output
         },
         play(input){
             let transaction={}
             transaction.card=this.params.card
             transaction.terminal=this.params.terminal
             transaction.spec=this.params.spec
             transaction.mti=input.mti
             transaction.name=input.name
             transaction.type=input.type
             transaction.fields=this.deleteType(input.fields)
             console.log('fields', transaction.spec)
             //transaction.category=input.category
             //console.log('transaction',transaction)
             this.$apollo
                .mutate(
                    {
                    mutation: ADD_TRASACTION_MUTATION,
                    variables: {
                    input: transaction
                    },
                    update: (cache, { data: { createTransaction } }) => {
                        toastr.success(createTransaction.message,'A new transaction is lanched with utrnno:')
                    },
                })
                .catch(error =>{
                    console.log('Error ::: ',error)
                })
         },
         deleteType(list){
            let l=[]
            for (let element of list){
                delete element.__typename
                l.push(element)
            }
            return l
        },
         
     },
     apollo:{
        specs:{
            query:ALL_SPECS_QUERY,
        },
        cards:{
            query:ALL_CARDS_QUERY,
        },
        terminals:{
            query:ALL_TERMINALS_QUERY,
        },
        transactionTypes:{
            query:ALL_TRANSACTIONTYPES_QUERY,
            variables() {
                return {
                    category: this.params.category,
                    spec: this.params.spec.name,
                }
            },
            skip() {
                return this.skipQuery
            },
        }
  }
}
</script>
