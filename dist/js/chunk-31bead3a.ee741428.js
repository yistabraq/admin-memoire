(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31bead3a"],{6584:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row"},[i("my-panel",{attrs:{title:"Case of test",stitle:"list",colsize:"col-md-12"}},[i("vue-good-table",{attrs:{columns:t.columns,rows:t.rows,styleClass:"table table-striped table-bordered jambo_table projects","pagination-options":{enabled:!0,mode:"records",perPage:5,position:"bottom",perPageDropdown:[10,15,20],dropdownAllowAll:!1,setCurrentPage:1,nextLabel:"next",prevLabel:"prev",rowsPerPageLabel:"Rows per page",ofLabel:"of",pageLabel:"page",allLabel:"All"}},on:{"on-row-dblclick":t.onRowDoubleClick,"on-selected-rows-change":t.selectionChanged},scopedSlots:t._u([{key:"table-row",fn:function(e){return["name"==e.column.field?i("span",[i("a",[t._v(t._s(e.row.name))]),i("br"),i("small",[t._v("Created 01.01.2015")])]):t._e(),"membres"==e.column.field?i("span",t._l(e.row.membres,function(e){return i("ul",{key:e,staticClass:"list-inline"},[i("li",[i("img",{staticClass:"avatar",attrs:{src:s("c121"),alt:"Avatar"}}),i("br"),t._v("\n                        "+t._s(e)+"\n                    ")])])})):t._e(),"progress"==e.column.field?i("span",[i("div",{staticClass:"progress"},[i("div",{staticClass:"progress-bar progress-bar-striped active",style:{width:e.row.progress+"%"},attrs:{role:"progressbar","aria-valuenow":e.row.progress,"aria-valuemin":"0","aria-valuemax":"100"}},[t._v("\n                        "+t._s(e.row.progress)+"%\n                    ")])]),i("span",[t._v(t._s(e.row.progress)+"%")])]):t._e(),"status"==e.column.field?i("span",[i("button",{staticClass:"btn btn-warning btn-xs",attrs:{type:"button"}},[t._v(t._s(e.row.status))])]):t._e()]}}])},[i("div",{attrs:{slot:"table-actions"},slot:"table-actions"},[i("button",{staticClass:"btn btn-success"},[t._v("Export "),i("i",{staticClass:"fa fa-file"})]),i("button",{staticClass:"btn btn-info",on:{click:function(e){t.showAdd=!0}}},[t._v("Add "),i("i",{staticClass:"fa fa-plus"})])])])],1)],1)},n=[],o=s("ded0"),r=s("a7e3"),a=s.n(r),l={components:{MyPanel:o["a"],ProgressBar:a.a},data:function(){return{showAdd:!1,columns:[{label:"Name",field:"name",filterable:!0,filterOptions:{enabled:!0,placeholder:"name ... ",filterDropdownItems:[],filterFn:this.columnFilterFn}},{label:"Membres",field:"membres",filterOptions:{enabled:!0,placeholder:"Amount ... ",filterDropdownItems:[],filterFn:this.columnFilterFn}},{label:"Progress",field:"progress",tdClass:"project_progress",filterOptions:{enabled:!0,placeholder:"progress ... ",filterDropdownItems:[],filterFn:this.columnFilterFn}},{label:"Status",field:"status",filterOptions:{enabled:!0,placeholder:"Status ... ",filterDropdownItems:[],filterFn:this.columnFilterFn}}],rows:[{id:1,name:"Project 1",membres:["Diallo","Joffrey","Barry"],progress:"57",status:"En cours"},{id:1,name:"Project 2",membres:["Clato","Joffrey","Barry"],progress:"69",status:"En cours"},{id:1,name:"Project 3",membres:["Joffrey","Barry"],progress:"30",status:"En cours"},{id:1,name:"Project 4",membres:["Diallo","Joffrey","Barry","lol"],progress:"60",status:"En cours"}],rowSelected:{}}},methods:{onRowDoubleClick:function(t){console.log(t)},selectionChanged:function(t){this.rowSelected=t[0]},show:function(){console.log(this.rowSelected),console.log(1)}},computed:{keymap:function(){return{"ctrl+alt":this.show}}}},c=l,u=s("2877"),d=Object(u["a"])(c,i,n,!1,null,null,null);d.options.__file="case.vue";e["default"]=d.exports},a7e3:function(t,e,s){
/*!
 * vue-simple-progress v1.1.0 (https://github.com/dzwillia/vue-simple-progress)
 * (c) 2018 David Z. Williams
 * Released under the MIT License.
 */
(function(e,s){t.exports=s()})(0,function(){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VueSimpleProgress=void 0;var i=s(1),n=o(i);function o(t){return t&&t.__esModule?t:{default:t}}"undefined"!==typeof window&&window.Vue&&Vue.component("vue-simple-progress",n.default),e.VueSimpleProgress=n.default,e.default=n.default},function(t,e,s){var i=s(2)(s(3),s(4),null,null);t.exports=i.exports},function(t,e){t.exports=function(t,e,s,i){var n,o=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(n=t,o=t.default);var a="function"===typeof o?o.options:o;if(e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),s&&(a._scopeId=s),i){var l=Object.create(a.computed||null);Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}}),a.computed=l}return{esModule:n,exports:o,options:a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return!isNaN(parseFloat(t))&&isFinite(t)};e.default={props:{val:{default:0},max:{default:100},size:{default:3},"bg-color":{type:String,default:"#eee"},"bar-color":{type:String,default:"#2196f3"},"bar-transition":{type:String,default:"all 0.5s ease"},spacing:{type:Number,default:4},text:{type:String,default:""},"text-position":{type:String,default:"bottom"},"font-size":{type:Number,default:13},"text-fg-color":{type:String,default:"#222"}},computed:{pct:function(){var t=this.val/this.max*100;return t=t.toFixed(2),Math.min(t,this.max)},size_px:function(){switch(this.size){case"tiny":return 2;case"small":return 4;case"medium":return 8;case"large":return 12;case"big":return 16;case"huge":return 32;case"massive":return 64}return i(this.size)?this.size:32},text_padding:function(){switch(this.size){case"tiny":case"small":case"medium":case"large":case"big":case"huge":case"massive":return Math.min(Math.max(Math.ceil(this.size_px/8),3),12)}return i(this.spacing)?this.spacing:4},text_font_size:function(){switch(this.size){case"tiny":case"small":case"medium":case"large":case"big":case"huge":case"massive":return Math.min(Math.max(Math.ceil(1.4*this.size_px),11),32)}return i(this.fontSize)?this.fontSize:13},progress_style:function(){var t={background:this.bgColor};return"middle"!=this.textPosition&&"inside"!=this.textPosition||(t["position"]="relative",t["min-height"]=this.size_px+"px",t["z-index"]="-2"),t},bar_style:function(){var t={background:this.barColor,width:this.pct+"%",height:this.size_px+"px",transition:this.barTransition};return"middle"!=this.textPosition&&"inside"!=this.textPosition||(t["position"]="absolute",t["top"]="0",t["height"]="100%",t["min-height"]=this.size_px+"px",t["z-index"]="-1"),t},text_style:function(){var t={color:this.textFgColor,"font-size":this.text_font_size+"px","text-align":"center"};return"top"!=this.textPosition&&"middle"!=this.textPosition&&"inside"!=this.textPosition||(t["padding-bottom"]=this.text_padding+"px"),"bottom"!=this.textPosition&&"middle"!=this.textPosition&&"inside"!=this.textPosition||(t["padding-top"]=this.text_padding+"px"),t}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.text.length>0&&"top"==t.textPosition?s("div",{staticClass:"vue-simple-progress-text",style:t.text_style},[t._v(t._s(t.text))]):t._e(),t._v(" "),s("div",{staticClass:"vue-simple-progress",style:t.progress_style},[t.text.length>0&&"middle"==t.textPosition?s("div",{staticClass:"vue-simple-progress-text",style:t.text_style},[t._v(t._s(t.text))]):t._e(),t._v(" "),t.text.length>0&&"inside"==t.textPosition?s("div",{staticStyle:{position:"relative",left:"-9999px"},style:t.text_style},[t._v(t._s(t.text))]):t._e(),t._v(" "),s("div",{staticClass:"vue-simple-progress-bar",style:t.bar_style},[t.text.length>0&&"inside"==t.textPosition?s("div",{style:t.text_style},[t._v(t._s(t.text))]):t._e()])]),t._v(" "),t.text.length>0&&"bottom"==t.textPosition?s("div",{staticClass:"vue-simple-progress-text",style:t.text_style},[t._v(t._s(t.text))]):t._e()])},staticRenderFns:[]}}])["default"]})},ded0:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.colsize},[t.show?s("div",{staticClass:"x_panel"},[s("div",{staticClass:"x_title"},[s("h3",[t._v(t._s(t.title)),s("small",[t._v(t._s(t.stitle))])]),s("ul",{staticClass:"nav navbar-right panel_toolbox"},[s("li",[s("a",{staticClass:"collapse-link",on:{click:t.toggle}},[s("i",{staticClass:"fa fa-chevron-up"})])]),t._m(0),s("li",[s("a",{staticClass:"close-link",on:{click:t.close}},[s("i",{staticClass:"fa fa-close"})])])]),s("div",{staticClass:"clearfix"})]),s("div",{staticClass:"x_content"},[t._t("default")],2)]):t._e()])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"dropdown"},[s("a",{staticClass:"dropdown-toggle",attrs:{href:"#","data-toggle":"dropdown",role:"button","aria-expanded":"false"}},[s("i",{staticClass:"fa fa-wrench"})]),s("ul",{staticClass:"dropdown-menu",attrs:{role:"menu"}},[s("li",[s("a",{attrs:{href:"#"}},[t._v("Settings 1")])]),s("li",[s("a",{attrs:{href:"#"}},[t._v("Settings 2")])])])])}],o=(s("a481"),{name:"MyPanel",props:{title:{type:String,required:!0},stitle:{type:String,required:!0},colsize:{type:String,default:"col-md-6"},show:{type:Boolean,default:!0}},methods:{close:function(){var t=event.target.closest(".x_panel");t.style.display="none"},toggle:function(){var t=event.target.closest(".x_panel"),e=t.querySelector(".x_content");event.target.classList.contains("fa-chevron-up")?(e.style.display="none",event.target.classList.replace("fa-chevron-up","fa-chevron-down")):(e.style.display="block",event.target.classList.replace("fa-chevron-down","fa-chevron-up"))}}}),r=o,a=s("2877"),l=Object(a["a"])(r,i,n,!1,null,null,null);l.options.__file="panel.vue";e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-31bead3a.ee741428.js.map