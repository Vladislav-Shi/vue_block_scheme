<template>
    <MainPage></MainPage>
</template>

<script>
import MainPage from './components/MainPage.vue'
import store from './store';

export default {
  name: 'App',
  store:store,
  components: {
    MainPage
  }
}
</script>

<style>

</style>
