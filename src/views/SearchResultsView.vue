<template>
  <div>
    <HeaderSection />
    <main id="main" class="container">
      <div class="main__h">
        <h2>검색 결과</h2>
      </div>
      <div v-if="searchResults.length" class="view__inner" role="main">
        <MovieList :movies="searchResults" />
      </div>
      <div v-else class="view__inner" role="main">
        <p>검색 결과가 없습니다.</p>
      </div>
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import MovieList from '@/components/MovieList.vue'

const searchResults = ref([])
const route = useRoute()

const fetchSearchResults = async () => {
  const apikey = import.meta.env.VITE_API_KEY
  const query = route.query.q

  if (!query) return

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apikey}`
    )
    searchResults.value = response.data.results
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSearchResults()
})
</script>
