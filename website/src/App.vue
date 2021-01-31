<template>
  <v-app>
    <nav-drawer :open="open" @input="toggle" />
    <nav-topbar @open="open = !open" />

    <v-main id="anni" :class="{ mobile: $vuetify.breakpoint.xs }">
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
  import NavTopbar from '@/partials/NavTopbar.vue'
  import NavDrawer from '@/partials/NavDrawer.vue'

  export default { 
    data() { return { open: false } },
    methods: { toggle(open) { this.open = open } },
    components: { NavTopbar, NavDrawer }
  }
</script>

<style>
  #anni { padding: 64px 0!important; }
  #logo { height: 30px; margin: 7px 10px 0 15px; }
  #home { height: 25px; margin: 0 30px 0 0; }
  .anni, .v-btn.anni { color: #6666f7; }
  h3 {
    color: #888;
    font-size: 1rem;
    letter-spacing: .0125em;
    margin: 30px 0 10px 19px;
    text-transform: uppercase;
  }
  
  #anni:not(.mobile) #sidebar {
    position: fixed;
    top: 64px; left: 0; bottom: 0;
    width: 200px; padding-top: 10px;
  }
  #anni:not(.mobile) #content { padding-left: 200px; }
  #anni.mobile #content { padding: 50px 0; }

  #sidebar .v-subheader { margin: 5px 0; }
  #sidebar .v-subheader,
  #sidebar .v-tab { height: 30px; }
  #sidebar .v-tab {
    padding-left: 25px;
    text-transform: none;
    letter-spacing: 0.02em;
    justify-content: left;
  }

  .panel { 
    width: 100%;
    max-width: 600px;
    margin-right: 20px;
    position: relative;
    display: inline-block; 
  }
  .panel .v-card { 
    position: relative;
    margin-top: 5px !important;
    margin-left: 5px !important;
    margin-right: 5px !important;
    margin-bottom: 20px !important;
  }
  .panel .diff {
    border-top: 3px solid #6666f7 !important;
    border-bottom: 3px solid #6666f7 !important;
  }
  .panel .edit:not(.diff) {
    border-top: 3px solid #cd81fd !important;
    border-bottom: 3px solid #cd81fd !important;
  }
  .panel .edit, .panel .diff { margin-bottom: 40px !important; }
  .panel .v-card:not(.diff):not(:.edit) { margin-bottom: 20px !important; }

  .item-fabs {
    left: 0px;
    right: 0px;
    bottom: -28px;
    height: 56px;
    z-index: 12;
    position: absolute;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end
  }
  .item-fabs .v-btn { margin-left: 10px; }

  #anni kbd { color: #6666f7; border: 1px solid #6666f7; background: transparent; }
  #anni kbd + kbd { margin-left: 10px; }
  #anni p > kbd { margin: 5px 0!important; }
</style>