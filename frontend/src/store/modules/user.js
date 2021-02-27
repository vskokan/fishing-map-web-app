import UserData from '../../services/UserData';

export default {
    actions: {
        fetchUsers({ commit, rootState, dispatch}) {
            UserData.getPage(rootState.common.currentPage)
            .then(json => {
                const users = json.data.rows
                commit('updateUsers', users)
                dispatch('getUserMaxPageFromServer')
            })
        },
        fetchUsersNoPagination({ commit, }) {
            UserData.getAll()
            .then(json => {
                const users = json.data
                commit('updateUsers', users)
            })
        },
        getUserMaxPageFromServer({commit}) {
            UserData.getAmount()
            .then(json => {
                const users = json.data
                commit('updateMaxPage', users)
            })
        },
        createUser({ commit, dispatch }, newUser, users, ) {
            UserData.create(newUser)
            .then(() => {
                dispatch('fetchUsers')
                .then(() => {commit('updateUsers', users)})
                
            })
        },
        deleteUser({commit, dispatch}, userToDelete, users) {
            UserData.delete(userToDelete)
            .then(() => {
                dispatch('fetchUsers')
                .then(()=>{commit('updateUsers', users)})
            })
        },
        updateUser({commit, dispatch}, userToUpdate, users) {
            UserData.update(userToUpdate.login, userToUpdate.formData)
            .then(() => {
                dispatch('fetchUsers')
                .then(() => {
                    commit('updateUsers', users)
                })
            })
        },
        updateUserPassword_AdminPanel({commit, dispatch}, userToUpdate, users) {
            //alert(userToUpdate.formData)
            UserData.updatePassword(userToUpdate.login, userToUpdate.formData)
                .then(() => {
                    dispatch('fetchUsers')
                    .then(() => {
                        commit('updateUsers', users)
                    })
                })
        },

        getUser({commit}, login) {
            UserData.getOne(login)
            .then((json) => {
                const user = json.data
                console.log(user)
                commit('updateUser', user)
            })
        }
        // signIn({commit,}, user) {
        //     alert('fkekfghlfklf')
        //     UserData.signIn(user)
        //     .then((response) => {
        //         console.log(response)
        //         const statusCode = response.status
        //         commit('updateServerResponse', statusCode)
        //         if (statusCode == 200) {
        //             const currentUser = response.data.user
        //             localStorage.setItem('refreshToken', response.data.refresh)
        //             alert(document.cookie)
        //             // document.cookie = `user=${response.data.user.login}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
        //             localStorage.setItem('currentUser', currentUser)
        //             document.cookie = `token=${response.data.access}; path=/; httpOnly, expires=Tue, 19 Jan 2038 03:14:07 GMT`
        //             console.log(document.cookie)
        //             alert(document.cookie)
        //             commit('updateCurrentUser', currentUser)
        //         }
        //     })
        // }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        },
        updateUser(state, user) {
            state.user = user
        }
        // updateCurrentUser(state, currentUser) {
        //     state.currentUser.login = currentUser.login
        //     state.currentUser.admin = currentUser.admin
        // },
        // updateServerResponse(state, statusCode) {
        //     state.serverResponse = statusCode
        // }
    },
    state: {
        users: [],
        user: {}
        // currentUser: {
        //     login: '',
        //     admin: false
        // },
        // serverResponse: ''
    },
    getters: {
        allUsers(state) {
            return state.users
        },
        oneUser(state) {
            return state.user
        }
        // currentUser(state) {
        //     return state.currentUser
        // },
        // serverResponse(state) {
        //     return state.serverResponse
        // },
        // isAdmin(state) {
        //     return state.currentUser.admin
        // },
        // isLogged(state) {
        //     return (state.currentUser.login !== '')

        // }
    },
}