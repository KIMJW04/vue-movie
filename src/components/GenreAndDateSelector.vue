<template>
  <div class="genre-date-selector">
    <select v-model="selectedGenre" @change="updateSelection" class="sel">
      <option value="">장르 선택</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
    <input type="date" v-model="selectedDate" @change="updateSelection" />
    <button @click="searchMovies">검색</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const emits = defineEmits(['update'])

const apiKey = import.meta.env.VITE_API_KEY

const genres = ref([])
const selectedGenre = ref('')
const selectedDate = ref('')

const fetchGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ko-KR`
    )
    genres.value = response.data.genres
  } catch (error) {
    console.error(error)
  }
}

const updateSelection = () => {
  emits('update', { genre: selectedGenre.value, date: selectedDate.value })
}

const reset = () => {
  selectedGenre.value = ''
  selectedDate.value = ''
}

onMounted(fetchGenres)

defineExpose({ reset })
</script>

<style scoped lang="scss">
.genre-date-selector {
  display: flex;
  gap: 10px;
  align-items: center;

  select,
  input[type='date'] {
    padding: 5px;
    height: 28px;
    font-size: 16px;
    font-family: 'nanumSquareNeo';
    border-radius: 3px;
  }
  input[type='date'] {
    width: 150px;
  }

  button {
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    height: 28px;
    border-radius: 3px;
    font-family: 'nanumSquareNeo';
  }
}
</style>
