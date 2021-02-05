<template> 
  <div class="box-wrap">
    <div id="sidebar">
      <v-tabs vertical v-model="tab">
        <slot name="sidebar"></slot>
      </v-tabs>
    </div>
    <div id="content">
      <v-tabs-items v-model="tab">
        <slot name="content"></slot>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
  export default { name: 'BoxWrap', data() { return { tab: 0 } } }
</script>