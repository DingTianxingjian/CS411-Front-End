<template>
  <div class="search-container">
    <input v-model="searchQuery" type="text" placeholder="Waiting For Input...">
    <button @click="search">🔍</button>
    <br>
    <input type="radio" v-model="searchType" value="city" checked> City
    <input type="radio" v-model="searchType" value="airport"> Airport
    <input type="radio" v-model="searchType" value="flight"> Flight
  </div>
  <div v-if="searchResults.length > 0">
    <!-- 展示搜索结果 -->
    <table v-if="searchResults.length > 0">
      <my-table :data="searchResults"></my-table>
    </table>
  </div>
  <div v-else>
    <p>No Searching Results</p>
  </div>
</template>

<script>
import axios from 'axios';
import MyTable from './MyTable.vue';

export default {
  components: {
    'my-table': MyTable
  },
  data() {
    return {
      searchQuery: '',
      searchType: 'city',
      searchResults: [],
    };
  },
  methods: {
    async search() {
    let baseUrl = 'http://localhost:3000'; 
    let url = `${baseUrl}/delay-history/`;
    switch(this.searchType) {
      case 'city':
        url += `city/${this.searchQuery}`;
        break;
      case 'airport':
        url += `airport/${this.searchQuery}`;
        break;
      case 'flight':
        // 假设searchQuery是 '航空公司代码-航班号'
        const [airline_IATA, number] = this.searchQuery.split('-');
        url += `flight/${airline_IATA}/${number}`;
        break;
    }

      try {
        console.log("URL requested:", url);
        const response = await axios.get(url);
        
        console.log("Response received:", response);
        this.searchResults = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        // 处理错误情况
        this.searchResults = [];
      }
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
}

.search-container {
  position: absolute;
  top: 25%; /* 页面上方 1/4 的位置 */
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

input[type="text"] {
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 60px;
  background-color: #4CAF50;
  color: white;
  padding: 12px 12px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3a366f;
}

input[type="radio"] {
  margin: 0 10px;
}
button.search-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
}

button.search-button:hover {
  color: #3b6d96;
}

.search-container {
  text-align: center;
  margin-bottom: 100px; /* 添加一些空间在搜索框和表格之间 */
}

table {

  margin: 0 auto; /* 实现表格居中 */
  max-width: 600px; /* 根据需要调整表格宽度 */
  border-collapse: collapse; /* 折叠边框以使其更加紧凑 */
}

.table-container {
  position: relative; /* 或 absolute, 根据需要 */
  top: 100px; /* 调整以满足你的需求 */
}


table, th, td {
  border: 1px solid black; /* 添加边框 */
}

th, td {
  padding: 8px; /* 添加一些填充使表格更易读 */
  text-align: left; /* 文本对齐 */
}
</style>
