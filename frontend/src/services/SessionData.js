import http from '../http-common' // Импотируем методы axios для отправки запросов на сервер

class SessionData {
    getSessions(login) {
        return http.get(`/users/${login}/sessions`)
    }

    deleteSessions(login, sessionId) {
        return http.delete(`/users/${login}/sessions/${sessionId}`)
    }
}

export default new SessionData() // Экспортируем данный класс для использования его методов в Vuex