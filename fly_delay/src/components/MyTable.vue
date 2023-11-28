<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field" @click="sortBy(column.field)">
            {{ column.label }}
            <span v-if="sortKey === column.field">{{ sortOrder }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.IATA_CODE">
          <td>{{ item.city }}</td>
          <td>{{ item.IATA_CODE }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button v-for="page in pageCount" :key="page" @click="currentPage = page">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    rowsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      sortKey: '',
      sortOrder: 'asc',
      columns: [
        { label: "城市", field: "city" },
        { label: "IATA 代码", field: "IATA_CODE" }
      ]
    };
  },
  computed: {
    sortedData() {
      return [...this.data].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        } else {
          return a[this.sortKey] < b[this.sortKey] ? 1 : -1;
        }
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.sortedData.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.data.length / this.rowsPerPage);
    }
  },
  methods: {
    sortBy(sortKey) {
      if (this.sortKey === sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = sortKey;
        this.sortOrder = 'asc';
      }
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  cursor: pointer;
}

/* 样式，用于突出显示当前排序列和方向 */
th.active-asc::after {
  content: '▲';
}

th.active-desc::after {
  content: '▼';
}

</style>
