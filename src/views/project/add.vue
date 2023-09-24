<template>
    <div class="row">
        <my-panel title="Information" stitle="Add" colsize="col-md-12">
            <div class="col-md-3">
                <div class="form-group">
                <label class="form-control-label">Name</label>
                <input type="text" class="form-control " v-model="project.name">
                <span class="glyphicon glyphicon-ok right"></span>
                <span class="form-control-feedback" aria-hidden="true">Success!</span>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                <label class="form-control-label">Category</label>
                <multiselect v-model="project.category" :options="categories"></multiselect>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                <label class="form-control-label">Membres</label>
                <multiselect v-model="project.membres" :options="membres" :multiple=true></multiselect>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                <label class="form-control-label">Spec</label>
                <multiselect v-model="project.spec" :options="specs" track-by="name" label="name" @select="selectSpec"></multiselect>
                </div>
            </div>
            <div class="col-md-12">
                <vue-good-table :columns="colTransactionType" :rows="transactionTypes" styleClass="table table-striped table-bordered jambo_table bulk_action"
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
                }"
                @on-selected-rows-change="selectionChanged"
                >
            </vue-good-table>
            </div>
            <br/>
            <br/>
            <br>
            <div class="row">
                <div class="col-md-offset-5 col-md-1">
                    <button class="btn btn-success btn-lg" @click="add">Submit</button>
                </div>
            </div>
        </my-panel>
        
    </div>
</template>
<script>
import MyPanel from '@/components/panel.vue'
import Multiselect from 'vue-multiselect'
import {ALL_TRANSACTIONTYPES_QUERY,ALL_SPECS_QUERY,ADD_PROJECT_MUTATION} from '@/graphql/project.js'
export default {
    components:{MyPanel,Multiselect},
    data(){
        return{
            categories:['Issuing','Aquiring'],
            membres:['BARRY','JOHN','ISSA','FATOU'],
            specs:[],
            transactionTypes:[],
            project:{
                name:'',
                category:'',
                spec:'',
                status:'',
                membres:[],
                transactions:[]
            },
            myVariables:null,
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
        }
    },
    methods:{
        selectSpec(selectedOption, id){
            this.activeCategory=false
            this.myVariables={
                category:this.project.category,
                spec:this.project.spec.name,
            }
        },
        refresh(){
            this.$apollo.queries.specs.refetch() 
        },
        selectionChanged(params){
            this.project.transactions=[]
            for (let e of params.selectedRows)
                this.project.transactions.push(e.id)
            this.cleanArray(this.project.transactions)
        },
        cleanArray(array) {
            var i, j, len = array.length, out = [], obj = {};
            for (i = 0; i < len; i++) {
                obj[array[i]] = 0;
            }
            for (j in obj) {
                out.push(j);
            }
            return out;
        },
        add(){
            let project={
                name:this.project.name,
                category:this.project.category,
                spec:this.project.spec.name,
                membres:this.project.membres,
                transactions:this.project.transactions
            }
            this.$apollo
            .mutate(
                {
                mutation: ADD_PROJECT_MUTATION,
                variables: {
                input: project
                }
            })
            .catch(error =>{
                console.log('Error ::: ',error)
            })
        }
    },
    apollo:{
        specs:{
            query:ALL_SPECS_QUERY,
        },
        transactionTypes:{
            query:ALL_TRANSACTIONTYPES_QUERY,
            variables () {
                return this.myVariables
            },
            skip () {
                return !this.myVariables
            },
        },

    }
    
}
</script>
