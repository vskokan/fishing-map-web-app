import http from '../http-common' // Импотируем методы axios для отправки запросов на сервер

class AuthData {
    login(data) {
        return http.post(`au/login`, data) // В data будем помещать такие данные, как ip, user-agent и refreshToken
    }

    logout() {
        return http.post(`au/logout`) // С data аналогично
    }

    checkSession(data) {
        return http.post('au/verify', data)
    }

    register(data) {
        return http.post('au/register', data)
    }
}

export default new AuthData() // Экспортируем данный класс для использования его методов в Vuex