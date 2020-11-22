<template>
<div class='login'>
    <div class="container">
        <div class="login__head">
            <div class="row">
                <div class="col-6 offset-3">
                    <h3 class='mb-3 mt-4'>Войти</h3>
                </div>
            </div>
        </div>
        <div class="login__body">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="errorAll">{{ error.all }}</div>
                    <form @submit.prevent='goLogin' action="/login">
                        <div class='mb-3'>
                            <label id='femail' for="email" class='form-label'>Email</label>
                            <input @change='emailChange' id="email" type="email" class='form-control' placeholder='Введите email' v-model='user.email'>
                            <div class='errorEmail'>{{ error.email }}</div>
                        </div>
                        <div class='mb-4'>
                            <label id='fpassword' for="password" class='form-label'>Пароль</label>
                            <input @change='passwordChange' id='password' type="password" class='form-control' placeholder='Введите ваш пароль' v-model='user.password'>
                            <div class='errorPassword1'>{{ error.password.first }}</div>
                            <div class='errorPassword2'>{{ error.password.second }}</div>
                            <div class='errorPassword3'>{{ error.password.third }}</div>
                        </div>
                        <button class="btn btn-block btn-primary">Войти</button>
                    </form>
                    <div class='divider mt-4'>Если нет аккаунта, то пройдите регистрацию ниже...</div>
                    <router-link to='/registr'>Регистрация</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            error: {
                email: '',
                password: {
                    first: '',
                    second: '',
                    third: '',
                },
                all: ''
            }
        }
    },
    methods: {
        emailChange(e) {
            e.preventDefault()
            const email = e.target
            if (email.value === '' || email.value.length === 0 || !email.value.match(/@/g)) {
                document.querySelector('#femail').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.errorEmail').style.color = 'rgb(187, 45, 45)'
                this.error.email = 'Забыли знак этот знак - @'
            } else {
                document.querySelector('#femail').style.color = 'rgb(52, 153, 52)'
                document.querySelector('#email').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.errorEmail').style.color = 'rgb(52, 153, 52)'
                this.error.email = 'Теперь правильно!'
            }
        },
        passwordChange(e) {
            e.preventDefault()
            const password = e.target
            if (password.value === '' || password.value.length === 0 || password.value.charAt(0) !== password.value.charAt(0).toUpperCase() || password.value.length < 8) {
                document.querySelector('#fpassword').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.errorPassword1').style.color = 'rgb(187, 45, 45)'
                document.querySelector('.errorPassword2').style.color = 'rgb(187, 45, 45)'
                document.querySelector('.errorPassword3').style.color = 'rgb(187, 45, 45)'
                this.error.password.first = 'Пароль не верный!'
                this.error.password.second = 'Кажется тут меньше 8 символов!'
                this.error.password.third = 'Первый символ должен быть с Главной, также не забудьте про цифры!'
            } else {
                document.querySelector('#fpassword').style.color = 'rgb(52, 153, 52)'
                document.querySelector('#password').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.errorPassword1').style.color = 'rgb(52, 153, 52)'
                this.error.password.first = 'Теперь все верно!'
                this.error.password.second = ''
                this.error.password.third = ''
            }
        },
        async goLogin() {
            if (this.user.email === '' && this.user.password === '') {
                document.querySelector('#femail').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#fpassword').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
            } else if (this.user.email === '') {
                document.querySelector('.errorAll').style.color = 'rgb(187,45,45)'
                document.querySelector('#femail').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                this.error.all = 'Нужно заполнить все формы!'
            } else if (this.user.password === '') {
                document.querySelector('#fpassword').style.color = 'rgb(187, 45, 45)'
                document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.errorAll').style.color = 'rgb(187,45,45)'
                this.error.all = 'Нужно заполнить все формы!'
            } else {
                const userLogin = {
                    email: this.user.email,
                    password: this.user.password
                }

                await axios.post('api/login', userLogin)
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            console.log(res)
                            localStorage.setItem('token', res.data.token)
                            localStorage.setItem('user', JSON.stringify(res.data.user))
                            this.$router.push('/')
                        }
                    }, err => {
                        if (err.response.status === 404) {
                            document.querySelector('#femail').style.color = 'rgb(187, 45, 45)'
                            document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                            document.querySelector('.errorEmail').style.color = 'rgb(187, 45, 45)'
                            document.querySelector('.errorAll').style.color = 'rgb(187,45,45)'
                            this.error.email = err.response.data.title
                            this.error.all = err.response.data.error
                            document.querySelector('#fpassword').style.color = 'rgb(187, 45, 45)'
                            document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                            document.querySelector('.errorPassword1').style.color = 'rgb(187, 45, 45)'
                            this.error.password.first = ''
                        }

                        if (err.response.status === 401) {
                            document.querySelector('#fpassword').style.color = 'rgb(187, 45, 45)'
                            document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                            document.querySelector('.errorPassword1').style.color = 'rgb(187, 45, 45)'
                            this.error.password.first = 'Пароль не верный!'
                        }
                        console.log(err.response)

                    })

            }
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>
