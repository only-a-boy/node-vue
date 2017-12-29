/**
 * FileName: mutations
 * Creater: Sylvanas.shi
 * Date: 2017/12/27
 */

import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default mutations
