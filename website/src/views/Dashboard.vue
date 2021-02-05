<template>
  <box-wrap>
    <template v-slot:sidebar>
      <v-img :src="avatar" width="50" class="mx-auto" />
      <v-subheader class="grey--text">
        <strong>{{ authed || 'Logged Out' }}</strong>
      </v-subheader>
      
      <v-tab v-if="!token" key="getauth">Discord Login</v-tab>
      <v-tab v-if="authed" key="profile">Profile</v-tab>

      <v-menu offset-x v-if="list.length">
        <template v-slot:activator="{ on, attrs }">
          <v-subheader v-bind="attrs" v-on="on" class="grey--text">
            <strong>{{ server }}</strong>
          </v-subheader>
        </template>
        <v-list>
          <v-list-item v-for="(g, i) in list" :key="i" @click="setGuild(g)">
            <v-list-item-title>{{ g.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tab v-if="config" key="configs">Configs</v-tab>
      <v-tab v-if="config" key="actions">Actions</v-tab>
      <v-tab v-if="config" key="options">Options</v-tab>
    </template>

    <template v-slot:content>
      <!-- Server Switch -->
      <div class="switch panel" v-if="list.length">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text v-bind="attrs" v-on="on" class="toggle">
              {{ `Current Server: ${server}` }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(g, i) in list" :key="i" @click="setGuild(g)">
              <v-list-item-title>{{ g.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-tab-item v-if="authed" key="profile">
        <profile-panel :user="user" :guild="guild" :anni="bot" />
      </v-tab-item>
      
      <v-tab-item v-if="config" key="configs">
        <configs-panel :user="user" :guild="guild" :anni="bot" />
      </v-tab-item>
      
      <v-tab-item v-if="config" key="actions">
        <actions-panel :user="user" :guild="guild" :anni="bot" />
      </v-tab-item>
      
      <v-tab-item v-if="config" key="options">
        <options-panel :user="user" :guild="guild" :anni="bot" />
      </v-tab-item>

      <!-- Login -->
      <v-tab-item v-if="nouser" key="getauth">
        <v-row>
          <box-card nice lead="Login With Discord" head="Who Even Are You?">
            <p>The <strong>Dashboard</strong> makes working with Anni a little bit easier. You can update your profile, change your server settings, and manage options and actions all from the web.</p>
            <v-btn block outlined color="primary" :href="$urlLogins">
              Continue With Discord
            </v-btn>
          </box-card>
        </v-row>
      </v-tab-item>
      <!-- Loading -->
      <box-card nice v-if="token && !user"
       lead="Fetching Your Data" head="Please Wait A Moment">
        <v-progress-linear indeterminate color="primary" />
      </box-card>
      <!-- Invite -->
      <box-card nice v-if="user && guild && guild.name && !bot"
        lead="Nothing Found Here" head="I Don't Think I'm In Here.">
        <p v-if="guild.admin">
          <strong>Invite Anni to {{ guild.name }}</strong> to enjoy all of Anni's features. You can make <strong>custom profiles</strong>, that track <strong>birthdays</strong>, local user <strong>timezones</strong>, and (if you use the included <strong>starboard</strong>, combined <strong>starboard statistics</strong>. 
          <br><br>
          Not to mention the <strong>actions</strong> and other features!
        </p>
        <p v-if="!guild.admin">
          You're not an admin so you can't invite Anni to this server. Maybe mention all of the features <em>(maybe link them to this site!)</em> to an admin. You never know, you could get lucky and they'll invite <strong>Anni</strong> to <strong>{{ guild.name }}</strong>.
        </p>
      </box-card>
    </template>
  </box-wrap>
</template>

<script>
  import ProfilePanel from '@/panels/ProfilePanel.vue'
  import ConfigsPanel from '@/panels/ConfigsPanel.vue'
  import ActionsPanel from '@/panels/ActionsPanel.vue'
  import OptionsPanel from '@/panels/OptionsPanel.vue'

  export default {
    components: { ProfilePanel, ConfigsPanel, ActionsPanel, OptionsPanel },
    data() {
      return { token: 0, user: 0, guild: 0, icon: 0, list: [], tab: 0, bot: 0 }
    },
    computed: {
      isauth() { return this.token && this.user },
      logged() { return this.token && !this.user },
      nouser() { return !this.token && !this.user },
      avatar() { return this.icon || 'https://i.imgur.com/ZOKp8LH.png' },
      server() { return this.guild ? this.guild.name : 'Select Server' },
      config() { return this.guild ? this.guild.admin && this.bot : false },
      authed() {
        if (!this.isauth) return false
        else return `${this.user.username}#${this.user.discriminator}`
      }
    },
    methods: { 
      setGuild(g) { 
        this.guild = g
        localStorage.guild = g.id
        this.loadAnni()
      },
      async loadAnni() {
        let data = await this.$getConfigs(this.guild)
        let conf = data.configs
        this.bot = conf && !conf.error && !conf.empty
      }
    },
    async mounted() {
      this.token = localStorage.token; 
      let auth = await this.$Auth()
      if (auth) for (let prop in auth) this[prop] = auth[prop]
      await this.loadAnni()
    }
  }
</script>

<style scoped>
  #sidebar .header { 
    margin-top: -5px;
    font-weight: bold;
    justify-content: center;
  }
  #sidebar .mx-auto { border-radius: 100%; }
</style>