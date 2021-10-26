<template>
　<div id="app">
　　<ul v-for="member of limitCount" :key="member.name">
　　　<li>{{ member.name }}：{{ member.age}}
　　　</li>
　　</ul>
　</div>
</template>

<script>
　export default {
　　data: function() {
　　　return {
　　　　members: [
　　　　　{ name: '山田', age: '34歳' },
　　　　　{ name: '田中', age: '45歳' }, 
　　　　　{ name: '中村', age: '29歳' },
　　　　　{ name: '村井', age: '38歳' },
　　　　　{ name: '井上', age: '28歳' },
　　　　　{ name: '上野', age: '33歳' }
　　　　]
　　　}
　　},
　　computed: {
　　　limitCount() {
　　　　return this.members.slice(0,4)
　　　}
　　}
　}
</script>
