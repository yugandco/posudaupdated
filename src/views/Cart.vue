<template>
<div class='cart'>
    <div class="container">
        <Payment v-if='showPaymentForm' @gobuy='goBuy'>
            <p class='card-text mb-2'>
                ID вашего товара: <span class='font-weight-bold'>{{itemid}}</span>
            </p>
            <p class='card-text mb-2'>Сумма вашего заказа: <span class='font-weight-bold'>{{sum}} тг.</span></p>
            <p class='card-text font-weight-bold' style='color: red'>{{error}}</p>
        </Payment>
        <div class="cart__title h2 font-weight-bold">
            Корзина
        </div>
        <div class="cart__body">
            <div class="row">
                <div class="col">{{good}}</div>
            </div>
            <div class="row row-cols-2 g-4">
                <CartItem v-for='(item, index) in carts' :key='index' :cart='item' @buyitem='buyItem(item._id)' />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CartItem from './CartItem.vue'
import axios from 'axios'
import Payment from './Payment.vue'
export default {
    name: 'Cart',
    components: {
        CartItem,
        Payment
    },
    data() {
        return {
            carts: [],
            arr: [],
            showPaymentForm: false,
            itemid: '',
            error: '',
            qty: '',
            sum: '',
            good: ''
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`http://localhost:9991/api/cart/${user._id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    const datas = res.data.products

                    datas.forEach(data => {
                        this.carts.push(data)
                    })
                }
            })
    },
    methods: {
        buyItem(id) {
            this.itemid = id
            this.qty = localStorage.getItem('qty')
            this.sum = localStorage.getItem('sum')
            this.showPaymentForm === false ? this.showPaymentForm = true : this.showPaymentForm
        },
        goBuy() {
            const user = JSON.parse(localStorage.getItem('user'))

            const dt = {
                qty: this.qty,
                sum: this.sum
            }

            // if (this.card.number === '') {
            //     this.error = 'Заполните данные пожалуйста!'
            // } else {
            axios.post(`http://localhost:9991/api/buy-this-item/${user._id}/${this.itemid}`, dt)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        localStorage.removeItem('qty')
                        localStorage.removeItem('sum')
                        this.showPaymentForm = false
                        this.good = res.data.title
                    }
                })
            // }
        }
    },
}
</script>
