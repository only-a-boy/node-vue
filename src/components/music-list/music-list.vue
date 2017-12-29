/**
* FileName: music-list
* Creater: Sylvanas.shi
* Date: 2017/12/28
*/

<template>
  <div class="music-list">
    <div class="back" @click="back">
      <div class="icon-back"></div>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length > 0" ref="playButton">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            :data="songs"
            class="list"
            ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import { prefixStyle } from 'common/js/dom'

  const RESVERED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    data () {
      return {
        scrollY: 0
      }
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.$router.back()
      }
    },
    watch: {
      scrollY (newY) {
        let translateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur
        this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
        } else {
          blur = Math.max(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESVERED_HEIGHT}px`
          this.$refs.playButton.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playButton.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    },
    computed: {
      bgStyle () {
        return `background-image: url(${this.bgImage})`
      }
    },
    mounted () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESVERED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<style>
  .music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #333;
  }

  .back {
    position: absolute;
    top: 0;
    z-index: 50;
  }

  .icon-back {
    display: block;
    width: 40px;
    height: 40px;
    background: url('../../assets/image/back.png');
    background-size: cover;
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    letter-spacing: 2px;
    color: #fff;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
  }

  .play-wrapper {
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
  }

  .play {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #f9d208;
    color: #f9d208;
    border-radius: 100px;
    font-size: 0;
  }

  .icon-play {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    width: 25px;
    height: 25px;
    background: url('../../assets/image/play.png');
    background-size: cover;
  }

  .text {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: #333;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .song-list-wrapper {
    padding: 20px 0;
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
