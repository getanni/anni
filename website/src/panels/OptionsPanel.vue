<template>
  <div class="panel">
    <box-card show
      :name="`${guild.name} Options`"
      v-if="options.length" v-model="pane">
      <template v-slot:list>
        <box-item
          v-for="(option, i) in options" :key="i"
          :item="option"
          :base="archive[i]"
          :open="options[pane]"
          :save="['tag', 'name', 'desc']"
          @save="saveOptions"
          @undo="undoOptions"
          @wipe="wipeOptions">
          <template v-slot:name>{{ archive[i].name }}</template>
          <template v-slot:opts>
            <v-col cols="12" sm="4">
              <v-text-field dense outlined label="Trigger" placeholder="about"
                v-model="option.tag" :rules="[ $rules.space, _oldTag ]">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field dense outlined label="Name" 
                placeholder="About Me" v-model="option.name">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field dense outlined label="Description"
                placeholder="A quick summary of you!" v-model="option.desc">
              </v-text-field>
            </v-col>
          </template>
        </box-item>
      </template>
    </box-card>

    <box-card wide :hide="!hide"
      name="Create A New Option"
      :edit="editCreated"
      :save="diffCreated"
      @save="saveCreated"
      @undo="undoCreated">
      <template v-slot:help>
        <p>
          Use this tool to add and manage profile options in your server. The <strong>Trigger</strong> is what they'll use to set it on their profile, the <strong>Name</strong> is the label that shows up on the profile, and the <strong>Description</strong> shows up to help out during setup. If you want more details on Profile Options, check out the <router-link to="/docs"><strong>docs</strong></router-link>.
        </p>
      </template>
      <template v-slot:opts>
        <v-col cols="12" sm="4">
          <v-text-field dense outlined label="Trigger" placeholder="about"
            v-model="tag" :rules="[ $rules.space, _newTag ]">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field dense outlined label="Name" 
            placeholder="About Me" v-model="name">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field dense outlined label="Description"
            placeholder="A quick summary of you!" v-model="desc">
          </v-text-field>
        </v-col>
      </template>
    </box-card>
  </div>
</template>

<script>
  export default {
    name: 'OptionsPanel',
    props: [ 'user', 'guild', 'anni' ],
    data() {
      return {
        tag: '', name: '', desc: '',
        archive: [], options: [], hide: true, pane: -1
      }
    },
    mounted() { this.renderPanel() },
    watch: {
      user()  { this.renderPanel() },
      guild() { this.renderPanel() }
    },
    computed: {
      editCreated() { 
        if (this.tag || this.name || this.desc) return true
        return false
      },
      diffCreated() { 
        if (this.tag && this.name) return true
        return false
      },
      currCreated() {
        return {
          tag: this.tag,
          name: this.name,
          desc: this.desc,
          guild: this.guild.id,
          user: '@everyone',
        }
      }
    },
    methods: {
      _newTag(name) {
        name = name ? name.toLowerCase() : ''
        return this.$checkName(name, this.archive, 'tag')
      },
      _oldTag(name) {
        name = name ? name.toLowerCase() : ''
        let curr = this.archive[this.pane]
        if (!curr || curr.name == name) return true
        return this.$checkName(name, this.archive, 'tag')
      },

      loadOptions(options) {
        if (options.empty) return

        this.options = this.$clone(options)
        this.archive = this.$clone(options)
      },
      undoCreated() {
        this.tag = ''
        this.name = ''
        this.desc = ''
      },
      undoOptions() {
        let base = this.archive[this.pane]
        this.options.splice(this.pane, 1, this.$clone(base))
      },

      async renderPanel() {
        let data = await this.$getOptions(this.guild)
        if (data.options) this.loadOptions(data.options)
      },
      async saveCreated() {
        if (typeof this._newTag(this.tag) === 'string') return
        let create = await this.$newOptions(this.guild, this.currCreated)
        let option = create.options
        this.options.push(this.$clone(option))
        this.archive.push(this.$clone(option))
        this.pane = this.options.length - 1
        this.hide = false
        this.undoCreated()
      },
      async saveOptions() {
        let option = this.$clone(this.options[this.pane])
        if (typeof this._oldTag(option.tag) === 'string') return
        let update = await this.$setOptions(this.guild, option)
        if (!update) return alert('Error Updating Option')
        this.archive.splice(this.pane, 1, this.$clone(option))
      },
      async wipeOptions() {
        let remove = await this.$remOptions(this.guild, this.options[this.pane])
        if (!remove) return alert('Error Removing Option')
        this.options.splice(this.pane, 1)
        this.archive.splice(this.pane, 1)
        this.pane = -1
      }
    }
  }
</script>