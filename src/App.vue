<template>
<div class="app">
    <Nav />
    <div class="content">
        <router-view />
    </div>
</div>
</template>

<script>
import Nav from '../src/components/Nav.vue'

export default {
    name: 'App',
    components: {
        Nav
    }
}
</script>

<style lang="scss">
#app {}
</style>
