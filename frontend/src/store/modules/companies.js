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
                            commit('updateCompany', companies)
                        })

                })
        },
    },
    mutations: {
        updateCompanies(state, companies) {
            state.companies = companies
            state.isLoaded = true
        },
    },
    state: {
        companies: [],
        isLoaded: false
    },
    getters: {
        allCompanies(state) {
            return state.companies
        },
        companiesAreLoaded(state) {
            return state.isLoaded
        }
    },
}