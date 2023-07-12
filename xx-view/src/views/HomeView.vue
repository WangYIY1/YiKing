<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import axios from 'axios';

const state = reactive({ count: 0 });
const index = reactive({ data: '' })
const home = reactive({ data: {} })
const getIndex = (params: object) => {
  return axios.get('/admin', {
    params,
  });
}
const getCount = () => {
  return axios.get('/admin/count');
}

const getHome = (data: object) => {
  return axios.post('/admin/list', data);
}

onMounted(() => {
  getIndex({
    title: '你好',
  }).then(res => {
    index.data = res.data;
  })
  getCount().then(res => {
    state.count = res.data.count;
  })
})

function increment(){
  state.count ++;
  getHome({
    page: '1',
    size: '10',
    count: state.count,
  }).then(res => {
    home.data = res.data;
  })
}

</script>

<template>
  <button @click="increment">点击</button>
  <main>
    <div v-html="index.data"></div>
    <div>{{ state.count }}</div>
  </main>
</template>
