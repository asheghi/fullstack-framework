<template>
  <div class="flex justify-center items-center min-h-screen gap-4">
    Home Page,
    <button @click="counter++" class="border py-1 px-3">
      Counter {{counter}}
    </button>
  </div>
</template>

<script>
export default {
  name:'HomePage',
  data(){
    return{
      counter:1,
    }
  }
}
</script>
