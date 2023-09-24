<template>
    <div class="containent body">
        <div class="main_container">
            <my-sidebar></my-sidebar>
            <my-header></my-header>
            <my-tab></my-tab>
            <my-main></my-main>
        </div>
    </div>
</template>

<script>
import MyHeader from './header.vue'
import MySidebar from './sidebar.vue'
import MyMain from './main.vue'
import MyTab from './tab.vue'
export default {
    name:'Layout',
    components: { MyHeader,MySidebar,MyMain,MyTab}
}
</script>

