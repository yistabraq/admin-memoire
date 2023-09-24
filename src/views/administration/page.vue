<template>
    <div class="row">
      <my-panel title="Page" stitle="add" colsize="col-md-12">
        <div class="form-group has-success">
          <label class="form-control-label" for="inputSuccess1">Input with success</label>
          <input type="text" class="form-control " id="inputSuccess1">
          <span class="glyphicon glyphicon-ok right"></span>
          <span class="form-control-feedback" aria-hidden="true">Success! You've done it.</span>
        </div>
        <div class="form-group has-warning">
          <label class="form-control-label" for="inputWarning1">Input with warning</label>
          <input type="text" class="form-control form-control-warning" id="inputWarning1">
          <span class="glyphicon glyphicon-alert right"></span>
          <span class="form-control-feedback">Shucks, check the formatting of that and try again.</span>
          
        </div>
        <div class="form-group has-error">
          <label class="form-control-label" for="inputDanger1">Input with danger</label>
          <input type="text" class="form-control form-control-danger" id="inputDanger1">
          <span class="glyphicon glyphicon-remove right"></span>
          <div class="form-control-feedback">Sorry, that username's taken. Try another?</div>
          
        </div>
      </my-panel>
      <my-panel title="Page" stitle="list" colsize="col-md-12">
        <vue-good-table :columns="columns" :rows="rows" styleClass="table table-striped table-bordered jambo_table bulk_action" @on-row-dblclick="onRowDoubleClick" 
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
             <button class="btn btn-success">Export <i class="fa fa-file"></i></button>
             <button class="btn btn-info">Add <i class="fa fa-plus"></i></button>
        </div>
        </vue-good-table>
      </my-panel>
    </div>          
</template>
<script>
import MyPanel from '@/components/panel.vue'

export default {
  components:{MyPanel},
  data(){
    return{
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '201-10-31:9: 35 am',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
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
      }
    }
}
</script>

