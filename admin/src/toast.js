// Simple toast store/composable for Vue 3
import { reactive } from 'vue'

const state = reactive({
  toasts: [] // { id, type: 'success'|'error'|'info', message, timeout }
})

let idSeq = 1

function push(type, message, opts = {}) {
  const id = idSeq++
  const timeout = opts.timeout ?? (type === 'error' ? 6000 : 3500)
  const t = { id, type, message }
  state.toasts.push(t)
  if (timeout > 0) {
    setTimeout(() => remove(id), timeout)
  }
  return id
}

function remove(id) {
  const i = state.toasts.findIndex(t => t.id === id)
  if (i !== -1) state.toasts.splice(i, 1)
}

export function useToast() {
  return {
    state,
    success: (m, o) => push('success', m, o),
    error: (m, o) => push('error', m, o),
    info: (m, o) => push('info', m, o),
    remove
  }
}
