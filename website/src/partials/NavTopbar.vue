<template>
  <v-app-bar color="white" clipped-left elevate-on-scroll app>
    <v-app-bar-nav-icon @click="$emit('open')"></v-app-bar-nav-icon>

    <router-link to="/">
      <img src="@/assets/icon.png" alt="anni" id="logo">
    </router-link>

    <v-toolbar-title>
      <strong>Anni.{{ $route.name }}</strong>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-show="!$vuetify.breakpoint.xs">
      <v-btn text to="/docs">
        <v-icon color="grey" left>mdi-help-circle</v-icon>
        Docs
      </v-btn>

      <v-btn text to="/dash">
        <v-icon color="grey" left>mdi-cog</v-icon>
        Dash
      </v-btn>

      <!-- <v-menu offset-x>
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
          <v-subheader>VOTE 4 ANNI</v-subheader>
          <v-list-item :href="$urlVotes1">
            <v-list-item-title>Top.gg</v-list-item-title>
          </v-list-item>
          <v-list-item :href="$urlVotes2">
            <v-list-item-title>BotsForDiscord</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </div>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon :href="$urlInvite" target="_blank">
          <v-icon color="primary">mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <span>Invite Anni</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
  export default { name: 'NavTopbar' }
</script>