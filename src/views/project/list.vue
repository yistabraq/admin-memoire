<template>
    <div class="row">
      
      <my-panel title="Case of test" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="fprojects" styleClass="table table-striped table-bordered jambo_table projects" @on-row-dblclick="onRowDoubleClick"
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
          }">
            <div slot="table-actions">
                <button class="btn btn-success" @click="refresh">Export <i class="fa fa-file"></i></button>
                <button class="btn btn-info" >Add <i class="fa fa-plus"></i></button>
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'name'">
                    <a>{{props.row.name}}</a>
                        <br />
                    <small>Created 01.01.2015</small>
                </span>
                <span v-if="props.column.field == 'membres'">
                    <ul class="list-inline" v-for="item in props.row.membres" :key="item">
                        <li>
                            <img src="@/assets/user.png" class="avatar" alt="Avatar"><br>
                            {{item}}
                        </li>
                    </ul>
                </span>
                <span v-if="props.column.field == 'progress'">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar"
                            :aria-valuenow="props.row.progress" aria-valuemin="0" aria-valuemax="100" :style="{'width':props.row.progress+'%'}">
                            {{props.row.progress}}%
                        </div>
                    </div>
                    <span>{{props.row.progress}}%</span>
                </span>
                <span v-if="props.column.field == 'status'">
                    <button type="button" class="btn btn-warning btn-xs" v-if="props.row.status == 'In progress'">{{props.row.status}}</button>
                    <button type="button" class="btn btn-success btn-xs" v-if="props.row.status == 'Finish'">{{props.row.status}}</button>
                    <button type="button" class="btn btn-danger btn-xs" v-if="props.row.status == 'No started'">{{props.row.status}}</button>
                </span>
            </template>
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import {ALL_PROJECTS_QUERY,ADD_PROJECT_MUTATION} from '@/graphql/project.js'
import { throws } from 'assert';
export default {
  components:{MyPanel},
  data(){
    return{
      projects:[],
      fprojects:[],
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'name ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },

        },
        {
          label: 'Membres',
          field: 'membres',
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'Membres ... ',  // placeholder for filter input
           // initial populated value for this filter
          filterDropdownItems: [], // dropdown (with selected values) instead of text input
          filterFn: this.columnFilterFn, //custom filter function that
            //only trigger on enter not on keyup 
        },
        },
        {
          label: 'Progress',
          field: 'progress',
          tdClass:'project_progress',
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
    }
  }, 
  methods : {
      onRowDoubleClick(params) {
       console.log(params)
      },
      selectionChanged(params){
        this.rowSelected=params[0]
      },
      refresh(){
        this.$apollo.queries.projects.refetch()
        console.log(this.projects)
        for (let element of this.projects) {
          element.progress=this.percent_Ok(element.transactions)
          this.fprojects.push(element)
        }
      },
      percent_Ok(liste){
        let i=0
        for(let element of liste){
          if(element.status=="OK")
            i++
        }
        let out=Math.floor(i*100/liste.length)
        i=0
        return out
      }
  },
  apollo:{
        projects:{
            query:ALL_PROJECTS_QUERY,
        },
        /*transactionTypes:{
            query:ALL_TRANSACTIONTYPES_QUERY,
            variables () {
                return this.myVariables
            },
            skip () {
                return !this.myVariables
            },
        },*/

    }
}
</script>