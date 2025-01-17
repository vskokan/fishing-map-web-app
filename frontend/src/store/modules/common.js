export default {
    actions: {
    },
    mutations: {
        changeFormView(state) {
            state.form = !state.form
        },
        changeCardView(state) {
            state.card = !state.card
        },
        changeDepartmentCardView(state) {
            state.departmentCard= !state.departmentCard
        },
        changeEditFormView(state) {
            state.editForm = !state.editForm
        },
        changePasswordFormView(state) {
            state.changePasswordForm = !state.changePasswordForm
        },
        updateMaxPage(state, elements) {
            state.maxPage = elements
        },
        incrementCurrentPage(state) {
            if (state.currentPage < Math.ceil(state.maxPage / 7)) state.currentPage = state.currentPage + 1
        },
        decrementCurrentPage(state) {
            if (state.currentPage > 1) state.currentPage--
        },
        changeSliderView(state) {
            state.slider = !state.slider
        },
        closeAllWindows(state) {
            state.form = false
            state.card = false
            state.editForm = false
            state.changePasswordForm = false
            state.departmentCard = false
        }
    },
    state: {
        form: false,
        card: false,
        editForm: false,
        changePasswordForm: false,
        currentPage: 1,
        maxPage: 1,
        slider: false,
        departmentCard: false
    },
    getters: {
        showForm(state) {
            return state.form
        },
        showCard(state) {
            return state.card
        },
        showDepartmentCard(state) {
            return state.departmentCard
        },
        showEditForm(state) {
            return state.editForm
        },
        showChangePasswordForm(state) {
            return state.changePasswordForm
        },
        getMaxPage(state) {
            return state.maxPage
        },
        getCurrentPage(state) {
            
            return state.currentPage
        },
        showSlider(state) {
            return state.slider
        }
    },
}