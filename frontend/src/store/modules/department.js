import DepartmentData from '../../services/DepartmentData'

export default {
    actions: {
        fetchDepartments({
            commit,
        }) {
            DepartmentData.readAll()
                .then(json => {
                    const departments = json.data
                    commit('updateDepartments', departments)
                })
        },
        createDepartment({
            commit,
            dispatch
        }, newDepartment, departments, ) {
            DepartmentData.create(newDepartment)
                .then(() => {
                    dispatch('fetchDepartments')
                        .then(() => {
                            commit('updateDepartment', departments)
                        })

                })
        },
    },
    mutations: {
        updateDepartments(state, departments) {
            state.departments = departments
            state.isLoaded = true
        },
    },
    state: {
        departments: [],
        isLoaded: false
    },
    getters: {
        allDepartments(state) {
            return state.departments
        },
        departmentsAreLoaded(state) {
            return state.isLoaded
        }
    },
}