<template>
    <div class="row">
      
      <my-panel title="Case of test" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="rows" styleClass="table table-striped table-bordered jambo_table projects" @on-row-dblclick="onRowDoubleClick" 
        @on-selected-rows-change="selectionChanged"
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
                <button class="btn btn-success">Export <i class="fa fa-file"></i></button>
                <button class="btn btn-info" @click="showAdd=true">Add <i class="fa fa-plus"></i></button>
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
                    <button type="button" class="btn btn-warning btn-xs">{{props.row.status}}</button>
                </span>
            </template>
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'
import ProgressBar from 'vue-simple-progress'
export default {
  components:{MyPanel,ProgressBar},
  data(){
    return{
      showAdd:false,
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
          placeholder:'Amount ... ',  // placeholder for filter input
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
          filterOptions: {
          enabled: true, // enable filter for this column
          placeholder:'progress ... ',  // placeholder for filter input
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
      rows: [
        { id:1, name:"Project 1", membres: ['Diallo','Joffrey','Barry'],progress: "57",status:"En cours" },
        { id:1, name:"Project 2", membres: ['Clato','Joffrey','Barry'],progress: "69",status:"En cours" },
        { id:1, name:"Project 3", membres: ['Joffrey','Barry'],progress: "30",status:"En cours" },
        { id:1, name:"Project 4", membres: ['Diallo','Joffrey','Barry','lol'],progress: "60",status:"En cours" },
        ],
        rowSelected:{},
    }
  }, 
    methods : {
      onRowDoubleClick(params) {
    // params.row - row object 
    // params.pageIndex - index of this row on the current page.
    // params.selected - if selection is enabled this argument 
    // indicates selected or not
    // params.event - click event
       console.log(params)
       
      },
      selectionChanged(params){
        this.rowSelected=params[0]
      },
      show(){
        console.log(this.rowSelected)
        console.log(1)
      }
    },
    computed: {
    keymap () {
      return {
        // 'esc+ctrl' is OK.
        'ctrl+alt': this.show,
        
      }
    }
  }
}
</script>