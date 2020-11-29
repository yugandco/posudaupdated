<template>
<div class='cart-item col-3'>
    <div :id='cart._id' class="card">
                <img :src='cart.img' alt="">
                <div class="card-body">
                    <h5 class="card-title">{{ cart.title }}</h5>
                    <p class="card-text">{{ cart.description }}</p>
                    <p class="card-text">{{cart.hasQty}} шт. | {{cart.price}} тг. за шт.</p>
                    <div class="row">
                        <div class="col-4">
                            <input class='form-control mb-3' type="number" max="500" id='qty' :placeholder='cart.hasQty + "шт."' v-model='qty'>
                        </div>
                        <div class="col mt-1">
                            Сумма заказа: {{ sum = qty * cart.price}}
                        </div>
                    </div>

                    <button @click='buyItem()' class='btn btn-primary'>Купить</button>
                    <button @click='deleteFromCart(cart._id)' class='btn btn-outline-danger d-flex align-items-center float-right'>
                        <i class='material-icons'>delete</i>
                    </button>
                </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CartItem',
    props: {
        cart: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            qty: null,
            sum: null
        }
    },
    methods: {
        deleteFromCart(id) {
            const user = JSON.parse(localStorage.getItem('user'))
            axios.post(`http://localhost:9991/api/delete-from-cart/${user._id}/${id}`, null)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        document.getElementById(`${id}`).style.display = 'none'
                        window.location.href='/going-to-cart'
                    }
                })
        },
        buyItem() {
            localStorage.setItem('qty', this.qty)
            localStorage.setItem('sum', this.sum)
            this.$emit('buyitem')
        }
    }
}
</script>
