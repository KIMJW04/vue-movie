<template>
  <MovieList :movies="latestMovies" />
  <button class="more" @click="fetchMoreMovies">더보기</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MovieList from '@/components/MovieList.vue'

const latestMovies = ref([])
const page = ref(1)
const apikey = import.meta.env.VITE_API_KEY
console.log('API Key:', import.meta.env.VITE_API_KEY)

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page.value}`
    )
    latestMovies.value.push(...response.data.results)
  } catch (error) {
    console.log(error)
  }
}

const fetchMoreMovies = async () => {
  page.value++
  await fetchMovies()
}

onMounted(fetchMovies)
</script>
