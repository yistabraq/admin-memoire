<template>
    <div class="row">
    <my-panel title="transaction" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="transactions" @on-row-click="onRowClick" styleClass="table table-striped table-bordered jambo_table bulk_action"
        :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 10,
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
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'resp'">
                <span style="font-weight: bold; color: green;" v-if="props.row.resp.substr(0, 3) =='000'">{{props.row.resp}}</span> 
                <span style="font-weight: bold; color: red;" v-else>{{props.row.resp}}</span> 
            </span>
            <span v-else>
            {{props.formattedRow[props.column.field]}}
            </span>
          </template>
          <div slot="table-actions">
             <button class="btn btn-success">Export <i class="fa fa-file"></i></button>
             <button class="btn btn-info" @click="refresh()">Loads <i class="fa fa-refresh"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
    <my-panel title="Fields" stitle="Data" colsize="col-md-12">
        <vue-good-table :columns="col" :rows="fields"  styleClass="table table-striped table-bordered jambo_table bulk_action"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'response'">
                <pre><code> {{props.row.response}}</code></pre> 
            </span>
            <span v-if="props.column.field == 'request'">
                <pre class="language-json"><code> {{props.row.request}}</code></pre> 
            </span>
          </template>
        </vue-good-table>
      </my-panel>
    </div>
</template>
<script>
import MyPanel from '@/components/panel.vue'
import { ALL_TRANSACTIONS_QUERY} from '@/graphql/transaction.js'
export default {
    name:'dashboard',
    components : {MyPanel},
    data(){
        return{
            columns:[
                {
                    label: 'Date_Time',
                    field: 'date_time',
                    type: 'date',
                    width:'140px',
                    sortable: true,
                    dateInputFormat: 'YYYY/MM/DD hh:mm:ss', // expects 2018-03-16
                    dateOutputFormat: 'YY-MM-DD hh:mm:ss', // outputs Mar 16th 2018
                    
                },
                {
                    label: 'PAN',
                    field: 'pan',
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Date ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
                {
                    label: 'Terminal ID',
                    field: 'terminalId',
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Terminal ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
                {
                    label: 'Transaction type',
                    field: 'transaction',
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Transaction ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
                {
                    label: 'SPEC',
                    field: 'spec',
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Spec ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
                {
                    label: 'Response',
                    field: 'resp',
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Response ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
                {
                    label: 'Utrnno',
                    field: 'utrnno',
                    sortable: true,
                    filterOptions: {
                            enabled: true, 
                            placeholder:'Utrnno ... ', 
                            filterDropdownItems: [],
                            filterFn: this.columnFilterFn, 
                        },
                },
            ],
            col:[
                {
                    label: 'Request',
                    field: 'request', 
                },
                {
                    label: 'Response',
                    field: 'response', 
                },
            ],
            transactions:[],
            fields:[],
        }
    },
    methods: {
        refresh(){
            this.$apollo.queries.transactions.refetch() 
        },
        onRowClick(params) { 
            let request={}
            request['request'] =JSON.parse(params.row.req)
            request['response'] =JSON.parse(params.row.res)
            this.fields=[]
            this.fields.push(request)
        },
    },
    apollo:{
        transactions:{
            query:ALL_TRANSACTIONS_QUERY,
        },
    }
}
</script>
