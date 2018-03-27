/**
* FileName: player
* Creater: Sylvanas.shi
* Date: 2018/1/11
*/

<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-circle-down"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subTitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper"></div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-loop"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-backward"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-forward2"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div @click="open" class="mini-player" v-show="!fullScreen">
        <div class="icon">
          <img :class="cdCls"
               class="mini-image"
               width="40"
               height="40"
               :src="currentSong.image"
          >
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control mini-play">
          <i @click.stop="togglePlaying" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-indent-decrease"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"
           :src="currentSong.url"
           @canplay="ready"
           @error="error"
           @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import animations from 'create-keyframe-animation'
  import { prefixStyle } from 'common/js/dom'

  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        songReady: false,
        currentTime: 0
      }
    },
    computed: {
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play2'
      },
      miniIcon () {
        return this.playing ? 'icon-pause mini' : 'icon-play2 mini'
      },
      disableCls () {
        return this.songReady ? '' : 'disable'
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex'
      ])
    },
    methods: {
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      format (interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = interval % 60
        return `${minute}:${second}`
      },
      ready () {
        this.songReady = true
      },
      error () {
        this.songReady = true
      },
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()

        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave (el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      togglePlaying () {
        this.setPlayingState(!this.playing)
      },
      prev () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      _getPosAndScale () {
        const targetWidth = 50
        const paddingLeft = 45
        const paddingBottom = 29
        const paddingTop = 85
        const width = 300
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong () {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>

<style>
  @import './../../assets/icomoon/style.css';

  .player .normal-player {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    color: #fff;
    background-color: #333;
  }

  .player .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }

  .player .title {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .player .top {
    position: relative;
    margin-bottom: 25px;
  }

  .player .back {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .player .subTitle {
    position: absolute;
    top: 36px;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .player .middle {
    position: relative;
    top: 0;
    left: 0;
    height: 480px;
  }

  .player .cd-wrapper {
    position: relative;
    top: 66px;
    left: 36px;
    height: 300px;
    width: 300px;
  }

  .player .operators {
    height: 200px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .player .operators div {
    float: left;
    margin-left: 9%;
  }

  .player i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }

  .player .normal-enter-active, .normal-leave-active {
    transition: all 0.4s;
  }

  .player .normal-enter-active .top, .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }

  .player .normal-leave-active .top, .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }

  .player .normal-leave-to, .normal-enter {
    opacity: 0;
  }

  .player .normal-enter .top {
    transform: translate3d(0, -100px, 0);
  }

  .player .normal-leave-to .top {
    transform: translate3d(0, -100px, 0);
  }

  .player .normal-enter .bottom {
    transform: translate3d(0, 100px, 0);
  }

  .player .normal-leave-to .bottom {
    transform: translate3d(0, 100px, 0);
  }

  .player .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    z-index: 180;
    background-color: #444;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .player .mini-player .mini-image {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 20px;
  }

  .player .mini-player .name {
    font-size: 16px;
    margin: 25px 0 0 20px;
  }

  .player .mini-player .desc {
    margin: 6px 0 32px 20px;
    font-size: 14px;
  }

  .player .mini-player .control {
    position: fixed;
    right: 20px;
    bottom: 14px;
    color: #f9d208;
    font-size: 26px;
  }

  .player .mini-player .control.mini-play {
    right: 70px;
  }

  .cd {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .cd.play {
    animation: rotate 20s linear infinite;
  }

  .cd.pause {
    animation-play-state: paused;
  }

  .cd .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .icon {
    font-size: 25px;
    color: #f9d208;
  }

  .icon.i-center {
    font-size: 40px;
    color: #f9d208;
    margin: 0 8px 16px 0;
    text-align: center;
  }

  .icon img {
    border-radius: 50%;
  }

  .icon img.play {
    animation: rotate 10s linear infinite;
    padding: 0;
    border: none;
  }

  .icon img.pause {
    animation-play-state: paused;
  }

  .back {
    color: #f9d208;
    font-size: 30px;
    margin-left: 10px;
  }

  .back .icon-circle-left {
    margin-top: 10px;
  }

  .disable {
    color: #999 !important;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
