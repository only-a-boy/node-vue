<template>
    <scroll class="listview" :data="data" ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar" alt="" />
                        <span class="name">{{ item.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart">
            <ul>
                <li v-for="(item,index) in shortcutList" class="item" :data-index="index">{{ item }}</li>
            </ul>
        </div>
    </scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import {getData} from 'common/js/dom'
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutList () {
                return this.data.map(group => {
                    return group.title.substr(0, 1)
                })
            }
        },
        components: {
            Scroll: Scroll
        },
        methods: {
            onShortcutTouchStart (e) {
                let anchorIndex = getData(e.target, 'index')
                this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
            }
        }
    }
</script>

<style>
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #333;
    }
    .listview ul {
        margin-left: -40px;
    }
    .list-group {
        padding-bottom: 30px;
    }
    .list-group-title {
        background-color: #555;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color:#999;
    }
    .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .list-group .name {
        margin-left: 20px;
        color: #ccc;
        font-size: 16px;
    }
    .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 5px 0;
        border-radius: 10px;
        text-align: center;
        background-color: #232425;
        font-family: Arial, Helvetica, sans-serif;
    }
    .list-shortcut .item {
        color: #999;
        padding: 3px;
        line-height: 1;
        font-size: 14px;
    }
</style>

