<template>
  <div class="home">
    <transition 
      name="toast"
      enter-active-class="animate__animated animate__swing"
      leave-to-class="animate__animated animate__fadeOutDown"
      leave-active-class="animate__animated animate__flip"
      >
      <Toast v-if="showToast" />
    </transition>
    <Todos @badValue="triggerToast" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Toast from '../components/Toast'
import Todos from '../components/Todos'

export default {
  components: {
    Toast,
    Todos,
  },
  setup() {
    const showToast = ref(false)

    const triggerToast = () => {
      showToast.value = true
      setTimeout(() => (showToast.value = false), 3000)
    }

    return { showToast, triggerToast }
  },
}
</script>
