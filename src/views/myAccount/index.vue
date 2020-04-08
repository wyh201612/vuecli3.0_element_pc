<template>
    <div class="MyAccount-container">
        <div class="main">
            <section class="el-container">
                <Aside />
                <main class="el-main">
                    <router-view />
                </main>
            </section>
        </div>
    </div>
</template>

<script>
    import Aside from './components/aside.vue'
    export default {
        name: 'MyAccount',
        components: {
            Aside
        },
        data() {
            return {

            }
        },
        watch: {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

        }
    }

</script>

<style lang="scss" scoped>
    .MyAccount-container {
        overflow: hidden;
        .main {
            overflow: hidden;
            width: 1200px;
            margin: 40px auto;
            background-color: #ffffff;
        }
    } 
</style>
