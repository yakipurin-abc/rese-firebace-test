import Vue from 'vue'
import moment from 'moment'

Vue.filter('format-date', function (value) {
  const date = moment(value);
  return date.format("YYYY.MM.DD(ddd)");
})

Vue.filter('format-time', function (value) {
  const time = moment(value);
  return time.format("HH.MM");
})
