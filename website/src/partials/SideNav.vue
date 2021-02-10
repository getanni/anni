<template>
  <v-list dense @close="close">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Anni</v-list-item-title>
        <v-list-item-subtitle>The Profile Bot</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar>
        <img src="/icon.png" id="avatar">
      </v-list-item-avatar>
    </v-list-item>

    <v-divider />

    <v-list-item to="/docs" @click="close">
      <v-list-item-icon><v-icon>mdi-help-circle</v-icon></v-list-item-icon>
      <v-list-item-title>Help Docs</v-list-item-title>
    </v-list-item>

    <v-list-item to="/dash" @click="close">
      <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
      <v-list-item-title>Dashboard</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list-item :href="$urlInvite" target="_blank" @click="close">
      <v-list-item-icon>
        <v-icon color="primary">mdi-plus-circle</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Invite Anni</v-list-item-title>
    </v-list-item>

    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-icon>
          <v-icon color="red">mdi-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Vote 4 Anni</v-list-item-title>
      </template>

      <v-list-item :href="$urlVotes1" target="_blank">
        <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
        <v-list-item-title>Anni On Top.gg</v-list-item-title>
      </v-list-item>

      <!-- <v-list-item :href="$urlVotes2" target="_blank">
        <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
        <v-list-item-title>BotsForDiscord</v-list-item-title>
      </v-list-item> -->
    </v-list-group>

    <!-- <v-list-item :href="$urlGoGold" target="_blank">
      <v-list-item-icon>
        <v-icon color="orange">mdi-patreon</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Get Premium</v-list-item-title>
    </v-list-item> -->

    <v-divider />

    <v-list-item :href="$urlServer" target="_blank">
      <v-list-item-icon><v-icon>mdi-discord</v-icon></v-list-item-icon>
      <v-list-item-title>Support Server</v-list-item-title>
    </v-list-item>

    <v-list-item :href="$urlTrello" target="_blank">
      <v-list-item-icon><v-icon>mdi-trello</v-icon></v-list-item-icon>
      <v-list-item-title>What's Next?</v-list-item-title>
    </v-list-item>

    <v-list-item :href="$urlGithub" target="_blank">
      <v-list-item-icon><v-icon>mdi-github</v-icon></v-list-item-icon>
      <v-list-item-title>On Github</v-list-item-title>
    </v-list-item>

  </v-list>
</template>

<script>
  export default { 
    name: 'SideNav', props: { mobile: Boolean },
    methods: { close() { this.$emit('input', true) } }
  }
</script>

<style scoped>
  .v-divider { margin: 10px 0; }
</style>