<template>
  <section class="todo-container">
    <h1 class="heading">todo app</h1>
    <div class="inner-todo-container">
      <div class="inputContainer">
        <input v-model="taskValue" type="text" placeholder="Enter your task" class="main-input" />
        <button @click="addTask()" class="addBtn">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <Tasks @tasks-updated="updateTasks" :tasks="allTodos" @edit-task="editTask" @delete-task="deleteTask" />
      <div class="task-status-wrapper">
        <span class="task-status">
          {{ allTodos.filter((task) => task.checked == true).length }} out of
          {{ allTodos.length }} tasks completed
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import Tasks from "./components/Tasks.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  computed: mapGetters(["allTodos"]),
  components: {
    Tasks,
  },
  data() {
    return {
      taskValue: "",
      tasks: [],
      shouldBeEdited: false,
      taskToBeEditedId: null,
      noOfCompletedTasks: 0,
    };
  },
  methods: {
    ...mapActions([
      "addTodo",
      "updateTodos",
      "deleteTodos",
      "updateCompletionStatus",
    ]),
    addTask() {
      if (!this.taskValue) {
        return;
      } else {
        if (this.shouldBeEdited) {
          this.updateTodos({
            id: this.taskToBeEditedId,
            taskValue: this.taskValue,
          });
          this.shouldBeEdited = false;
          this.taskToBeEditedId = null;
        } else {
          const newTask = {
            id: Math.random().toFixed(4),
            taskValue: this.taskValue,
            checked: false,
          };
          this.addTodo(newTask);
        }
        this.taskValue = "";
      }
    },

    //function that deletes any selected task
    deleteTask(id) {
      this.deleteTodos(id);
    },

    //function that replaces the input value with the value of the selected task
    editTask(id, value) {
      this.taskValue = value;
      this.shouldBeEdited = true;
      this.taskToBeEditedId = id;
    },

    //function that updates the todoList array in vuex with latest completion status
    updateTasks(updatedTasks) {
      this.updateCompletionStatus(updatedTasks);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  background: #e3e9ff;
  font-family: "Open Sans", sans-serif;
}

.todo-container {
  padding-block: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.todo-container .heading {
  text-transform: uppercase;
  font-size: 3rem;
  color: #757575;
  font-weight: bold;
}

.todo-container .inner-todo-container {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 2rem;
  width: 400px;
  background: #af7eeb;
  padding-top: 2rem;
  padding-bottom: 4rem;
  padding-inline: 3rem;
  color: white;
}

.todo-container .inner-todo-container .task-status-wrapper {
  position: absolute;
  text-align: center;
  left: 0;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.todo-container .inner-todo-container .task-status-wrapper .task-status {
  font-size: 1.3rem;
}

.todo-container .inner-todo-container .inputContainer {
  width: 100%;
  background: white;
  color: black;
  display: flex;
  align-items: center;
  height: 40px;
  padding-inline: 1rem;
}

.todo-container .inner-todo-container .inputContainer .main-input {
  padding: 0.2rem;
  width: 94%;
  height: 100%;
  border: none;
  outline: none;
}

.todo-container .inner-todo-container .inputContainer .addBtn {
  border: none;
  background: #c8abfd;
  color: white;
  font-weight: bold;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
}

@media(max-width:430px) {
  .todo-container .inner-todo-container {
    width: 350px;
    padding-top: 1rem;
    padding-bottom: 4.5rem;
    padding-inline: 1.5rem;
  }
}


@media(max-width:350px) {
  .todo-container .inner-todo-container {
    width: 260px;
    padding-top: 1rem;
    padding-bottom: 6rem;
    padding-inline: 1.5rem;
  }
}
</style>
