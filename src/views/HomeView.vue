<template>
  <HeaderSection @search="updateSearchResults" @resetFilters="resetFilters" />
  <main id="main" class="container" role="main">
    <div class="main__h">
      <div class="left">
        <h2>{{ title }}</h2>
      </div>
      <div class="right">
        <GenreAndDateSelector @update="handleUpdate" ref="genreDateSelector" />
      </div>
    </div>
    <div v-if="searchResults.length" class="view__inner">
      <MovieList :movies="searchResults" />
    </div>
    <div v-else class="view__inner">
      <MovieFetcher />
    </div>
  </main>
  <ScrollTop />
  <FooterSection />
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import MovieFetcher from '@/components/MovieFetcher.vue'
import ScrollTop from '@/components/ScrollTop.vue'
import MovieList from '@/components/MovieList.vue'
import GenreAndDateSelector from '@/components/GenreAndDateSelector.vue'

const searchResults = ref([])
const title = ref('최신영화')
const genreDateSelector = ref(null)
const router = useRouter()

const apiKey = import.meta.env.VITE_API_KEY

const updateSearchResults = (results) => {
  searchResults.value = results
  title.value = results.length ? '검색 결과' : '최신영화'
}

const handleUpdate = async ({ genre, date }) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
  if (genre) {
    url += `&with_genres=${genre}`
  }
  if (date) {
    url += `&primary_release_date.gte=${date}&primary_release_date.lte=${date}`
  }
  try {
    const response = await axios.get(url)
    updateSearchResults(response.data.results)
  } catch (error) {
    console.error(error)
  }
}

const resetFilters = () => {
  genreDateSelector.value.reset()
  searchResults.value = []
  title.value = '최신영화'
}
</script>
