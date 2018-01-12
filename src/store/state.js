/**
 * FileName: state
 * Creater: Sylvanas.shi
 * Date: 2017/12/27
 */

import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state

