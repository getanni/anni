<template>
  <v-app-bar color="white" clipped-left elevate-on-scroll app>
    <v-app-bar-nav-icon @click="$emit('open')"></v-app-bar-nav-icon>

    <router-link to="/">
      <img src="@/assets/icon.png" alt="anni" id="logo">
    </router-link>

    <div v-if="!$vuetify.breakpoint.xs">
      <v-btn text to="/docs">Docs</v-btn>
      <v-btn text to="/dash">Dash</v-btn>
    </div>

    <v-spacer />

    <!-- Vote Menu -->
    <!-- <v-menu offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
              <v-icon color="red">mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Vote 4 Anni</span>
        </v-tooltip>
      </template>
      <v-list subheader>
        <v-subheader>Voting For Anni</v-subheader>
        <v-list-item :href="$urlVotes1">
          <v-list-item-title>Top.gg</v-list-item-title>
        </v-list-item>
        <v-list-item :href="$urlVotes2">
          <v-list-item-title>BotsForDiscord</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->

    <!-- Invite Button -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon :href="$urlInvite" target="_blank">
          <v-icon color="primary">mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <span>Invite Anni</span>
    </v-tooltip>

    <!-- More Menu -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list subheader>
        <v-subheader>Find Out More</v-subheader>

        <v-list-item :href="$urlTrello" target="_blank">
          <v-list-item-title>What's Next?</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-trello</v-icon></v-list-item-icon>
        </v-list-item>

        <v-list-item :href="$urlGithub" target="_blank">
          <v-list-item-title>On Github</v-list-item-title>
          <v-list-item-icon><v-icon>mdi-github</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
  export default { name: 'NavTopbar' }
</script>

<style scoped>
  #logo { height: 30px; margin: 7px 10px 0 15px; }
</style>