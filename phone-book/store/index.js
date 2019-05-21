import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		info:"",
		password:'',
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		info(state,info){
			state.info = info;
		},
		Pwd(state,pwd){
			state.password = pwd;
		}
    },
	actions:{
		SetInfo(context,info){
			context.commit('info',info)
		},
		setPwd(context,pwd){
			context.commit('Pwd',pwd)
		}
	}
})

export default store
