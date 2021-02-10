<template>
  <v-row>
    <v-col cols="12" md="8" offset-md="2">
      <v-row class="splash">
        <v-col cols="12" md="6" align-self="center">
          <h1>Say Hello To Anni.</h1>
          <h2>The Profile Bot For Discord.</h2>
          <p>Track birthdays and timezones, combined starboard stats, and any custom profile field you want to set!</p>
          <v-btn :href="$urlInvite" target="_blank" color="primary">
            Invite Anni To Your Server
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" align-self="center" 
          v-if="$vuetify.breakpoint.mdAndUp">
          <img src="/icon.png" class="avatar">
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch">
        <box-card show name="Birthday Reminders">
          Anni remembers birthdays, and can send out messages on the day of, and/or reminders a week in advance!
        </box-card>
        <box-card show name="Local Timezones">
          With timezone tracking, Anni can tell you what time it is locally for another user, or for all users in a server!
        </box-card>
        <box-card show name="Server Profiles">
          Each server can configure Anni with custom profile fields for their users to fill out and attach their profile!
        </box-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
  .avatar { width: 75%; max-width: 300px; }

  .mobile .splash { text-align: center; }
  .splash h2 { margin: -10px 0 10px; }

  #anni:not(.mobile) .avatar { float: right; }
</style>