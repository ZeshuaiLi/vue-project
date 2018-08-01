import * as types from '../mutation-types'
import router from '../../router';

import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '../../api/storage'

const state = (() => {
  const login = SGet('user_login');
  const info = SGet('user_info');
  const state = {
    // 手机号或者邮箱
    data1: '2',
    // token
    data2: '3'
  };
  return Object.assign(state, login, info);
})()
// 获取用户信息
const getters = {}
const actions = {
  // 登录
  login ({ dispatch, commit }, data) {
    console.log(data)
    const body = {
      autoLogin: true,
      mobile: data.account,
      password: data.password
    };
    if (data.needCode) {
      body.imageAuthCode = data.code
      body.imageAuthCodeId = data.codeId
    }
    // 调用顶级action
    dispatch('AJAX', {
      method: 'post',
      url: '/api/login',
      mutation: 'login/' + types.LOGIN_IN_SUCCESS,
      data: body
    }, {
      root: true
    })
  },
  // 获取用户信息
  getDataInfo2 ({ commit, state, dispatch }) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/data1',
      mutation: 'test/' + types.SET_TEST_MESSAGE
    }, {
      root: true
    })
  }
}

const mutations = {
  [types.LOGIN_IN_SUCCESS] (state, result) {
    state.account = result.account;
    state.token = result.token;
    state.userId = result.userId;
    state.needCode = result.needCode;
    try {
      SSet('user_login', result)
    } catch (e) {
      console.log(e)
    }
    if (!result.needCode) {
      router.push('index');
    }
  },
  [types.LOGOUT_IN_SUCCESS] (state, result) {
    state.account = undefined;
    state.token = undefined;
    state.userId = undefined;
    SRemove('user_login')
    router.push('login');
  },
  [types.GET_USER_INFO_SUCCESS] (state, result) {
    Object.assign(state, {
      tags: result.companyName,
      type: result.companyNaturename,
      id: result.id,
      shop_name: result.name,
      phone: result.userMobile
    });
  },
  [types.BIND_USER_PHONE_SUCCESS] (state, result) {
    router.push('index');
  },
  [types.SET_TEST_MESSAGE] (state, result) {
    Object.assign(state, {
      data1: result.data1,
      data2: result.data2
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
