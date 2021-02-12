import BaitData from '../../services/BaitData';
// import common from './common'

export default {
    actions: {
        fetchBaits({ commit,  rootState, dispatch}) {
            //alert(rootState.common.currentPage)
            BaitData.getPage(rootState.common.currentPage)
            .then(json => {
                const baits = json.data.rows
                //const maxPage = json.data.maxPage
                //commit('updateMaxPage', baits)
                commit('updateBaits', baits)
                dispatch('getBaitMaxPageFromServer')
            })
        },
        fetchBaitsNoPagination({ commit, }) {
            BaitData.getAll()
            .then(json => {
                const baits = json.data
                commit('updateBaits', baits)
            })
        },
        getBaitMaxPageFromServer({commit}) { //Исправить! написать функцию для взятия количества а не всего сразу
            BaitData.getAmount()
            .then(json => {
                const baits = json.data
                // alert(baits)
                commit('updateMaxPage', baits)
            })
        },
        createBait({ commit, dispatch }, newBait, baits, ) {
            BaitData.create(newBait)
            .then(() => {
                dispatch('fetchBaits')
                .then(() => {commit('updateBaits', baits)})
                
            })
        },
        deleteBait({commit, dispatch}, baitToDelete, baits) {
            BaitData.delete(baitToDelete)
            .then(() => {
                dispatch('fetchBaits')
                .then(()=>{commit('updateBaits', baits)})
            })
        },
        updateBait({commit, dispatch}, baitToUpdate, baits) {
            BaitData.update(baitToUpdate)
            .then(() => {
                dispatch('fetchBaits')
                .then(() => {
                    commit('updateBaits', baits)
                })
            })
        }
    },
    mutations: {
        updateBaits(state, baits) {
            state.baits = baits
        },
        // changeFormView(state) {
        //     state.form = !state.form
        // },
        // changeCardView(state) {
        //     state.card = !state.card
        // },
        // changeEditFormView(state) {
        //     state.editForm = !state.editForm
        // },
        // updateMaxPage(rootState, baits) {
        //     alert('Обновление макс страницы в сторе: ' + baits)
        //     rootState.common.maxPage = baits
        // },
        // incrementCurrentBaitPage(state) {
        //     if (state.currentPage < Math.ceil(state.maxPage / 7)) state.currentPage = state.currentPage + 1
        // },
        // decrementCurrentBaitPage(state) {
        //     if (state.currentPage > 1) state.currentPage--
        // }
        // insertBait(state, newBait) {
        //     state.baits.unshift(newBait)
        // }
    },
    state: {
        baits: [],
        // form: false,
        // card: false,
        // editForm: false,
        // currentBaitPage: 1,
        // maxBaitPage: 0
    },
    getters: {
        allBaits(state) {
            return state.baits
        },
        // getMaxPage(state) {
        //     //alert(state.maxPage)
        //     return state.maxPage
        // },
        // getCurrentPage(state) {
        //     return state.currentPage
        // },
        // showForm(state) {
        //     return state.form
        // },
        // showCard(state) {
        //     return state.card
        // },
        // showEditForm(state) {
        //     return state.editForm
        // }
        // baitCount(state) {
        //     return state.baits.length
        // }
    },
    // modules: { common }
}