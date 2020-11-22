<template>
<div class='addproduct'>
    <div class="container">
        <div class="addproduct__title h1 text-center">Добавить новый продукт</div>
        <div class="addproduct__body">
            <div class="row">
                <div class="col-6 offset-3">
                    <form @submit.prevent='addItem' action="/add-product" method="post">
                        <label for="img" class='form-label'>Добавить ссылку на фото:</label>
                        <input id='img' type="text" name='img' class='form-control mb-2' placeholder="https://somewhere.kz/posuda-1" v-model='img'>
                        <label for="title" class='form-label'>Заголовок</label>
                        <input id='title' type="text" name='title' class='form-control mb-2' placeholder="Посуда для салата" v-model='title'>
                        <label for="description" class='form-label'>Описание</label>
                        <textarea id='description' rows='3' name='description' class='form-control mb-2' placeholder="Описание" v-model='description'></textarea>
                        <label for="price" class='form-label'>Цена в тг.</label>
                        <input id='price' type='number' name='price' class='form-control mb-2' placeholder="100" v-model='price'>
                        <label for="hasQty" class='form-label'>Сколько имеется на складе</label>
                        <input id='hasQty' type="number" name='hasQty' class='form-control mb-5' placeholder="200" v-model='hasQty'>
                        <button class='btn btn-primary'>Добавить новый товар</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddProduct',
    data() {
        return {
            img: '',
            title: '',
            description: '',
            price: '',
            hasQty: '',
            sale: ''
        }
    },
    methods: {
        addItem() {
            let newItem = {
                img: this.img,
                title: this.title,
                description: this.description,
                price: this.price,
                hasQty: this.hasQty,
                sale: this.sale
            }

            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user._id)
            axios.post('http://localhost:9991/api/add-new-item', newItem, {
                    headers: {
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        this.$router.push('/catalog')
                    }
                })
        }
    }
}
</script>
