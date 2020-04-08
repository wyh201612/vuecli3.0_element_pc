import { verificationCodeCkeck, login,userOnline, logout, getInfo,revise_login_password } from '@/api/user'
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
import router from '@/router'
import qs from 'qs'

const state = {
  accessToken: getCookie('accessToken'),
  token: getToken(),
  loginName: getCookie('loginName'),
  mobile: getCookie('mobile'),
  avatar: getCookie('avatar'),
  userId: getCookie('userId'),
  bindCard: getCookie('bindCard'),
  bindAddress: getCookie('bindAddress'),
  goldPrice: getCookie('goldPrice')
}

const mutations = {
  SET_ACCESSTOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_NAME: (state, loginName) => {
    state.loginName = loginName;
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_BINDCARD: (state, bindCard) => {
    state.bindCard = bindCard;
  },
  SET_BINDADDRESS: (state, bindAddress) => {
    state.bindAddress = bindAddress;
  },
  SET_GOLDPRICE: (state, goldPrice) => {
    state.goldPrice = goldPrice;
    setCookie('goldPrice', goldPrice);
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    var timestamp = new Date().getTime().toString();
    timestamp = timestamp.slice(0, -3);
    console.log(userInfo)
    let obj = {
        loginType: "3",
        loginSource: 1,
        type: "6",
        loginName: userInfo.loginName,
        code: userInfo.code
    }
    let submitData = {
      loginSource: 1,
      loginName: userInfo.loginName,
      code: userInfo.code
    };
    return new Promise((resolve, reject) => {
      verificationCodeCkeck(qs.stringify(obj)).then(res => {
        login(qs.stringify(submitData)).then(response => {
          const { data } = response;
          commit('SET_ACCESSTOKEN', data);
          setCookie('accessToken', data);
          let submitData2 = {
            accessToken: data
          };
          userOnline(qs.stringify(submitData2)).then(res1 => {
            commit('SET_ACCESSTOKEN', res1.data.accessToken);
            setCookie('accessToken', res1.data.accessToken);
            commit('SET_USERID', res1.data.id);
            setCookie('userId', res1.data.id);
            commit('SET_NAME', res1.data.loginName);
            setCookie('loginName', res1.data.loginName);
            commit('SET_MOBILE', res1.data.mobile);
            setCookie('mobile', res1.data.mobile);
            commit('SET_BINDCARD', res1.data.bindCard);
            setCookie('bindCard', res1.data.bindCard);
            commit('SET_BINDADDRESS', res1.data.bindAddress);
            setCookie('bindAddress', res1.data.bindAddress);
          })
          resolve();
        }).catch(error => {
          reject(error);
        })
      }).catch(error => {
        reject(error);
      })
      
    })
  },

  // user revise_login_password
  revise_login_password({ commit,dispatch }, data) {
  },

  // get user info
  getInfo({ commit, state }, roles) {
    return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //     if (!data) {
    //       reject('Verification failed, please Login again.')
    //     }

        // const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        const data =  {
          roles : roles=='editor'?['editor']:['admin'],
          introduction : roles=='editor'?'I am an editor':'I am a super administrator'
        }
        console.log(data)
        commit('SET_ROLES', data.roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', data.introduction)
        resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    })
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
        clearInterval(window.timer);
        commit('SET_ACCESSTOKEN', '')
        removeToken()
        removeCookie('accessToken')
        removeCookie('bindAddress')
        removeCookie('bindCard')
        removeCookie('mobile')
        removeCookie('loginName')
        removeCookie('userId')
        removeCookie('name')
        removeCookie('avatar')
        // resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      clearInterval(window.timer);
      commit('SET_ACCESSTOKEN', '');
      setCookie('accessToken', '');
      commit('SET_USERID', '');
      setCookie('userId','');
      commit('SET_NAME', '');
      setCookie('name', '');
      commit('SET_BINDCARD','');
      setCookie('bindCard', '');
      commit('SET_BINDADDRESS', '');
      setCookie('bindAddress', '');
      commit('SET_ACCESSTOKEN', '')
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      console.log(role)
      console.log(token)
      setToken(token)

      const { roles } = await dispatch('getInfo',role)

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
