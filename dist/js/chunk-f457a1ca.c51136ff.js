(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f457a1ca"],{"15fa":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("my-panel",{attrs:{title:"Terminal",stitle:"add",colsize:"col-md-12"}},[a("div",{staticClass:"form-group has-success"},[a("label",{staticClass:"form-control-label",attrs:{for:"inputSuccess1"}},[t._v("Input with success")]),a("input",{staticClass:"form-control ",attrs:{type:"text",id:"inputSuccess1"}}),a("span",{staticClass:"glyphicon glyphicon-ok right"}),a("span",{staticClass:"form-control-feedback",attrs:{"aria-hidden":"true"}},[t._v("Success! You've done it.")])]),a("div",{staticClass:"form-group has-warning"},[a("label",{staticClass:"form-control-label",attrs:{for:"inputWarning1"}},[t._v("Input with warning")]),a("input",{staticClass:"form-control form-control-warning",attrs:{type:"text",id:"inputWarning1"}}),a("span",{staticClass:"glyphicon glyphicon-alert right"}),a("span",{staticClass:"form-control-feedback"},[t._v("Shucks, check the formatting of that and try again.")])]),a("div",{staticClass:"form-group has-error"},[a("label",{staticClass:"form-control-label",attrs:{for:"inputDanger1"}},[t._v("Input with danger")]),a("input",{staticClass:"form-control form-control-danger",attrs:{type:"text",id:"inputDanger1"}}),a("span",{staticClass:"glyphicon glyphicon-remove right"}),a("div",{staticClass:"form-control-feedback"},[t._v("Sorry, that username's taken. Try another?")])])]),a("my-panel",{attrs:{title:"Terminal",stitle:"list",colsize:"col-md-12"}},[a("vue-good-table",{attrs:{columns:t.columns,rows:t.rows,styleClass:"table table-striped jambo_table bulk_action","pagination-options":{enabled:!0,mode:"records",perPage:5,position:"bottom",perPageDropdown:[10,15,20],dropdownAllowAll:!1,setCurrentPage:1,nextLabel:"next",prevLabel:"prev",rowsPerPageLabel:"Rows per page",ofLabel:"of",pageLabel:"page",allLabel:"All"},selectOptions:{enabled:!0,selectOnCheckboxOnly:!0,selectionInfoClass:"flat",selectionText:"rows selected",clearSelectionText:"clear"}},on:{"on-row-dblclick":t.onRowDoubleClick}},[a("div",{attrs:{slot:"table-actions"},slot:"table-actions"},[a("button",{staticClass:"btn btn-success"},[t._v("Export "),a("i",{staticClass:"fa fa-file"})]),a("button",{staticClass:"btn btn-info"},[t._v("Add "),a("i",{staticClass:"fa fa-plus"})])])])],1)],1)},l=[],n=a("ded0"),o={components:{MyPanel:n["a"]},data:function(){return{columns:[{label:"Name",field:"name",filterable:!0},{label:"Age",field:"age",type:"number"},{label:"Created On",field:"createdAt",type:"date",dateInputFormat:"YYYY-MM-DD",dateOutputFormat:"MMM Do YY"},{label:"Percent",field:"score",type:"percentage"}],rows:[{id:1,name:"John",age:20,createdAt:"201-10-31:9: 35 am",score:.03343},{id:2,name:"Jane",age:24,createdAt:"2011-10-31",score:.03343},{id:3,name:"Susan",age:16,createdAt:"2011-10-30",score:.03343},{id:4,name:"Chris",age:55,createdAt:"2011-10-11",score:.03343},{id:5,name:"Dan",age:40,createdAt:"2011-10-21",score:.03343},{id:6,name:"John",age:20,createdAt:"2011-10-31",score:.03343}]}},methods:{onRowDoubleClick:function(t){console.log(t)}}},r=o,i=a("2877"),c=Object(i["a"])(r,s,l,!1,null,null,null);c.options.__file="terminal.vue";e["default"]=c.exports},ded0:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.colsize},[t.show?a("div",{staticClass:"x_panel"},[a("div",{staticClass:"x_title"},[a("h3",[t._v(t._s(t.title)),a("small",[t._v(t._s(t.stitle))])]),a("ul",{staticClass:"nav navbar-right panel_toolbox"},[a("li",[a("a",{staticClass:"collapse-link",on:{click:t.toggle}},[a("i",{staticClass:"fa fa-chevron-up"})])]),t._m(0),a("li",[a("a",{staticClass:"close-link",on:{click:t.close}},[a("i",{staticClass:"fa fa-close"})])])]),a("div",{staticClass:"clearfix"})]),a("div",{staticClass:"x_content"},[t._t("default")],2)]):t._e()])},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"dropdown"},[a("a",{staticClass:"dropdown-toggle",attrs:{href:"#","data-toggle":"dropdown",role:"button","aria-expanded":"false"}},[a("i",{staticClass:"fa fa-wrench"})]),a("ul",{staticClass:"dropdown-menu",attrs:{role:"menu"}},[a("li",[a("a",{attrs:{href:"#"}},[t._v("Settings 1")])]),a("li",[a("a",{attrs:{href:"#"}},[t._v("Settings 2")])])])])}],n=(a("a481"),{name:"MyPanel",props:{title:{type:String,required:!0},stitle:{type:String,required:!0},colsize:{type:String,default:"col-md-6"},show:{type:Boolean,default:!0}},methods:{close:function(){var t=event.target.closest(".x_panel");t.style.display="none"},toggle:function(){var t=event.target.closest(".x_panel"),e=t.querySelector(".x_content");event.target.classList.contains("fa-chevron-up")?(e.style.display="none",event.target.classList.replace("fa-chevron-up","fa-chevron-down")):(e.style.display="block",event.target.classList.replace("fa-chevron-down","fa-chevron-up"))}}}),o=n,r=a("2877"),i=Object(r["a"])(o,s,l,!1,null,null,null);i.options.__file="panel.vue";e["a"]=i.exports}}]);
//# sourceMappingURL=chunk-f457a1ca.c51136ff.js.map