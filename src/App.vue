<template>
  <div id="test-app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="main">
      <button @click="get">Load articles</button>
      <div v-if="loading">Loading...</div>
      <table v-else>
        <tbody>
          <tr v-for="(article, index) in articlesToShow" :key="index">
            <div v-html="article.innerHTML" class="content"></div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const parser = new DOMParser();

export default {
  name: "App",
  data() {
    return {
      allArticles: [],
      loading: false
    };
  },
  computed: {
    articlesToShow() {
      return this.allArticles.slice(0, 306);
    }
  },
  methods: {
    async get() {
      this.loading = true;
      try {
        for (let i = 1; i < 5; i++) {
          const response = await axios.get(
            `http://localhost:4000/topnews?page=${i}`
          );
          const document = parser.parseFromString(response.data, "text/html");
          const rows = document
            .querySelectorAll("table")[2]
            .querySelectorAll("tr");
          this.allArticles.push(...Array.from(rows));
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.content {
  display: flex;
}

table {
  margin: auto;
}

.morelink {
  display: none;
}

.subline {
  color: transparent;
}

.subline > * {
  display: none;
}

.age {
  display: inline-flex;
}

.age::before {
  content: "Date: ";
  color: black;
}

a {
  color: #105d3a;
}

#test-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
