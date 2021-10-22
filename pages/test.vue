<template>
<div>
  <div v-for="item in items" :key="item.id">
    <datepicker id="date" class="datepicker" v-model="item.date" :format="DatePickerFormat" :language="ja" @closed='pickerClosedChange' :disabled-dates="disabledDates"/>
  </div>
</div>
</template>
<script>
import {ja} from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import Datepicker from "vuejs-datepicker";

export default ({
  components: {
    Datepicker,
  },
  data(){
    return{
      items: [
        {id: '1', date: '2021-10-31'}
      ],
      DatePickerFormat: 'yyyy/MM/dd',
      ja:ja,
      disabledDates: {
        to: new Date(),
      },
    }
  },
  methods: {
    pickerClosedChange() {
    　if (this.date) {
      　 this.date = moment(this.date).format('YYYY-MM-DD')
    　}
    },
  }
})
</script>
