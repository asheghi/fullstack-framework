<template>
  <div class="todos px-8 py-12 flex flex-col justify-center mx-auto" style="max-width: 500px">
    <div class="flex flex-wrap items-bottom w-full items-center justify-between" >
      <div class="header font-bold text-2xl">
        {{ todos.length }} Todos
      </div>
      <div class="new-todo">
        <input placeholder="what's the next task" class="border-gray-400 outline-blue-400 border rounded mr-2 px-2 py-1" type="text"
               v-model="form.todo" @keydown.enter="submit">
        <button class="bg-blue-500 text-white rounded px-2 py-1" @click="submit">Create</button>
      </div>
    </div>
    <br>
    <div class="todos flex flex-wrap flex-col gap-4">
      <div class="todo px-2 py-1 rounded flex gap-2 transition flex items-center" v-for="(item,index) in todos"
           :key="item.id"
           :class="{'bg-gray-200':!item.done,'bg-gray-100':item.done}">
        <div class="id text-gray-500">#{{ index + 1 }}</div>
        <div class="name" v-text="item.name" :class="{'line-through':item.done}"></div>
        <input class="w-5 h-5 rounded ml-auto" @change="toggleDone(item)" type="checkbox" :checked="item.done"/>
        <button @click="deleteTodo(item)"
                class="delete w-5 h-5 bg-red-400 flex justify-center items-center text-lg text-white rounded font-bold">
          X
        </button>
      </div>
    </div>
    <br>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Todos",
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const {data} = await axios.get('/api/todos');
      this.todos = data;
    },
    async submit() {
      const {data, status} = await axios.post('/api/todos', {
        name: this.form.todo,
      })
      this.form.todo = '';
      await this.fetchData();
    },
    async deleteTodo(item) {
      const {data, status} = await axios.delete('/api/todos/' + item.id, {
        name: this.form.todo,
      })
      await this.fetchData();
    },
    async toggleDone(item) {
      const {data, status} = await axios.post('/api/todos/' + item.id + '/toggle')
      await this.fetchData();
    }
  },
  data() {
    return {
      todos: [],
      form: {
        todo: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
