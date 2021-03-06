import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        historyArticle: {},
        location: {}
    },
    getters: {
        historyArticle: state => {
            return state.historyArticle
        },
        location: state => {
            return state.location
        }
    },
    mutations: {
        set_historyArticle(state, val) {
            state.historyArticle = val
            setCache('history_Article', val)
        },
        set_location(state, val) {
            state.location = val
        }
    },
    actions: {
        async get_Article_data({ commit, state }, { id, datafrom }) {
            let res
            let historyArticle
            historyArticle = JSON.parse(getCache('history_Article'))
            if (historyArticle && historyArticle[id]) {
                res = historyArticle[id]
            } else {
                await fetch('post', 'Artilce', {'id': id, 'datafrom': datafrom})
                .then(json => {
                    res = json.data
                    state.historyArticle[id] = res
                    historyArticle = state.historyArticle
                })
            }
            commit('set_historyArticle', historyArticle)
            return res
        }
    }
}
