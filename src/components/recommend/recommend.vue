<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" />
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img @load="loadImage" v-lazy="item.imgurl" alt="" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name">{{ item.creator.name }}</h2>
                                <p class="desc">{{ item.dissname }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    export default {
        created () {
            this._getRecommend()
            this._getDiscList()
        },
        data () {
            return {
                recommends: [],
                discList: []
            }
        },
        methods: {
            _getRecommend () {
                getRecommend().then(res => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                        console.log(res.data.slider)
                    }
                }).catch(err => console.log(err))
            },
            _getDiscList () {
                getDiscList().then(res => {
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list
                        console.log(res.data)
                    }
                }).catch(err => console.log(err))
            },
            loadImage () {
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh()
                    this.checkLoaded = true
                }
            }
        },
        components: {
            Slider: Slider,
            Scroll: Scroll,
            Loading: Loading
        }
    }
</script>

<style>
   .list-title {
        height: 40px;
        line-height: 40px;
        color: yellow;
        text-align: center;
        font-size: 20px;
   }
   .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0px;
        overflow: hidden;
   }
   .recommend-content {
       height: 100%;
   }
   .recommend-list ul {
       padding-left: 20px;
   }
   .recommend-list .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
   }
   .recommend-list .icon {
       flex: 0 0 60px;
       width: 60px;
       padding-right: 20px;
   }
   .recommend-list .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 12px;
   }
   .name {
       margin-bottom: 0;
       color: #fff;
   }
   .loading-container {
       position: absolute;
       width: 100%;
       top: 50%;
       transform: translateY(-50%);
   }
</style>
