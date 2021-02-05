<template>
  <v-app id="anni" :class="{ mobile }">

    <v-app-bar id="head" app clipped-left elevate-on-scroll>
      <v-app-bar-nav-icon @click="open = !open" />
      
      <router-link to="/">
        <img src="@/assets/icon.png" alt="anni" id="logo">
      </router-link>

      <div v-if="!$vuetify.breakpoint.xs">
        <v-btn text to="/docs">Docs</v-btn>
        <v-btn text to="/dash">Dash</v-btn>
      </div>

      <v-spacer />
      
      <!-- Vote Menu -->
      <v-menu offset-y>
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
          <v-subheader class="vote">Vote For Anni</v-subheader>
          <v-list-item :href="$urlVotes1" target="_blank">
            <v-list-item-title class="vote red--text">
              Anni on Top.gg
            </v-list-item-title>
          </v-list-item>
          <!-- <v-list-item :href="$urlVotes2" target="_blank">
            <v-list-item-title>BotsForDiscord</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>

      <!-- Invite Button -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon :href="$urlInvite" target="_blank">
            <v-icon color="primary">mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <span>Invite Anni</span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer id="side" clipped app 
      temporary :value="open" @input="open = $event">
      
      <side-nav />
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <v-container fluid id="wrap">
        <router-view></router-view>

        <footer class="grey--text">
          Found A Bug? Got A Suggestion? Mention it in the 
          <a :href="$urlServer" class="grey--text" target="_blank">
            <strong>Support Server.</strong>
          </a>
        </footer>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
  import SideNav from '@/partials/SideNav.vue'

  export default {
    data() { return { open: false } },
    methods: { toggle(open) { this.open = open } },
    computed: { 
      mobile() { return this.$vuetify.breakpoint.smAndDown },
    },
    components: { SideNav }
  }
</script>

<style>
  #wrap { padding: 0 20px; }
  #logo { height: 30px; margin: 7px 10px 0; }

  #anni .vote {
    font-size: 0.8em;
    font-weight: 900;
    text-transform: uppercase;
  }

  #anni:not(.mobile) #sidebar {
    padding: 0 0 0 10px;
    position: fixed; width: 150px; 
    top: 64px; left: 0; bottom: 0;
  }
  #anni:not(.mobile) #content { 
    min-height: 230px;
    padding-left: 150px; 
  }

  #anni .v-tabs-items,
  #anni .v-tabs > .v-tabs-bar { background: transparent; }
  #anni .v-tabs .v-tab { 
    padding-left: 25px;
  }
  #anni .v-tabs .v-subheader { margin-top: 10px; }
  #anni .v-window-item .row { margin-left: -10px; margin-right: -10px; }
  #anni .v-tabs .v-tab, 
  #anni .v-tabs .v-subheader { 
    height: 30px;
    text-transform: none;
    justify-content: start;
    letter-spacing: initial;
  }
  #anni .v-tabs .v-tab strong, 
  #anni .v-tabs .v-subheader strong { 
    max-width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  footer {
    padding: 15px 0;
    margin: 60px -20px 0;
    font-size: 0.8rem;
    text-align: center;
  }
</style>