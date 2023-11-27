<template>
    <table>
      <thead>
        <tr>
          <th>城市</th>
          <th>IATA 代码</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.IATA_CODE">
          <td>{{ item.city }}</td>
          <td>{{ item.IATA_CODE }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: ['data']
  };
  </script>
  
  <style>
  /* 你的 CSS 样式 */
  </style>
  