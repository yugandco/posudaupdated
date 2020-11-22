<template>
<div class='payment d-flex align-items-center' style="position: absolute; z-index: 2222; height: 100vh; width: 100vw; top: 0; left: 0; background-color: rgba(0,0,0,.6)">
    <div class="container-fluid">
        <div class="payment__inner">
            <div class="row">
                <div class="col-4 offset-4">
                    <div class="card">
                        <div class="card-header">Платежная система</div>
                        <div class="card-body">
                            <h5 class="card-title mb-2">Введите данные вашей карты</h5>
                            <h6 class="card-subtitle text-muted mb-4">Данные вашей карты в безопасности</h6>
                            <div>
                                <slot></slot>
                            </div>
                            <div>
                                <form @submit.prevent='goBuy'>
                                    <label for="number" class='form-label text-muted'>Номер вашей карты</label>
                                    <input id='number' class='form-control mb-2' type="text" placeholder="4212 2123 3213 32132" v-model='card.number'>
                                    <label for="fullName" class='form-label text-muted'>Имя и Фамилия</label>
                                    <input id='fullName' class='form-control mb-2' type="text" placeholder="YERNAR UMBETALI" v-model='card.fullName'>
                                    <label for="date" class='form-label text-muted'>Срок карты</label>
                                    <input id='date' class='form-control mb-2' type="text" placeholder="07/2022" v-model='card.date'>
                                    <label for="cvv" class='form-label text-muted'>Код карты с обратной стороны</label>
                                    <input id='cvv' class='form-control' type="text" placeholder="365" v-model='card.cvv'>
                                    <button class='btn btn-primary mt-3'>Купить</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Payment',
    data() {
        return {
            card: {
                number: '',
                fullName: '',
                date: '',
                cvv: ''
            }
        }
    },
    methods: {
        goBuy() {
            this.$emit('gobuy')
        }
    },
}
</script>
