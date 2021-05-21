import CompanyData from '../../services/CompanyData'

export default {
    actions: {
        fetchCompanies({
            commit,
        }) {
            CompanyData.readAll()
                .then(json => {
                    const companies = json.data
                    commit('updateCompanies', companies)
                })
        },
        createCompany({
            commit,
            dispatch
        }, newCompany, companies, ) {
            CompanyData.create(newCompany)
                .then(() => {
                    dispatch('fetchCompanies')
                        .then(() => {
                            commit('updateCompanies', companies)
                        })

                })
        },
        deleteCompany({ commit, dispatch}, companyToDelete, companies) {
            CompanyData.delete(companyToDelete)
            .then(() => {
                dispatch('fetchCompanies')
                .then(() => {
                    commit('updateCompanies', companies)
                })
            })

        },
        updateCompany({ commit, dispatch}, companyToUpdate, companies) {
            CompanyData.update(companyToUpdate.id, companyToUpdate.data)
            .then(() => {
                dispatch('fetchCompanies')
                .then(() => {
                    commit('updateCompanies', companies)
                })
            })

        },
    },
    mutations: {
        updateCompanies(state, companies) {
            state.companies = companies
            state.isLoaded = true
        },
        startCompanyCreation(state) {
            state.creation = true
        },
        endCompanyCreation(state) {
            state.creation = false
        }
    },
    state: {
        companies: [],
        isLoaded: false,
        creation: false
    },
    getters: {
        allCompanies(state) {
            return state.companies
        },
        companiesAreLoaded(state) {
            return state.isLoaded
        },
        companyCreation(state) {
            return state.creation
        }

    },
}