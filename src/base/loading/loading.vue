<template>
    <div class="loading">
        <img src="./../../common/image/loading1.gif" alt="" width="60px" height="60px">
        <p class="desc">{{ title }}</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        title: {
            type: String,
            default: '正在载入'
        }
    }
}
</script>

<style>
    .loading {
        width: 100%;
        text-align: center;
    }
    .desc {
        line-height: 18px;
        font-size: 14px;
        color: #9c1;
    }
</style>

