<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

// Compute todos sorted by creation time
const todos_asc = computed(() => {
    return [...todos.value].sort((a, b) => a.createdAt - b.createdAt)
})

// Watchers to persist data in localStorage
watch(name, (newVal) => {
    localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
}, {
    deep: true
})

// Function to add a new todo
const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
        return
    }

    todos.value.push({
        content: input_content.value,
        category: input_category.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
    })

    input_content.value = ''
    input_category.value = null
}

// Function to remove a todo
const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo)
}

// Function to toggle edit mode
const editTodo = (todo) => {
    todo.editable = !todo.editable
}


// Initialize data from localStorage
onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
    <main class="app">
        <section class="greeting">
            <h5 class="input-instruction">Aici poți schimba numele</h5>
            <h2 class="title">
                Salut! <input type="text" id="name" placeholder="Name here" v-model="name">
            </h2>
            
                <!-- Butonul de setări -->
            <button @click="$router.push('/settings')" class="settings-button">
                Setari
            </button>
        </section>




        <section class="create-todo">
            <h3>CREATI TODO</h3>

            <form id="new-todo-form" @submit.prevent="addTodo">
                <h4>Ce ai azi de facut ?!</h4>
                <input type="text" name="content" id="content" placeholder="de ex. Learn Vue.js"
                    v-model="input_content" />

                <h3>Alege categoria</h3>
                <div class="options">
                    <input type="radio" name="category" id="category1" value="business" v-model="input_category" />
                    <label for="category1">
                        <span class="bubble business"></span>
                        <div>Business</div>
                    </label>

                    <input type="radio" name="category" id="category2" value="personal" v-model="input_category" />
                    <label for="category2">
                        <span class="bubble personal"></span>
                        <div>Personal</div>
                    </label>

                    <input type="radio" name="category" id="category3" value="school" v-model="input_category" />
                    <label for="category3">
                        <span class="bubble school"></span>
                        <div>School</div>
                    </label>

                    <input type="radio" name="category" id="category4" value="work" v-model="input_category" />
                    <label for="category4">
                        <span class="bubble work"></span>
                        <div>Work</div>
                    </label>

                    <input type="radio" name="category" id="category5" value="money" v-model="input_category" />
                    <label for="category5">
                        <span class="bubble money"></span>
                        <div>Money</div>
                    </label>

                    <input type="radio" name="category" id="category6" value="store" v-model="input_category" />
                    <label for="category6">
                        <span class="bubble store"></span>
                        <div>Store</div>
                    </label>
                </div>

                <input type="submit" value="Add todo" />
            </form>
        </section>

        <section class="todo-list">
            <h3>TODO LIST</h3>
            <div class="list" id="todo-list">
                <div v-for="todo in todos_asc" :key="todo.createdAt" :class="`todo-item ${todo.done ? 'done' : ''}`">
                    <label>
                        <input type="checkbox" v-model="todo.done" />
                        <span :class="`bubble ${todo.category}`"></span>
                    </label>

                    <div class="todo-content">
                        <input type="text" v-model="todo.content" :disabled="!todo.editable" v-if="todo.editable" />
                        <span v-else>{{ todo.content }}</span>
                    </div>

                    <div class="actions">
                        <button class="delete" @click="removeTodo(todo)">Delete</button>
                        <button class="edit" @click="editTodo(todo)">{{ todo.editable ? 'Save' : 'Edit' }}</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
