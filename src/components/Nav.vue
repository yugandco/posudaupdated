<template>
<div class="navi">
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <router-link to='/'>Posuda.kz</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0 ml-2">
                    <li class="nav-item">
                        <a @click='goHome' class="nav-link" aria-current="page" href="#">Главная</a>
                    </li>
                    <li class="nav-item">
                        <a @click='goAbout' class="nav-link" href="#">О Компании</a>
                    </li>
                    <li class="nav-item">
                        <a @click='goCatalog' href="#" class="nav-link">Каталог</a>
                    </li>
                    <li v-if='isAdmin' class="nav-item">
                        <a @click='goAddNewItem' href="#" class="nav-link">Добавить товар</a>
                    </li>

                </ul>
                <div class="d-flex">
                    <div class='d-flex' v-if='showDropdown'>
                        <button @click='goCartMaster' class='btn btn-light float-left'>Корзина <span class='badge bg-primary'>{{ counter }}</span></button>
                        <div class="dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                Аккаунт
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Профиль</a></li>
                                <li><a @click='goOut' class="dropdown-item" href="#">Выйти с аккаунта</a></li>
                            </ul>
                        </div>
                    </div>
                    <button v-if='showBtn' @click='goAuth' class="btn regisBtn">Регистрация | Войти</button>
                </div>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Nav',
    data() {
        return {
            showBtn: false,
            showDropdown: true,
            counter: '',
            isAdmin: false
        }
    },
    created() {
        if (!localStorage.getItem('token')) {
            this.showBtn = true
            this.showDropdown = false
        }
        if (localStorage.getItem('token')) {
            const user = JSON.parse(localStorage.getItem('user'))
            axios.get(`http://localhost:9991/api/counter/${user._id}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        const datas = res.data.products
                        this.counter = datas.length
                    }
                })

            if (user.email === 'admin@gmail.com') {
                this.isAdmin = true
            } else {
                this.isAdmin
            }
        }

    },

    methods: {
        goAuth() {
            this.$router.push('/login')
        },
        goOut() {
            localStorage.clear()
            this.$router.push('/login')
        },
        goHome() {
            this.$router.push('/').catch(() => {})
        },
        goCatalog() {
            this.$router.push('/catalog').catch(() => {})
        },
        goCartMaster() {
            this.$router.push('/going-to-cart').catch(() => {})
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.navi {
    .router-link-active {
        color: #702abe;
        font-weight: 700;
        font-size: 1.3rem;
        text-decoration: none;
    }

    #navbarDropdown {
        color: #702abe;
        font-weight: 500;
        text-decoration: none;
    }

    .btn {
        border: 1px solid #702abe;
        color: #702abe;
    }

    .btn:hover {
        background-color: #702abe;
        color: #fff;
    }
}
</style>
