/**
* FileName: song-list
* Creater: Sylvanas.shi
* Date: 2017/12/28
*/

<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      getDesc (song) {
        if (song) {
          return `${song.singer}-${song.album}`
        } else {
          return ''
        }
      }
    }
  }
</script>

<style>
  [v-cloak] {
    display: none;
  }

  .song-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .song-list .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 10px;
  }

  .content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;
  }

  .name {
    color: #fff;
  }

  .song-list .desc {
    margin-top: 4px;
    color: #999;
    font-size: 14px;
  }
</style>
