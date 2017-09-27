<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style>
    .tab {
        padding-top: 10px;
        margin-bottom: 35px;
    }
    .tab span{
        color:#fff;
        text-align: center;
        width: 20%;
        margin-left: 4%;
        float: left;
        padding-bottom: 10px;
    }
    .router-link-exact-active span{
        border-bottom: 1px solid #fff;
        color:yellowgreen;
    }
</style>

