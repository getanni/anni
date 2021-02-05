<template>
  <div class="panel">
    <box-card show
      :name="`${guild.name} Actions`"
      v-if="actions.length" v-model="pane">
      <template v-slot:list>
        <box-item 
          v-for="(action, i) in actions" :key="i"
          :item="action" 
          :base="archive[i]"
          :open="actions[pane]"
          :save="['name', 'text', 'list']"
          @save="saveActions"
          @undo="undoActions"
          @wipe="wipeActions">
          <template v-slot:name>{{ archive[i].name }}</template>
          <template v-slot:opts>
            <v-col cols="12" sm="4">
              <v-text-field dense outlined
                prefix="anni." placeholder="hug" label="Trigger"
                v-model="action.name" :rules="[ $rules.space, _oldName ]">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field dense outlined label="Response"
                placeholder="*{user} hugs {msg}*" v-model="action.text">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field dense outlined label="Image Response Link"
                placeholder="https://i.imgur.com/r9aU2xv.gif" v-model="href"
                :rules="[ $rules.url ]" append-outer-icon="mdi-plus-circle"
                @click:append-outer="_addImg()">
              </v-text-field>

              Image Responses
              <v-list flat dense subheader>
                <v-list-item v-if="!action.list.length">Nothing Yet</v-list-item>
                <v-list-item v-for="(url, i) in action.list" :key="i">
                  <a :href="url" target="_blank">{{ url }}</a>
                  <v-list-item-action @click="action.list.splice(i, 1)">
                    <v-btn icon x0small><v-icon>mdi-delete</v-icon></v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-col>
          </template>
        </box-item>
      </template>
    </box-card>

    <box-card wide :hide="!hide"
      name="Create A New Action"
      :edit="editCreated"
      :save="diffCreated"
      @save="saveCreated"
      @undo="undoCreated">
      <template v-slot:help>
        <p>Use this tool to quickly add Actions to the server. The <strong>name</strong> can't be any of the command names currently in use. If you want more details on Actions, check out the <router-link to="/docs"><strong>docs</strong></router-link>.</p>
        <p>Image Responses must be a direct link to a file <em>(ends with .png or .gif)</em> in order for the preview to render properly.</p>
      </template>
      <template v-slot:opts>
        <v-col cols="12" sm="4">
          <v-text-field dense outlined 
            prefix="anni." placeholder="hug" label="Trigger"
            v-model="name" :rules="[ $rules.space, _newName ]">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field dense outlined label="Response"
            placeholder="*{user} hugs {msg}*" v-model="text">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field dense outlined append-outer-icon="mdi-plus-circle"
            v-model="link" :rules="[ $rules.url ]" label="Image Response Link"
            placeholder="https://i.imgur.com/r9aU2xv.gif"
            @click:append-outer="_newImg()">
          </v-text-field>

          Image Responses
          <v-list flat dense subheader>
            <v-list-item v-if="!list.length">No Responses Yet</v-list-item>
            <v-list-item v-for="(url, i) in list" :key="i">
              <a :href="url" target="_blank">{{ url }}</a>
              <v-list-item-action @click="list.splice(i, 1)">
                <v-btn icon x-small><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </template>
    </box-card>
  </div>
</template>

<script>
  export default { 
    name: 'ActionsPanel',
    props: [ 'user', 'guild' ],
    data() { 
      return {
        name: '', text: '', list: [], link: '', href: '',
        archive: [], actions: [], hide: true, pane: -1
      } 
    },
    mounted()   { this.renderPanel() },
    watch: {
      user()    { this.renderPanel() },
      guild()   { this.renderPanel() },
    },
    computed: {
      editCreated() { 
        if (this.name || this.text) return true
        if (this.desc || this.list.length) return true
        return false
      },
      diffCreated() { 
        if (this.name && this.text) return true
        return false
      },
      currCreated() {
        return { 
          text: this.text,
          name: this.name.toLowerCase(),
          list: JSON.stringify(this.list)
        }
      },
    },
    methods: {
      _newName(name) {
        name = name ? name.toLowerCase() : ''
        return this.$checkName(name, this.archive, 'name', true)
      },
      _oldName(name) {
        name = name ? name.toLowerCase() : ''
        let curr = this.archive[this.pane]
        if (!curr || curr.name == name) return true
        return this.$checkName(name, this.archive, 'name', true)
      },
      _newImg() {
        if (this.$rules.bad('url', this.link)) return
        this.list.push(this.link); this.link = ''
      },
      _addImg() {
        if (this.$rules.bad('url', this.href)) return
        let curr = this.actions[this.pane]
        curr.list = curr.list || []
        curr.list.push(this.href); this.href = ''
      },

      loadActions(actions) {
        if (actions.empty) return

        let parsed = []; for (let a of actions) {
          if (a.list) a.list = JSON.parse(a.list)
          parsed.push(a)
        }

        this.actions = this.$clone(parsed)
        this.archive = this.$clone(parsed)
      },
      undoCreated() {
        this.name = ''
        this.text = ''
        this.link = ''
        this.list = []
      },
      undoActions() {
        let base = this.archive[this.pane]
        this.actions.splice(this.pane, 1, this.$clone(base))
      },

      async renderPanel() {
        let data = await this.$getActions(this.guild)
        if (data.actions) this.loadActions(data.actions)
      },
      async saveCreated() {
        if (typeof this._newName(this.name) === 'string') return
        let create = await this.$newActions(this.guild, this.currCreated)
        let action = create.actions
        action.list = JSON.parse(action.list)
        this.actions.push(this.$clone(action))
        this.archive.push(this.$clone(action))
        this.pane = this.actions.length - 1
        this.hide = false
        this.undoCreated()
      },
      async saveActions() {
        let action = this.$clone(this.actions[this.pane])
        if (typeof this._oldName(action.name) === 'string') return
        let update = await this.$setActions(this.guild, action)
        if (!update) return alert('Error Updating Action')
        this.archive.splice(this.pane, 1, this.$clone(action))
      },
      async wipeActions() { 
        let remove = await this.$remActions(this.guild, this.actions[this.pane])
        if (!remove) return alert('Error Removing Action')
        this.actions.splice(this.pane, 1)
        this.archive.splice(this.pane, 1)
        this.pane = -1
      }
    }
  }
</script>
