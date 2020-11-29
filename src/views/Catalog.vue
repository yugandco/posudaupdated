<template>
<div class='catalog'>
    <div class="container">
        <div class="catalog__title h2 font-weight-bold mb-2">
            Каталог товаров
        </div>
        <div class="catalog__body">
            <div class="row row-cols-4 g-4">
                <div class="col-12 d-flex">
                    <input class='form-control' id='search' name='search' type="text" placeholder="Поиск товаров в каталоге по именем:::" v-model='searchInput'>
                    <button @click='goSearch(searchInput)' class='btn btn-primary ml-2'>Поиск</button>
                </div>
                <div v-if='inInputSearch' class="col-12">Поиск по запросу "{{inInputSearch}}"</div>
                <div class="col-12">{{error}}</div>
                <div class="col" v-for='(item, index) in catalogs' :key='index'>
                    <div class="card" style="">
                        <img :src='item.img' class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{item.title}}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <p class="card-text">Цена: {{item.price}} тг. оптом</p>
                            <p class='card-text'>На складе иммется: {{ item.hasQty }}</p>
                            <a href="#" class="btn btn-primary">Купить сейчас</a>
                            <button @click='addToCart(item._id)' class='btn btn-outline-warning d-flex align-items-center float-right'>
                                <i class='material-icons'>add_shopping_cart</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Catalog',
    data() {
        return {
            catalogs: [],
            error: '',
            inInputSearch: '',
            searchInput: ''
        }
    },
    created() {
        if(!localStorage.getItem('searchItem')) {
            axios.get('http://localhost:9991/api/catalog')
            .then(res => {
                if (res.status === 200) {
                    const datas = res.data.products
                    if(datas.length === 0) {
                        console.log(datas.length)
                        this.error = 'Товаров еще нет...'
                    } else {
                        datas.forEach(data => {
                            this.catalogs.push(data)
                        })
                    } 
                }
            })
        } else {
            const value = localStorage.getItem('searchItem')
            const vm = this
            this.inInputSearch = value
            this.searchInput = value
            vm.goSearch(value)
        }
    },
    methods: {
        addToCart(id) {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user._id)
            axios.post(`http://localhost:9991/api/catalog/${user._id}/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                    }
                })
        },
        goSearch(value) {
            localStorage.removeItem('searchItem')
            this.catalogs.length = 0
            this.inInputSearch = value
            axios.get(`http://localhost:9991/api/catalog/${value}`)
                .then(res => {
                    if(res.status === 200){
                        console.log(res)
                        const items = res.data.products
                        if(items.length === 0) {
                            this.error = 'Товар не найден...'
                        } else {
                            items.forEach(item => {
                                this.catalogs.push(item)
                            })
                        }
                    }
                })
        }
    },
}
</script>

<style lang="scss">
    
</style>
