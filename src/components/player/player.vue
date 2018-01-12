/**
* FileName: player
* Creater: Sylvanas.shi
* Date: 2018/1/11
*/

<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subTitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div @click="open" class="mini-player" v-show="!fullScreen">
        <div class="icon">
          <img class="mini-image" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control"></div>
        <div class="control">
          <i class="icon-playList"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    }
  }
</script>

<style>
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

  .player .icon-back {
    display: block;
    width: 40px;
    height: 30px;
    background: url('../../assets/image/down.png');
    background-size: cover;
  }

  .player .middle {
    position: relative;
    top: 0;
    left: 0;
    height: 480px;
  }

  .player .normal-player .middle .middle-l .cd-wrapper .cd .image {
    position: absolute;
    top: 0;
    left: 0;
    border: 5px solid #ccc;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .player .cd-wrapper {
    position: relative;
    top: 66px;
    left: 32px;
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
    margin-right: 6px;
    width: 25px;
    height: 25px;
  }

  .player .operators .icon-sequence {
    background: url('../../assets/image/cycle.png');
    background-size: cover;
  }

  .player .operators .icon-prev {
    background: url('../../assets/image/pre.png');
    background-size: cover;
  }

  .player .operators .icon-play {
    width: 45px;
    height: 45px;
    background: url('../../assets/image/play.png');
    background-size: cover;
  }

  .player .operators .icon-next {
    background: url('../../assets/image/next.png');
    background-size: cover;
  }

  .player .operators .icon-not-favorite {
    background: url('../../assets/image/heart.png');
    background-size: cover;
  }

  .player .mini-player .icon-playList {
    width: 30px;
    height: 30px;
    background: url('../../assets/image/music-list.png');
    background-size: cover;
  }

  .player .normal-enter-active, .normal-leave-active {
    transition: all 0.4s;
  }

  .player .normal-enter-active, .normal-leave-active .top {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }

  .player .normal-enter-active, .normal-leave-active .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }

  .player .normol-center, .normal-leave-to {
    opacity: 0;
  }

  .player .normol-center, .normal-leave-to .top {
    transform: translate3d(0, -100px, 0);
  }

  .player .normol-center, .normal-leave-to .bottom {
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
  }

  .player .mini-player .control {
    position: fixed;
    right: 20px;
    bottom: 12px;
  }


</style>
