<template>
<div class="home">
    <div class="container">
        <div class="home__block__first">
            <div class="home__block__first__left">
                <h1>Приветствуем <span class='username'>{{ username }}</span>, мы рады видеть вас!</h1>
                <p>Здесь вы можете приобрести самые необходимые товары для вашего удобства...</p>
                <div id='search' class='d-flex w-75'>
                    <input type="text" class='form-control' placeholder="Начните поиск товара:::" v-model='searchText'>
                    <button @click='goSearchPage' class='btn btn-warning ml-2'>Поиск</button>
                </div>
            </div>
            <div class="home__block__first__right">
                <div class="home__block__first__right__image">

                </div>
            </div>
        </div>
        <div class="home__block__fourth mt-5 mb-5">
            <div class="row">
                <div class="col-4">
                    <div class='home__block__fourth__title'>Количество товаров на сайте:</div>
                    <div class="home__block__fourth__quantity">3.</div>
                </div>
                <div class="col-4">
                    <div class='home__block__fourth__title'>Количество проданных товаров:</div>
                    <div class="home__block__fourth__quantity">3.</div>
                </div>
                <div class="col-4">
                    <div class='home__block__fourth__title'>Количество пользователей на сайте каждый день:</div>
                    <div class="home__block__fourth__quantity">2.</div>
                </div>
            </div>
        </div>
        <div class="home__block__second pb-5">
            <h5 class='ml-2 border-bottom'>Каталог товаров</h5>
            <div class="home__block__second__items">
                <div class="row">
                    <div v-for='(catalog, index) in catalogs' :key='index' class="col-3">
                        <div class="card">
                            <img class="card-img-top" :src='catalog.img' alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{catalog.title}}</h5>
                                <div class="card-text">
                                    <span>Оптовая цена: {{ catalog.price }} тг.</span>
                                    <span>Количество в упаковке: {{catalog.quantity}}шт.</span>
                                    <span>Минимальный заказ: {{catalog.minorder}} шт.</span>
                                </div>
                                <div class='buttons mt-3'>
                                    <button class="btn btn-primary">Купить сейчас</button>
                                    <button class="btn btn-outline-warning material-icons">add_shopping_cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__block__third">
            <h5 class='ml-2 border-bottom'>Сейчас покупают</h5>
            <div class="home__block__third__items">
                <div class="row">
                    <div v-for='(catalog, index) in catalogs' :key='index' class="col-3">
                        <div class="card">
                            <img class="card-img-top" :src='catalog.img' alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{catalog.title}}</h5>
                                <div class="card-text">
                                    <span>Оптовая цена: {{ catalog.price }} тг.</span>
                                    <span>Количество в упаковке: {{catalog.quantity}}шт.</span>
                                    <span>Минимальный заказ: {{catalog.minorder}} шт.</span>
                                </div>
                                <div class='buttons mt-3'>
                                    <button class="btn btn-primary">Купить сейчас</button>
                                    <button class="btn btn-outline-warning material-icons">add_shopping_cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__block__fifth mt-5">
            <div class="home__block__fifth__up">
                <div>Posuda.kz</div>
                <div>Главная</div>
                <div>О Компании</div>
                <div>Каталог</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            searchText: '',
            username: '',
            catalogs: [{
                    img: require('../assets/p1.jpg'),
                    title: 'Ланч бокс 3 секции',
                    price: '23',
                    quantity: '130-200',
                    minorder: '200',
                },
                {
                    img: require('../assets/p3.jpg'),
                    title: 'Ланч бокс 3 секции',
                    price: '30',
                    quantity: '130-200',
                    minorder: '200',
                },
                {
                    img: require('../assets/p2.jpg'),
                    title: 'Ланч бокс 3 секции',
                    price: '35',
                    quantity: '130-200',
                    minorder: '200',
                },
            ]
        }
    },
    created() {
        if (!localStorage.getItem('token')) {
            this.$router.push('/login')
        }
        const us = JSON.parse(localStorage.getItem('user'))
        this.username = us.firstname
    },
    methods: {
        goSearchPage() {
            localStorage.setItem('searchItem', this.searchText)
            this.$router.push('/catalog')
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    h5.border-bottom {
        font-size: 1.5rem;
        color: rgba(0, 0, 0, 0.3);
        font-weight: 700;
    }

    .username {
        border-bottom: 3px solid #ffc107;
        color: #fff;
    }

    &__block__first {
        margin-top: 3vh;
        height: 60vh;
        background-color: #702abe;
        color: #fff;
        padding: 3vh;
        display: flex;
        align-items: center;
        border-radius: 20px;

        &__left {
            button {
                color: #fff;
            }
        }
    }

    &__block__second {
        padding-top: 8vh;

        &__items {
            padding: 10px;

            .card {
                border: none;

                .card-text {
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                }

                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    button:nth-child(1) {
                        background-color: #702abe;
                        border-color: #702abe;
                    }
                }
            }

            .card:hover {
                box-shadow: 0 7px 10px rgba(0, 0, 0, .15)
            }
        }

    }

    &__block__third {
        padding-top: 8vh;

        &__items {
            padding: 10px;

            .card {
                border: none;

                .card-text {
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                }

                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    button:nth-child(1) {
                        background-color: #702abe;
                        border-color: #702abe;
                    }
                }
            }

            .card:hover {
                box-shadow: 0 7px 10px rgba(0, 0, 0, .15)
            }
        }

    }

    &__block__fourth {
        .col-4 {
            height: 25vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            border-radius: 15px;

        }

        .col-4:hover {
            background-color: #BB6FFF;
            color: #fff;
            box-shadow: 0 7px 20px #BB6FFF;
        }

        &__title {}

        &__quantity {
            font-size: 5rem;
        }
    }

    &__block__fifth {
        height: 15vh;
        background-color: #f8f8f8;
        padding-top: 3%;

        &__up {
            display: flex;
            align-items: center;
            justify-content: space-around;

            div {
                font-size: 1rem;
            }
        }
    }
}
</style>
