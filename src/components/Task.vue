<template>
  <div class="task-wrapper">
    <p class="task">{{ task.taskValue }}</p>
    <div class="icon-pack">
      <button
        class="editBtn"
        @click="$emit('edit-task', task.id, task.taskValue)"
      >
        <i class="fas fa-pen"></i>
      </button>
      <input
        type="checkbox"
        class="i-check"
        v-model="isChecked"
        @change="handleCheckbox"
      />
      <button class="deleteBtn" @click="$emit('delete-task', task.id)">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  data() {
    return {
      isChecked: this.task.checked,
    };
  },
  methods: {

    //function that updates checkbox state when it is triggered
    handleCheckbox() {
      if (!this.task.checked) {
        this.task.checked = true;
      }
      this.$emit("checkbox-updated", {
        taskId: this.task.id,
        isChecked: this.isChecked,
      });
    },
  },
};
</script>

<style>
.task-wrapper {
  width: 100%;
  background: white;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-wrapper .icon-pack {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.task-wrapper .task {
  font-size: 1.6rem;
  color: #757575;
}

.task-wrapper .icon-pack .i-check {
  cursor: pointer;
}

.editBtn,
.deleteBtn {
  background: #c8abfd;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  padding: 0.4rem 0.5rem;
  font-size: 1.2rem;
}
</style>
