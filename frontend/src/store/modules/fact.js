import FactData from '../../services/FactData';
//import review from './review';

export default {
    actions: {
        fetchFacts({ commit, rootState, dispatch}) {
            FactData.getPage(rootState.common.currentPage)
            .then(json => {
                const facts = json.data.rows
                commit('updateFacts', facts)
                dispatch('getFactMaxPageFromServer')
            })
        },
        fetchFactsNoPagination({ commit, }) {
            FactData.getAll()
            .then(json => {
                const facts = json.data
                commit('updateFacts', facts)
            })
        },
        getFactMaxPageFromServer({commit}) {
            FactData.getAmount()
            .then(json => {
                const facts = json.data
                commit('updateMaxPage', facts)
            })
        },
        createFact({ commit, dispatch }, newFact, facts, ) {
            FactData.create(newFact)
            .then(() => {
                dispatch('fetchFacts')
                .then(() => {commit('updateFacts', facts)})
                
            })
        },
        deleteFact({commit, dispatch}, factToDelete, facts) {
            FactData.delete(factToDelete)
            .then(() => {
                dispatch('fetchFacts')
                .then(()=>{commit('updateFacts', facts)})
            })
        },
        updateFact({commit, dispatch}, factToUpdate, facts) {
            FactData.update(factToUpdate.id, factToUpdate.formData)
            .then(() => {
                dispatch('fetchFacts')
                .then(() => {
                    commit('updateFacts', facts)
                })
            })
        },
        findFactsByReview({commit}, review) {
            FactData.findByReview(review)
            .then(json => {
                const facts = json.data
                commit('updateFacts', facts)
            })       
        }
    },
    mutations: {
        updateFacts(state, facts) {
            state.facts = facts
        },
    },
    state: {
        facts: [],
    },
    getters: {
        allFacts(state) {
            return state.facts
        },
        // filteredFacts(state, review) {
        //     const filteredFacts = []
        //     state.facts.forEach(fact => {
        //         if (fact.review === review) {
        //             filteredFacts.push(fact)
        //         }    
        //     })

        //     return filteredFacts
        // }
    },
}