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
        }
    },
    state: {
        form: false,
        card: false,
        editForm: false,
        changePasswordForm: false,
        currentPage: 1,
        maxPage: 1,
        slider: false
    },
    getters: {
        showForm(state) {
            return state.form
        },
        showCard(state) {
            return state.card
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