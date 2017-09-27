<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'

export default {
    components: {
        MHeader: MHeader,
        Tab: Tab
    }
}
</script>

<style>
    h1, body {
        margin: 0;
        padding: 0;
    }
    body {
        background-color:#333;
    }
    li {
        list-style-type: none;
    }
</style>


