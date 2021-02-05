import axios from 'axios'

import docs from '@/anni.json'
import conf from '../../../configs.json'

import BoxWrap from '@/partials/BoxWrap.vue'
import BoxCard from '@/partials/BoxCard.vue'
import BoxItem from '@/partials/BoxItem.vue'

export default {
  install(Vue) {

    // add externals
    Vue.prototype.axios = axios

    // add global data / variables
    Vue.prototype.$cmdDocs   = docs.commands
    Vue.prototype.$apiOrigin = conf.origin_api
    Vue.prototype.$urlGoGold = conf.URLs.patreon
    Vue.prototype.$urlGithub = conf.URLs.github
    Vue.prototype.$urlTrello = conf.URLs.trello
    Vue.prototype.$urlInvite = conf.URLs.invite
    Vue.prototype.$urlServer = conf.URLs.server
    Vue.prototype.$urlLogins = conf.URLs.login
    Vue.prototype.$urlVotes1 = conf.URLs.vote1
    Vue.prototype.$urlVotes2 = conf.URLs.vote2

    // add global components
    Vue.component('box-wrap', BoxWrap)
    Vue.component('box-card', BoxCard)
    Vue.component('box-item', BoxItem)
    
    // add timezone index
    Vue.prototype.$zones = [
      { text: 'No Timezone', value: '' },
      { text: 'Pago Pago (GMT-11:00)', value: 'Pacific/Pago_Pago' },
      { text: 'Hawaii Time (GMT-10:00)', value: 'Pacific/Honolulu' },
      { text: 'Tahiti (GMT-10:00)', value: 'Pacific/Tahiti' },
      { text: 'Alaska Time (GMT-09:00)', value: 'America/Anchorage' },
      { text: 'Pacific Time - LA (GMT-08:00)', value: 'America/Los_Angeles' },
      { text: 'Mountain Time - Denver (GMT-07:00)', value: 'America/Denver' },
      { text: 'Central Time - Chicago (GMT-06:00)', value: 'America/Chicago' },
      { text: 'Eastern Time - NY (GMT-05:00)', value: 'America/New_York' },
      { text: 'Atlantic Time - Halifax (GMT-04:00)', value: 'America/Halifax' },
      { text: 'Buenos Aires (GMT-03:00)', value: 'America/Argentina/Buenos_Aires' },
      { text: 'Sao Paulo (GMT-02:00)', value: 'America/Sao_Paulo' },
      { text: 'Azores (GMT-01:00)', value: 'Atlantic/Azores' },
      { text: 'London (GMT+00:00)', value: 'Europe/London' },
      { text: 'Berlin (GMT+01:00)', value: 'Europe/Berlin' },
      { text: 'Helsinki (GMT+02:00)', value: 'Europe/Helsinki' },
      { text: 'Istanbul (GMT+03:00)', value: 'Europe/Istanbul' },
      { text: 'Dubai (GMT+04:00)', value: 'Asia/Dubai' },
      { text: 'Kabul (GMT+04:30)', value: 'Asia/Kabul' },
      { text: 'Maldives (GMT+05:00)', value: 'Indian/Maldives' },
      { text: 'India Standard Time (GMT+05:30)', value: 'Asia/Calcutta' },
      { text: 'Kathmandu (GMT+05:45)', value: 'Asia/Kathmandu' },
      { text: 'Dhaka (GMT+06:00)', value: 'Asia/Dhaka' },
      { text: 'Cocos (GMT+06:30)', value: 'Indian/Cocos' },
      { text: 'Bangkok (GMT+07:00)', value: 'Asia/Bangkok' },
      { text: 'Hong Kong (GMT+08:00)', value: 'Asia/Hong_Kong' },
      { text: 'Pyongyang (GMT+08:30)', value: 'Asia/Pyongyang' },
      { text: 'Tokyo (GMT+09:00)', value: 'Asia/Tokyo' },
      { text: 'Central - Darwin (GMT+09:30)', value: 'Australia/Darwin' },
      { text: 'Eastern - Brisbane (GMT+10:00)', value: 'Australia/Brisbane' },
      { text: 'Central - Adelaide (GMT+10:30)', value: 'Australia/Adelaide' },
      { text: 'Eastern - Sydney, Melbourne (GMT+11:00)', value: 'Australia/Sydney' },
      { text: 'Nauru (GMT+12:00)', value: 'Pacific/Nauru' },
      { text: 'Auckland (GMT+13:00)', value: 'Pacific/Auckland' },
      { text: 'Kiritimati (GMT+14:00)', value: 'Pacific/Kiritimati' }
    ]
  }
}