<template>
  <box-wrap>
    <template v-slot:sidebar>
      <v-subheader><strong>Guides</strong></v-subheader>
      <v-tab key="user">Profiles</v-tab>
      <v-tab key="server">Options</v-tab>
      <v-tab key="actions">Actions</v-tab>
      <v-tab key="starboard">Starboard</v-tab>
      <v-subheader><strong>Commands</strong></v-subheader>
      <v-tab key="cmd_users">For Users</v-tab>
      <v-tab key="cmd_mods">For Mods</v-tab>
      <v-tab key="cmd_admin">For Admins</v-tab>
    </template>

    <template v-slot:content>
      <v-tab-item key="user">
        <v-row v-masonry>
          <box-card show name="User Profiles">
            <p>The <strong>User Profile</strong> is attached to you, the user. It's independent from any server you may be in, and it keeps track of your <strong>birthday</strong>, local <strong>timezones</strong>, and <strong>starboard</strong> statistics.</p>

            <p>Since your profile is attached to you and not your server, these options will be available on your profile for every server you are in with Anni. After setting up a profile, it will be hidden in every other Anni server by default. Your profile must be activated on a per-server basis.</p>

            <div class="cmds">
              <h3>View Commands</h3>
              <kbd>anni.me</kbd>
              <kbd>anni.p</kbd>
              <kbd>anni.p user</kbd>

              <h3>Setup Commands</h3>
              <kbd>anni.p setup</kbd>
              <kbd>anni.p hide</kbd>
              <kbd>anni.p show</kbd>
            </div>
          </box-card>
          <box-card show name="Birthdays & Timezones">
            <p>Setting your <strong>birthday</strong> is helpful, as Anni will send out birthday reminders a week before, and announcements day of! Setting your birth year is optional, but doing so will display your age on your profile.</p>

            <p><strong>Timezones</strong> let you set your local time on your profile. That way people can see what time it is for you by viewing your profile, as well as anyone else in the server with <kbd>anni.time</kbd>.</p>

            <div class="cmds">
              <h3>Setting Your Birthday</h3>
              <kbd>anni.birthday 03/21</kbd>
              <kbd>anni.birthday 03/21/2000</kbd>

              <h3>Setting Your Timezone</h3>
              <kbd>anni.timezone chicago</kbd>
              <kbd>anni.timezone new york</kbd>
              <kbd>anni.timezone sydney</kbd>

              <h3>Checking Times</h3>
              <kbd>anni.time</kbd>
              <kbd>anni.time 9pm</kbd>
              <kbd>anni.profile user</kbd>
            </div>
          </box-card>
          <box-card show name="Birthday Reminders">
            <p>Setting up the reminders and birthdays are easy. By default is turned off, but can be enabled by an admin. All you need to do is set a channel, and Anni will start automatically sending out the reminders and announcements for any user in the server with a birthday on their active profile.</p>

            <div class="cmds">
              <h3>Setting The Channel</h3>
              <kbd>anni.channel #general-chat</kbd>

              <h3>Change The Reminder</h3>
              <kbd>anni.reminder Hey {user}, your birthday is coming up on {date}!</kbd>
              
              <h3>Change The Announcement</h3>
              <kbd>anni.announce Hey! It's {users} birthday today!</kbd>
              
              <em>The reminder and announcement message must include either <strong>{user}</strong> (replaced with <strong>@User</strong>) or <strong>{users}</strong> (replaced with <strong>@User's</strong>). It can also include <strong>{date}</strong> for the date of the birthday.</em>
            </div>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="server">
        <v-row v-masonry>
          <box-card show name="Server Profiles">
            <p>
              The <strong>User Profile</strong> can be expanded with custom options in a per-server basis. Each server can add their own custom profile fields that their members can then fill out using the standard <kbd>anni.profile setup</kbd> command. Unlike the birthday, timezone, and starboard stats, these options are only visible inside the server they are set on.
            </p>
          </box-card>
          <box-card show name="Managing Options">
            <p>Admins can add profile options to their custom server profiles. All options are text based, which means you set the label, description, and tag, and then when a user sets up a profile in your server, they populate it with their own text data.</p>

            <p>An Option consits of a tag (an identifier, used for setting the option and editing/removing it), a Label (what actually shows up on the profile), and a description. (Useful for when you're looking up your options, and displayed when users set their commands. Separate the label and description from the tag using <kbd>-</kbd>.</p>

            <div class="cmds">
              <h3>Creating A New Option</h3>
              <kbd>anni.option new tag -Tag -Introduction</kbd>

              <h3>Editing An Option</h3>
              <kbd>anni.option set tag -My Tagline -A Brief Intro</kbd>
              
              <h3>Removing An Option</h3>
              <kbd>anni.option rem tag</kbd>
              <em>Note: deleting a profile option will remove the option from every profile in the guild.</em>
            </div>
          </box-card>
          <box-card show name="Setting Custom Options">
            <p>Once a profile option has been created, when you run <kbd>anni.profile setup</kbd> in the server, Anni will DM you instructions for setting up your profile, including a list of all the available profile fields, their descriptions, and the command to set the data.</p>

            <div class="cmds">
              <h3>Setting A Profile Option</h3>
              <kbd>anni.set tag I'm here to chew bubblegum.</kbd>
              <em>This command assumes the above option has been created.</em>
            </div>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="actions">
        <v-row v-masonry>
          <box-card show name="Using Actions">
            <p>
              Using <strong>actions</strong>, you can create your own custom call and response commands. Some people use these for <strong>rules command</strong> or an <strong>info command</strong>. It also supports a randomized image response, which makes it great for custom <strong>roleplay</strong> commands.
            </p>
          </box-card>
          <box-card show name="Basic Actions">
            <p>Creating a basic action - such as for the <strong>rules</strong> or <strong>info</strong> command is relatively easy in command form. Since <strong>anni.action</strong> is a lot to type out, we'll use the shorthand <strong>anni.ac</strong> instead. When you create an action, the tag you use becomes the command. To use the example below, we would call the command with <strong>anni.welcome</strong>.</p>

            <div class="cmds">
              <h3>Creating An Action</h3>
              <kbd>anni.ac new welcome Welcome to our server!</kbd>
              
              <h3>Editing An Action</h3>
              <kbd>anni.ac edit welcome Welcome! Read the #rules!</kbd>
              
              <h3>Deleting An Action</h3>
              <kbd>anni.ac delete welcome</kbd>
            </div>
          </box-card>
          <box-card show name="Advanced Actions">
            <p>If you want to make an action that has a bit more of a <strong>roleplay</strong> aspect to it <em>(such as anni.hug)</em>, then adding image responses is the way to go. You can add more than one, and when someone fires the action it will pick one at random.</p>

            <div class="cmds">
              <h3>Create An Action</h3>
              <kbd>anni.ac new hugs *{user} hugs {msg}*</kbd>
              <em>You can include <strong>{user}</strong> to ping the user who typed the command, and you can include <strong>{msg}</strong> to include the message typed after the command. At this point, if a user uses <strong>anni.hugs</strong>, Anni returns with <strong>@User hugs</strong>, and if the user uses <strong>anni.hugs @user v hard</strong> Anni returns with <strong>@User hugs @user v hard</strong>.</em>

              <h3>Adding / Removing Images</h3>
              <kbd>anni.ac add hugs https://i.imgur.com/r9aU2xv.gif</kbd>
              <kbd>anni.ac remove hugs https://i.imgur.com/r9aU2xv.gif</kbd>
              <em>Animated images must be a <strong>.gif</strong> for now, until I can make it easy to embed <strong>.gifv</strong> or <strong>.mp4</strong></em>
            </div>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="starboard">
        <v-row v-masonry>
          <box-card show name="The Starboard">
            <p>Like many other bots, Anni can manage a <strong>starboard</strong> for your server. If you've never encountered one before, it's essentially a <strong>Hall of Fame Channel</strong> for messages in your server. When someone says something the server enjoys and they want to "frame" it, they <strong>react to it with a star</strong>. Once a certain number of reactions get reached, the message gets posted in the starboard channel.</p>
            
            <p>When a user gets a starred post, Anni keeps track on their user profile of how many posts they have starred, and how many stars they've received across all posts. These stats are cumulative, across all servers the user is in with Anni's starboard enabled.</p>
          </box-card>
          <box-card show name="Starboard Setup">
            <p>You will need to create a channel for the starboard, and make sure that <strong>only Anni</strong> has permissions to send messages in the channel!</p>

            <div class="cmds">
              <h3>Setting The Channel</h3>
              <kbd>anni.board #starboard</kbd>
              
              <h3>Changing The Emoji to React With</h3>
              <kbd>anni.emoji :heart:</kbd>
              
              <h3>Changing The Reactions Needed</h3>
              <kbd>anni.amount 4</kbd>
            </div>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="cmd_users">
        <v-row>
          <box-card show v-model="cmd1" name="User Commands">
            <template v-slot:list>
              <box-item v-for="doc in $cmdDocs.user" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </box-item>
            </template>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="cmd_mods">
        <v-row>
          <box-card show v-model="cmd2" name="Mod Commands">
            <template v-slot:list>
              <box-item v-for="doc in $cmdDocs.mods" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </box-item>
            </template>
          </box-card>
        </v-row>
      </v-tab-item>
      
      <v-tab-item key="cmd_admin">
        <v-row>
          <box-card show v-model="cmd3" name="Admin Commands">
            <template v-slot:list>
              <box-item v-for="doc in $cmdDocs.admin" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </box-item>
            </template>
          </box-card>
        </v-row>
      </v-tab-item>
    </template>
  </box-wrap>
</template>

<script>
  export default { data() { return { cmd1: -1, cmd2: -1, cmd3: -1 } } }
</script>