<template>
  <v-menu ref="menu" v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="day"
    transition="scale-transition"
    min-width="290px" offset-y>

    <template v-slot:activator="{ on, attrs }">
      <div :class="{ hideyear: !year }">
        <v-text-field dense readonly outlined
          :label="label" append-icon="mdi-calendar"
          v-model="day" v-bind="attrs" v-on="on"
        ></v-text-field>
      </div>
    </template>
    <div :class="{ hideyear: !year }">
      <v-date-picker v-model="day" no-title scrollable
        @change="$emit('input', $event)">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(day)">OK</v-btn>
      </v-date-picker>
    </div>
  </v-menu>
</template>

<script>
  export default {
    name: 'BoxDate',
    props: [ 'value', 'label', 'year' ],
    data() { return { menu: false, day: '' } },
    watch: { value() { this.day = this.value } }
  }
</script>

<style>
  .hideyear input { text-indent: -4.5ch; }
  .hideyear .v-date-picker-header__value button { text-indent: 4ch; }
  .hideyear .v-date-picker-header__value button:after {
    content: '';
    height: 100%;
    width: 4ch;
    margin-left: -4ch;
    position: absolute;
    background: #fff;
  }
</style>