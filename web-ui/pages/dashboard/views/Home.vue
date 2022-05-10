<template>
<div class="home text-center p-8">
  <router-link :to="{name:'todos'}" v-text="'Todos'"/>
</div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
