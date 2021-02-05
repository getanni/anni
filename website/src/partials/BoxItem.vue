<template> 
  <v-expansion-panel :class="[ 'item', state ]">
    <v-expansion-panel-header class="name">
      <slot name="name"></slot>
    </v-expansion-panel-header>
    
    <v-expansion-panel-content>
      <v-row v-if="$slots.opts">
        <slot name="opts"></slot>
      </v-row>

      <slot name="text"></slot>

      <div class="box-fabs">
        <!-- Wipe Buttom -->
        <v-dialog persistent v-model="wipe" max-width="300">
          <template v-slot:activator="{ on, attrs }">
            <v-fab-transition>
              <v-btn fab small color="error" 
                style="margin-right: auto"
                v-show="shown" v-on="on" v-bind="attrs">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          <v-card class="confirm">
            <v-card-title>
              Delete "<span class="error--text">{{ wiped }}</span>"?
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="wipe = false">Cancel</v-btn>
              <v-btn text color="error" @click="remove">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Undo Button -->
        <v-fab-transition>
          <v-btn fab small color="accent" 
            @click="$emit('undo')"
            v-show="edits">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-fab-transition>
        <!-- Save Button -->
        <v-fab-transition>
          <v-btn class="save"
            fab color="primary" 
            @click="$emit('save')"
            v-show="edits">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default { 
    name: 'BoxItem',
    props: { 
      edit: Boolean, 
      open: Object, 
      item: Object,
      base: Object,
      save: Array
    },
    data() { return { wipe: false } },
    computed: { 
      wiped() { return this.item ? this.item.name : '' },
      shown() { return this.item && this.open && this.item.name == this.open.name },
      state() { return { save: this.edits && this.shown, mark: this.edits } },
      edits() { 
        if (!this.item || !this.base) return false
        for (let key of this.save) {
          if (key == 'list') {
            let arr1 = JSON.stringify(this.item[key])
            let arr2 = JSON.stringify(this.base[key])
            if (arr1 != arr2) return true
          }
          else if (this.item[key] != this.base[key]) return true
        }
        return false
      }
    },
    methods: {
      remove() {
        this.wipe = false
        this.$emit('wipe', true)
      }
    }
  }
</script>

<style scoped>
  .name { 
    color: #555;
    font-weight: 500;
    font-size: 1.1em;
    padding: 18px 20px;
  }

  .mark .name { color: #6666f7; }
</style>