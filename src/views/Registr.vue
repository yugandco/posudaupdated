<template>
<div class='registr'>
    <div class="container">
        <div class="row">
            <div class="col-6 offset-3">
                <h3 class='mb-3 mt-4'>Регистрация</h3>
                <div class='beforeSubmitError'>{{ error.err }}</div>
                <form @submit.prevent='submitForm' action='/registr' method='post'>
                    <div class='mb-3'>
                        <label class='fname inValid' id='fname' for="firstName">Имя</label>
                        <input @change='changeFirstname' type="text" class='form-control' id='firstName' placeholder="Абай" v-model='user.firstname'>
                        <div class='isRed'>{{ error.firstname }}</div>
                    </div>
                    <div class='mb-3'>
                        <label class='lname inValid' id='lname' for="lastName">Фамилия</label>
                        <input @change='changeLastname' type="text" class='form-control' id='lastName' placeholder="Кунанбай" v-model='user.lastname'>
                        <div class='isRed'>{{ error.lastname }}</div>
                    </div>
                    <div class='mb-3'>
                        <label class='lemail inValid' id='lemail' for="email">Email</label>
                        <input @change='changeEmail' type="email" class='form-control' id='email' placeholder="posuda@email.com" v-model='user.email'>
                        <div class='isRed'>{{ error.email }}</div>
                    </div>
                    <div class='mb-3'>
                        <label class='lnumber inValid' id='lnumber' for="phoneNumber">Телефон</label>
                        <input @change='changeNumber' type="text" class='form-control' id='phoneNumber' maxlength='11' placeholder="87070070707" v-model='user.phonenumber'>
                        <div class='isRed'>{{ error.number.first }}</div>
                        <div class='isRed'>{{ error.number.second }}</div>
                        <div class='isRed'>{{ error.number.third }}</div>
                    </div>
                    <div class='mb-3'>
                        <label class='lcity inValid' id='lcity' for="city">Город</label>
                        <input @change='changeCity' type="text" class='form-control' id='city' placeholder="Семей" v-model='user.city'>
                        <div class='isRed'>{{ error.city }}</div>
                    </div>
                    <div class='mb-4'>
                        <label class='lpassword inValid' id='lpassword' for="password">Пароль</label>
                        <input @change='changePassword' type="password" class='form-control' id='password' placeholder="Введите пароль" v-model='user.password'>
                        <div class='isRed'>{{ error.password.minLength }}</div>
                        <div class='isRed'>{{ error.password.upper }}</div>
                        <div class='isRed'>{{ error.password.number }}</div>
                    </div>
                    <button class="btn btn-block btn-primary" type='submit'>Регистрация</button>
                </form>
                <div class="divider mt-3">Если есть аккаунт то войдите</div>
                <router-link to='/login'>Войти</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Registr',
    data() {
        return {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                city: '',
                password: ''
            },
            error: {
                firstname: '',
                lastname: '',
                email: '',
                number: {
                    first: '',
                    second: '',
                    third: ''
                },
                city: '',
                password: {
                    minLength: '',
                    upper: '',
                    number: ''
                },
                err: ''
            }
        }
    },
    mounted() {
        const input = document.querySelector('#phoneNumber')
        let value = input.value
        document.querySelector('#phoneNumber').addEventListener('input', (e) => {
            const newVal = e.target
            if (newVal.value.match(/[^0-9]/g)) {
                input.value = value
                return
            }
            value = newVal
        })
    },
    methods: {
        changeFirstname(e) {
            e.preventDefault()
            const firstname = e.target
            if (firstname.value == '' || firstname.value.length == 0) {
                document.querySelector('#firstName').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.fname').style.color = 'rgb(187, 45,45)'
            } else {
                document.querySelector('#firstName').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.fname').style.color = 'rgb(52, 153, 52)'
                this.error.firstname = ''
            }
        },
        changeLastname(e) {
            e.preventDefault()
            const lastname = e.target
            if (lastname.value == '' || lastname.value.length == 0) {
                document.querySelector('#lastName').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.lname').style.color = 'rgb(187, 45,45)'
            } else {
                document.querySelector('#lastName').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.lname').style.color = 'rgb(52, 153, 52)'
                this.error.lastname = ''
            }
        },
        changeEmail(e) {
            e.preventDefault()
            const email = e.target
            if (email.value == '' || email.value.length == 0 || !email.value.match(/@/g)) {
                document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.lemail').style.color = 'rgb(187, 45,45)'
                this.error.email = 'Не забудьте @!'
            } else {
                document.querySelector('#email').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.lemail').style.color = 'rgb(52, 153, 52)'
                this.error.email = ''
            }
        },
        changeNumber(e) {
            e.preventDefault()
            const number = e.target
            if (number.value.charAt(0) !== '8' || number.value.charAt(1) !== '7') {
                document.querySelector('#phoneNumber').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.lnumber').style.color = 'rgb(187, 45,45)'
                this.error.number.second = 'Номер начинается с цифры 8'
                this.error.number.third = 'Вторая цифра должна быть 7'
            } else {
                document.querySelector('#phoneNumber').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.lnumber').style.color = 'rgb(52, 153, 52)'
                this.error.number = {}
            }
        },
        changeCity(e) {
            e.preventDefault()
            const city = e.target
            if (city.value === '' || city.value.length === 0 || city.value.length < 0) {
                document.querySelector('#city').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.lcity').style.color = 'rgb(187, 45,45)'
            } else {
                document.querySelector('#city').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.lcity').style.color = 'rgb(52, 153, 52)'
                this.error.city = ''
            }
        },
        changePassword(e) {
            e.preventDefault()
            const password = e.target
            if (password.value.length < 8 || password.value.charAt(0) !== password.value.charAt(0).toUpperCase() || !password.value.match(/\d/g)) {
                document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('.lpassword').style.color = 'rgb(187,45,45)'
                this.error.password.minLength = 'Пароль не должен быть меньше 8 символов!'
                this.error.password.upper = 'Первый символ должен быть с большой Буквой'
                this.error.password.number = 'Испольуйте цифры!'
            } else {
                document.querySelector('#password').style.borderColor = 'rgb(52, 153, 52)'
                document.querySelector('.lpassword').style.color = 'rgb(52, 153, 52)'
                this.error.password = {}
            }
        },
        submitForm(e) {
            e.preventDefault()
            if (this.user.firstname === '' && this.user.lastname === '' && this.user.email === '' && this.user.phonenumber === '' && this.user.city === '' && this.user.password === '') {
                document.querySelector('.fname').style.color = 'rgb(187, 45, 45)';
                document.querySelector('.lname').style.color = 'rgb(187, 45, 45)';
                document.querySelector('.lemail').style.color = 'rgb(187, 45, 45)';
                document.querySelector('.lnumber').style.color = 'rgb(187, 45, 45)'
                document.querySelector('.lcity').style.color = 'rgb(187, 45, 45)';
                document.querySelector('.lpassword').style.color = 'rgb(187, 45, 45)';
                document.querySelector('#firstName').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#lastName').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#email').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#phoneNumber').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#city').style.borderColor = 'rgb(187, 45, 45)'
                document.querySelector('#password').style.borderColor = 'rgb(187, 45, 45)'
                this.error.firstname = 'Имя нужно ввести!'
                this.error.lasttname = 'Фамилию тоже надо!'
                this.error.email = 'Почту обязательно!'
                this.error.number.first = 'Без номера нельзя!'
                this.error.city = 'Город нужен для доставки!'
                this.error.password.minLength = 'Пароль должен быть всегда!'
            } else if (this.user.firstname === '' || this.user.lastname === '' || this.user.email === '' || this.user.password === '' || this.user.phonenumber === '' || this.user.city === '') {
                this.error.err = 'Нужно заполнить все формы правильно!'
                document.querySelector('.beforeSubmitError').style.color = 'rgb(187, 45, 45)'
            } else {
                const user = {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email,
                    phonenumber: this.user.phonenumber,
                    city: this.user.city,
                    password: this.user.password
                }
                console.log(user)
                axios.post('http://localhost:9991/api/registr', user)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res)
                            this.$router.push('/login')
                        }
                    })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.isRed {
    border-color: rgb(187, 45, 45);
    color: rgb(187, 45, 45);
}

.isGreen {
    border-color: rgb(52, 153, 52);
    color: #000;
}
</style>
