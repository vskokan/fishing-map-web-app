<template>
    <div class="formContainer">
        <div class="form">
            <div class="header"><h2>Регистрация</h2></div>
            <div class="container">
                <div class="input">
                    <i class="fas fa-user icon"></i>
                    <input class="input-field" type="text" name="login" v-model="formData.login" @input="validateLogin" required>
                    <div class="placeholder">Логин</div>
                </div>
                <div class="description">Латинские буквы в нижнем регистре и цифры<div class="errors">{{errors.loginError}}</div></div>
            </div>
            <div class="container">
                <div class="input">
                    <i class="fas fa-envelope icon"></i>
                    <input class="input-field" type="text" name="login" v-model="formData.email" @input="validateEmail" required>
                    <div class="placeholder">Электронная почта</div>
                </div>
                <div class="description">Она типа нужна <div class="errors">{{errors.emailError}}</div></div>
            </div>            
            <div class="container">
                <div class="input">
                    <i class="fas fa-lock icon"></i>
                    <input class="input-field" type="password" name="password" v-model="formData.password" @input="validatePassword" required>
                    <div class="placeholder">Пароль</div>
                </div>
                <div class="description">От 8 символов, разный регистр, одна цифра и спецсимвол <div class="errors">{{errors.passwordError}}</div></div>
            </div>
            <div class="container">
                <div class="input">
                    <i class="fas fa-lock icon"></i>
                    <input class="input-field" type="password" name="password" v-model="formData.passwordRepeat" required>
                    <div class="placeholder">Повторите пароль</div>
                    
                </div>
                 <div class="description">Пароли должны совпадать <div class="errors">{{errors.matchError = (this.formData.password === this.formData.passwordRepeat)? '':'Пароли не совпадают'}}</div></div>
            </div>

            

            <div class="buttons">
                <button class="button-simple"
                :class="{ 'button-simple-disabled': hasErrors()}"
                :disabled="hasErrors()"
                 @click="send">Зарегистрироваться</button>
                
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                errors: {
                    loginError: 'Не заполнено',
                    passwordError: 'Не заполнено',
                    matchError: 'Пароли не совпадают',
                    emailError: 'Не заполнено'
                },
                formData: {
                    login: '',
                    email: '',
                    password: '',
                    passwordRepeat: ''
                },
            }
        },
        computed: mapGetters(['allUsers']),
        methods: {
            ...mapActions(['fetchUsersNoPagination', 'register']),
            isUserAlreadyExist() {
                let isExist = false
                this.allUsers.forEach(user => {
                    
                    if (user.login === this.formData.login) {
                        isExist = true
                    }
                })

                return isExist
            },
            isEmailAlreadyExist() {
                let isExist = false
                this.allUsers.forEach(user => {
                    
                    if (user.email === this.formData.email) {
                        isExist = true
                    }
                })

                return isExist
            },
            validateLogin() {
                const re = new RegExp( '^[a-zA-Z0-9]{3,15}$')
                if (this.formData.login.match(re) !== null) {
                    if (!this.isUserAlreadyExist()) {
                        this.errors.loginError = ''
                    } else {
                        this.errors.loginError = 'Логин занят'
                    }
                    
                    // console.log(this.allUsers)
                }
                else this.errors.loginError = 'Неправильный формат'
            },
            validateEmail() {
                const re = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')
                if (this.formData.email.match(re) !== null) {
                    if (!this.isEmailAlreadyExist()) {
                        this.errors.emailError = ''
                    } else {
                        this.errors.emailError = 'Такая почта уже есть'
                    }
                    
                    // console.log(this.allUsers)
                }
                else this.errors.emailError = 'Неправильный формат'
            },
            validatePassword() {
                const re = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
                if (this.formData.password.match(re) !== null) {
                        this.errors.passwordError = ''
                }
                else this.errors.passwordError = 'Слабый пароль'
            },
            checkPasswordMatch() {
                if (this.formData.password === this.formData.passwordRepeat) {
                    this.errors.matchError = ''
                } else {
                    this.errors.matchError = 'Пароли не совпадают'
                }
                    
                
            },
            hasErrors() {
                let errors = false

                for (let key in this.errors) {
                    if (this.errors[key].length > 0) {
                        errors = true
                    }
                }

                return errors
            },
            send() {
                const formData = new FormData()

                formData.append('login', this.formData.login)
                formData.append('email', this.formData.email)
                formData.append('password', this.formData.password)

                this.register(formData)
                
            }
        },
        created() {
            this.fetchUsersNoPagination()
        }
        
    }
</script>

<style scoped>

    .header {
        width: 800px;
        padding: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        /* background: linear-gradient(to right, var(--color-yellow),var(--color-violet)); */
        /* background-color: var(--color-violet); */
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        font-size: 34px;
        color: rgb(0, 0, 0);
    }

    .icon {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            position: relative;
            top: 0px;
    }

    .fas {
        font-size: 16px;
        color: #000;
    }

    .formContainer {
        background-color: #fff;
        width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 0px 20px 20px 20px;
        /* box-shadow: 0 0 60px rgba(14, 42, 71, 0.25); */
        /* box-shadow: 0 0 60px rgba(14,42,71,.25); */
        border-radius: 15px;
        z-index: 0;
    }

    .form {
        margin: 0px 0px 20px 0px;
    }

    .container {
        margin-left: 40px;
        margin-right: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: 'Inter', sans-serif;
    }

    .input {
        padding-top: 30px;
        position: relative;
        height: 60px;
        margin-bottom: 10px;
        
    }


    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 40px;
        
    } 

    .input-field {
        border: none;
        border-bottom: 1px solid var(--color-violet);
        background: transparent;
        z-index: 1;
        width: 300px;
        font-size: 26px;
        font-family: 'Rubik', sans-serif;
        outline: none;
    }

    .input-field:required {
        border: none;
        box-shadow: none;
        border-bottom: 1px solid lightgray;
    }

    .placeholder {
        font-size: 18px;
        color: lightgray;
        position: relative;
        top: -35px;
        padding-left: 35px;
        z-index: -1;
        text-align: left;
        transition: font-size 0.01s ease-in-out 0.01s;
        transition: color 0.5s ease-in-out 0.01s;
 
    }

    .input-field:focus + .placeholder, .input-field:valid + .placeholder {
        color: var(--color-violet);
        font-size: 18px;
        font-family: 'Inter', sans-serif;
        animation: movePlaceholder 0.2s ease-in forwards;
        border: transparent;
        outline: none;
    }

    .input-field:not(:focus) + .placeholder {
        color: var(--color-lightgray);
    }

    @keyframes movePlaceholder {
        to {
            transform: translateY(-30px);
        }
    }

    .errors {
        margin-top: 10px;
        color: rgb(209, 87, 87)
    }

    .description {
         margin-bottom: 10px;
         padding-top: 40px;
         width: 410px;
         text-align: end;
         font-family: "Inter", sans-serif;
         color: #000;
         font-size: 14px;
    }

</style>