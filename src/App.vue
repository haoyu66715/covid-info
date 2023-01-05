<template>
    <router-view/>
</template>

<script setup>
    import {useStore} from "vuex"
    const store = useStore();

    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //!!!!!!!!!!!!!!!!!!!!!!!在页面刷新时将vuex里的信息保存到sessionStorage里!!!!
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state));
    })
</script>



<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
