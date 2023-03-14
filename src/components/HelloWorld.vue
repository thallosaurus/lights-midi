<template>
  <select v-model="selectId">
    <option value="hallo">Hallo</option>
    <option value="welt">Welt</option>
  </select>
  <button type="button" @click="showMsg">Show a messagebox</button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      selectId: ""
    }
  },
  methods: {
    async showMsg() {
      await window.electronAPI.openMsgBox(this.selectId)
    }
  }
}
</script>