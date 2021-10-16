<template>
  <div class="todos">
    <input
      type="text"
      v-model="newTodo"
      @keypress.enter="addTodo"
      placeholder="Add a new todo ..."
    />

    <div v-if="todos.length">
      <ul>
        <li v-for="todo in todos" :key="todo.id" @click="deleteTodo(todo.id)">
          {{ todo.todo }}
        </li>
      </ul>
    </div>
    <div v-else>Woohoo, nothing left todo!</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { DataStore } from '@aws-amplify/datastore'
import { Todo } from '../models'

export default {
  setup(props, { emit }) {
    const todos = ref([])
    const router = useRouter()

    const updateTodoList = async() => {
      todos.value = await DataStore.query(Todo)
    }

    onMounted(async () => {
      updateTodoList()
    })

    const newTodo = ref('')

    const addTodo = async () => {
      if (newTodo.value) {
        await DataStore.save(
          new Todo({
            todo: newTodo.value
          })
        )
        newTodo.value = ''
        updateTodoList()
      } else {
        emit('badValue')
      }
    }

    const deleteTodo = async(id) => {
      if (id) {
        const modelToDelete = await DataStore.query(Todo, id);
        DataStore.delete(modelToDelete);
        updateTodoList()
      }
    }

    return { newTodo, addTodo, todos, deleteTodo }
  }
}
</script>

<style>
.todos {
  max-width: 400px;
  margin: 20px auto;
  position: relative;
}
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.todos ul {
  position: relative;
  padding: 0;
}
.todos li {
  list-style-type: none;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
.todos li:hover {
  cursor: pointer;
}
/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.3s ease;
}
/* switch transitions */
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-active {
  transition: all 0.5s ease;
}
.switch-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}
</style>
