<template>
  <div class="search-container">
    <input v-model="searchQuery" type="text" placeholder="Waiting For Input...">
    <button @click="search">🔍</button>
    <br>
    <input type="radio" v-model="searchType" value="city" checked> City
    <input type="radio" v-model="searchType" value="airport"> Airport
    <input type="radio" v-model="searchType" value="flight"> Flight
  </div>
  <div v-if="rows.length > 0">
    <!-- 展示搜索结果 -->
    <vue-good-table
      :columns="columns"
      :rows="rows"/>
  </div>
  <div v-else>
    <p>No Searching Results</p>
  </div>
</template>

<script>
import axios from 'axios';
import MyTable from './MyTable.vue';
import { VueGoodTable } from 'vue-good-table-next';


export default {
  components: {
    'vuegoodtable': VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: 'City',
          field: 'city',
        },
        {
          label: 'IATA_CODE',
          field: 'IATA_CODE',
          type: 'number',
        },
        // {
        //   label: 'Created On',
        //   field: 'createdAt',
        //   type: 'date',
        //   dateInputFormat: 'yyyy-MM-dd',
        //   dateOutputFormat: 'MMM do yy',
        // },
        // {
        //   label: 'Percent',
        //   field: 'score',
        //   type: 'percentage',
        // },
      ],
      rows: [],
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
        this.rows = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        // 处理错误情况
        this.rows = [];
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
</style>
