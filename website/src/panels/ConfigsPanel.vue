<template>
  <v-row v-masonry @click="refresh">
    <box-card v-if="haveConfigs"
      name="Triggers"
      :save="diffTrigger"
      @save="saveConfigs"
      @undo="undoTrigger">
      <template v-slot:help>
        <p>The triggers are how you call commands. Anni has a <strong>prefix</strong> and a <strong>suffix</strong>. As for the prefix, for some bots it's as simple as <kbd>!</kbd> or <kbd>^</kbd>. The default prefix is <kbd>anni.</kbd> which will always work.</p>
        <p><strong>Popular Options:</strong> <kbd>a.</kbd> <kbd>a*</kbd> <kbd>a^</kbd></p>
        <p><strong>Examples:</strong> <kbd>a.profile</kbd> <kbd>a*profile</kbd> <kbd>a^profile</kbd></p>
        <p>The <strong>suffix</strong> is a novelty feature, and allows you to call commands using a suffix such as <kbd>.exe</kbd> or <kbd>.cmd</kbd> - the suffix is disabled by default.</p>
        <p><strong>Examples:</strong> <kbd>profile.exe</kbd> <kbd>profile.cmd</kbd></p>
      </template>
      <template v-slot:opts>
        <v-col cols="6">
          <v-text-field dense outlined required
            :rules="[ $rules.has, $rules.space ]" v-model="prefix" 
            label="Current Prefix" placeholder="anni.">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined 
            :rules="[ $rules.space ]" v-model="suffix" 
            label="Current Suffix" placeholder=".exe, .cmd">
          </v-text-field>
        </v-col>
      </template>
    </box-card>

    <!-- Starboard Settings -->
    <box-card v-if="haveConfigs"
      name="Starboard"
      :save="diffStarred"
      @save="saveConfigs"
      @undo="undoStarred">
      <template v-slot:help>
        <p>You'll need to create a channel (usually called <strong>#starboard</strong>) that only the bot has access to.</p>
        <p>If you need an overview of the starboard, check out the <strong>& More</strong> tab on the <router-link to="/">home page</router-link>.</p>
        <p>For setting the emoji, it's recommended to use the <kbd>anni.emoji</kbd> command in the server for custom emoji support.</p>
      </template>
      <template v-slot:opts>
        <v-col cols="12" sm="8">
          <v-select dense outlined label="Starboard Channel"
            :items="channels" item-text="name" item-value="id" v-model="board">
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field dense outlined type="number"
            v-model="count" label="Reaction Count">
          </v-text-field>
        </v-col>
      </template>
    </box-card>

    <!-- Birthday Settings -->
    <box-card v-if="haveConfigs"
      name="Announcements"
      :save="diffReminds"
      @save="saveConfigs"
      @undo="undoReminds">
      <template v-slot:help>
        <p>Users can add their birthdays to their user profiles. If they have a birthday set, you can send out a reminder 1 week before, and an announcement the day of. You just need to set a channel!</p>
        <p>Message must contain either <kbd>{user}</kbd> or <kbd>{users}</kbd>.<br> (for <em><strong>@user</strong></em> and <em><strong>@user's</strong></em> respectively)</p>
        <p>Can optionally include <strong>{date}</strong> for display the date of the birthday. <em>Useful for the reminder message!</em></p>
      </template>
      <template v-slot:default>
        <v-select dense outlined label="Announcement Channel"
          :items="channels" item-text="name" item-value="id" v-model="birthday">
        </v-select>
        <v-textarea outlined rows="2" :rules="[ $rules.ping ]"
          label="Reminder Message" v-model="reminder">
        </v-textarea>
        <v-textarea outlined rows="2" :rules="[ $rules.ping ]"
          label="Announcement Message" v-model="announce">
        </v-textarea>
      </template>
    </box-card>

    <!-- Mod Roles -->
    <box-card v-if="haveConfigs"
      name="Mod Roles"
      :save="diffEmploys"
      @save="saveConfigs"
      @undo="undoEmploys">
      <template v-slot:help>
        <p>The Mod Roles are roles that Anni should recognize as Mods. This will grant access to the Mod Commands to users with these roles.</p>
        <p>Anni will automatically recognize roles named "Mod" but if your mod role is named "Boss Members", this is where you tell Anni that.</p>
      </template>
      <template v-slot:default>
        <v-select dense outlined label="Add Mod Role" 
          append-outer-icon="mdi-plus-circle" @click:append-outer="_addRole()"
          :items="rolelist" item-text="name" item-value="id" v-model="role">
        </v-select>

        <v-chip v-for="(id, i) in employ" :key="id"
          class="mr-2 mb-2" close @click:close="_remRole(i)">
          {{ roles[id] }}
        </v-chip>
      </template>
    </box-card>

    <!-- Refresh -->
    <box-card v-if="haveConfigs">
      <div class="text-center">
        Channels or roles out of date? <br>
        Run <strong>anni.refresh</strong> in your server.
      </div>
    </box-card>
  </v-row>
</template>

<script>
  export default { 
    name: 'ConfigsPanel',
    props: [ 'user', 'guild' ],
    data() { 
      return { 
        prefix: '', suffix: '', board: '', count: '', role: '',
        birthday: '', reminder: '', announce: '', employ: [],
        configs: {}, channels: [], rolelist: [], roles: {}
      } 
    },
    mounted() { this.renderPanel() },
    watch: {
      user()  { this.renderPanel() },
      guild() { this.renderPanel() }
    },
    computed: { 
      haveConfigs() { return this.configs && !this.configs.empty },
      currConfigs() {
        let configs = { ...this.configs }
        configs.prefix   = this.prefix
        configs.suffix   = this.suffix
        configs.birthday = this.birthday
        configs.reminder = this.reminder
        configs.announce = this.announce
        configs.board    = this.board
        configs.count    = this.count
        configs.employ   = JSON.stringify(this.employ)
        return configs
      },
      diffTrigger() {
        if (this.prefix != this.configs.prefix) return true
        if (this.suffix != this.configs.suffix) return true
        return false
      },
      diffReminds() {
        if (this.birthday != this.configs.birthday) return true
        if (this.reminder != this.configs.reminder) return true
        if (this.announce != this.configs.announce) return true
        return false
      },
      diffStarred() {
        if (this.board != this.configs.board) return true
        if (this.count != this.configs.count) return true
        return false
      },
      diffEmploys() {
        let curr = this.employ
        let base = this.configs.employ

        if (!base) return false
        for (let id of curr) if (base.indexOf(id) < 0) return true
        for (let id of base) if (curr.indexOf(id) < 0) return true
        return false
      }
    },
    methods: {
      refresh() { setTimeout(this.$redrawVueMasonry, 50) },

      _addRole() {
        if (!this.role || this.employ.indexOf(this.role) > -1) return
        this.employ.push(this.role)
        this.role = ''
        this.refresh()
      },
      _remRole(i) {
        this.employ.splice(i, 1)
        this.refresh()
      },

      loadConfigs(configs) {
        configs = this.$nulls(configs)
        configs.employ = configs.employ ? JSON.parse(configs.employ) : []
        if (configs.employ)   this.employ = this.$clone(configs.employ)

        if (configs.opts)     this.loadDetails(configs.opts)
        if (configs.prefix)   this.prefix = configs.prefix
        if (configs.suffix)   this.suffix = configs.suffix
        if (configs.birthday) this.birthday = configs.birthday
        if (configs.announce) this.announce = configs.announce
        if (configs.reminder) this.reminder = configs.reminder
        if (configs.board)    this.board = configs.board
        if (configs.count)    this.count = configs.count
        if (configs.opts)     delete configs.opts
        if (configs)          this.configs = { ...this.configs, ...configs }
      },
      loadDetails(details) {
        if (details.chans) {
          this.channels = [{ id: '', name: 'No Channel' }]
          for (let data of JSON.parse(details.chans)) {
            let chan = data.split(':')
            this.channels.push({ id: chan[0], name: chan[1] })
          }
        }
        if (details.roles) {
          this.roles[0] = 'No Role'
          this.rolelist = [{ id: '', name: 'No Role' }]
          for (let data of JSON.parse(details.roles)) {
            let role = data.split(':')
            this.roles[role[0]] = role[1]
            this.rolelist.push({ id: role[0], name: role[1] })
          }
        }
      },
      undoTrigger() {
        this.prefix = this.configs.prefix
        this.suffix = this.configs.suffix
      },
      undoReminds() {
        this.birthday = this.configs.birthday
        this.reminder = this.configs.reminder
        this.announce = this.configs.announce
      },
      undoStarred() {
        this.board = this.configs.board
        this.count = this.configs.count
      },
      undoEmploys() {
        let employs = this.configs.employ
        this.employ = this.$clone(employs)
      },

      async renderPanel() {
        let data = await this.$getConfigs(this.guild)
        if (data.configs) this.loadConfigs(data.configs)
        this.refresh()
      },
      async saveConfigs() {
        if (this.$rules.bad('has',   this.prefix)) return
        if (this.$rules.bad('space', this.prefix)) return
        if (this.$rules.bad('space', this.suffix)) return
        if (this.$rules.bad('ping',  this.reminder)) return
        if (this.$rules.bad('ping',  this.announce)) return
        let data = await this.$setConfigs(this.guild, this.currConfigs)
        if (data.configs) this.loadConfigs(data.configs)
      }
    }
  }
</script>
