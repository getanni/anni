<template>
  <v-col cols="12" :md="md" :lg="lg">
    <v-card :class="[ 'box', state ]">

      <!-- Fancy Header Block -->
      <v-list-item two-line v-if="nice">
        <v-list-item-content>
          <div class="overline">{{ lead }}</div>
          <v-list-item-title class="headline">{{ head }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar tile size="70" class="mb-0">
          <v-img src="/icon.png" />
        </v-list-item-avatar>
      </v-list-item>

      <!-- Standard Header: Help, Toggle -->
      <v-card-title v-if="name && !nice" 
        @click="toggle(open)" :style="title">
        
        {{ name }}

        <!-- Help Popup -->
        <v-dialog v-if="$slots.help" v-model="info" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small color="grey">mdi-help-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              {{ name }} Help <v-spacer />
              <v-btn icon @click="info = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <slot name="help"></slot>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-spacer />
        <v-icon v-if="!show">{{ arrow }}</v-icon>
      </v-card-title>

      <!-- General Content -->
      <v-card-text v-show="open && ($slots.default || $slots.opts)">
        <slot></slot>

        <v-row v-if="$slots.opts">
          <slot name="opts"></slot>
        </v-row>
      </v-card-text>

      <!-- Expansion List -->
      <v-expansion-panels accordion flat v-if="$slots.list"
        v-bind:value="value" v-on:change="$emit('input', $event)">
        <slot name="list"></slot>
      </v-expansion-panels>

      <!-- Action Buttons -->
      <div class="box-fabs" v-if="open && (edit || save)">
        <!-- Undo Button -->
        <v-fab-transition>
          <v-btn fab small v-show="open && (edit || save)"
            color="accent" @click="$emit('undo')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-fab-transition>
        <!-- Save Button -->
        <v-fab-transition>
          <v-btn fab v-show="open && save"
            color="primary" @click="$emit('undo')">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </v-card>
  </v-col>
</template>

<script>
  export default { 
    name: 'BoxCard',
    props: {
      name: String,

      nice: Boolean,
      wide: Boolean,
      head: String,
      lead: String,

      hide: Boolean,
      show: Boolean,

      edit: Boolean,
      save: Boolean,

      value: Number
    },
    data() {
      return {
        open: true,
        info: false
      }
    },
    watch:    { hide(val) { this.toggle(!val) } },
    mounted() { this.toggle(this.hide) },
    computed: {
      color() { return this.flat ? 'grey lighten-4' : '' },
      state() { return { edit: this.edit, save: this.save } },
      width() { return this.$slots.list || this.wide || this.nice },
      arrow() { return `mdi-chevron-${this.open ? 'up' : 'down' }` },
      title() { return { cursor: this.show ? 'initial' : 'pointer' } },

      md() { return this.width ? '8' : '6' },
      lg() { return this.width ? '6' : '4' },
    },
    methods:  { toggle(val) { if (!this.show) this.open = !val } }
  }
</script>

<style>
  #anni .box kbd {
    color: #6666f7; 
    padding: 0 10px;
    border: 1px solid;
    display: inline-block;
    background: transparent;
  }
  #anni .cmds kbd { 
    margin: 0 10px 10px 0; 
  }
  .cmds em { display: block; }
  .cmds h3 { margin-bottom: 5px; }
  .cmds h3:not(:first-of-type), .cmds em { margin-top: 15px; }

  .box .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }

  #anni .box.save,
  #anni .box .item.save {
    border-top: 3px solid #6666f7;
    border-bottom: 3px solid #6666f7;
  }
  #anni .box.edit:not(.save),
  #anni .box .item.edit:not(.save) {
    border-top: 3px solid #cd81fd;
    border-bottom: 3px solid #cd81fd;
  }
  #anni .box.edit, #anni .box .item.edit, 
  #anni .box.save, #anni .box .item.save { margin-bottom: 40px; }


  .box-fabs {
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
  .box-fabs .v-btn { margin-left: 10px; }
  .box .item:not(:last-of-type) { border-bottom: 1px solid #ddd; }
  .v-expansion-panel .box-fabs { 
    position: initial; 
    margin-left: -6px; padding: 0;
  }
</style>