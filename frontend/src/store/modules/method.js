import MethodData from '../../services/MethodData';

export default {
    actions: {
        fetchMethods({ commit, rootState, dispatch}) {
            MethodData.getPage(rootState.common.currentPage)
            .then(json => {
                const methods = json.data.rows
                //const maxPage = json.data.maxPage
                //commit('updateMaxPage', Methods)
                commit('updateMethods', methods)
                dispatch('getMethodMaxPageFromServer')
            })
        },
        fetchMethodsNoPagination({ commit, }) {
            MethodData.getAll()
            .then(json => {
                const methods = json.data
                commit('updateMethods', methods)
            })
        },
        getMethodMaxPageFromServer({commit}) { //Исправить! написать функцию для взятия количества а не всего сразу
            MethodData.getAmount()
            .then(json => {
                const methods = json.data
                alert('сработало обновление методов')
                commit('updateMaxPage', methods)
            })
        },
        createMethod({ commit, dispatch }, newMethod, methods, ) {
            MethodData.create(newMethod)
            .then(() => {
                dispatch('fetchMethods')
                .then(() => {commit('updateMethods', methods)})
                
            })
        },
        deleteMethod({commit, dispatch}, methodToDelete, methods) {
            MethodData.delete(methodToDelete)
            .then(() => {
                dispatch('fetchMethods')
                .then(()=>{commit('updateMethods', methods)})
            })
        },
        updateMethod({commit, dispatch}, methodToUpdate, methods) {
            MethodData.update(methodToUpdate)
            .then(() => {
                dispatch('fetchMethods')
                .then(() => {
                    commit('updateMethods', methods)
                })
            })
        }
    },
    mutations: {
        updateMethods(state, methods) {
            state.methods = methods
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
        // updateMaxPage(state, methods) {
        //     state.maxPage = methods
        // },
        // incrementCurrentPage(state) {
        //     if (state.currentPage < Math.ceil(state.maxPage / 7)) state.currentPage = state.currentPage + 1
        // },
        // decrementCurrentPage(state) {
        //     if (state.currentPage > 1) state.currentPage--
        // }
        // insertmethod(state, newmethod) {
        //     state.Methods.unshift(newmethod)
        // }
    },
    state: {
        methods: [],
        // form: false,
        // card: false,
        // editForm: false,
        // currentPage: 1,
        // maxPage: 0
    },
    getters: {
        allMethods(state) {
            return state.methods
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
        // methodCount(state) {
        //     return state.Methods.length
        // }
    },
}