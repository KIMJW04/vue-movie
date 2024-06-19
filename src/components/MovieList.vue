<template>
  <section class="movie__view">
    <div class="view__inner">
      <div class="view__card style1">
        <ul>
          <li v-for="movie in movies" :key="movie.id">
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
              :alt="movie.title"
            />
            <img v-else src="../assets/img/no-poster.jpg" :alt="movie.title" />
            <div class="overlay"></div>
            <div class="icons">
              <v-icon name="fa-play-circle" scale="2.5" @click="fetchVideo(movie.id)"></v-icon>
              <v-icon name="fa-info-circle" scale="2.5" @click="goToDetail(movie.id)"></v-icon>
            </div>
            <div class="view__info">
              <div class="title">{{ movie.title }}</div>
              <div class="average">
                <div class="stars">
                  <i
                    v-for="n in 5"
                    :key="n"
                    class="fa-star"
                    :class="getStarClass(movie.vote_average, n)"
                  ></i>
                  <em>{{ movie.vote_average.toFixed(1) }}</em>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <iframe :src="modalVideoUrl" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  movies: {
    type: Array,
    required: true
  }
})

const showModal = ref(false)
const modalVideoUrl = ref('')
const router = useRouter()
const apiKey = import.meta.env.VITE_API_KEY

const getStarClass = (rating, index) => {
  const starValue = index * 2
  if (rating >= starValue) {
    return 'fas filled'
  } else if (rating >= starValue - 1) {
    return 'fas fa-star-half-alt'
  } else {
    return 'far'
  }
}

const fetchVideo = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    )
    const videos = response.data.results
    const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube')
    if (trailer) {
      modalVideoUrl.value = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
      showModal.value = true
      document.body.style.overflow = 'hidden' // 모달 창이 열리면 스크롤 비활성화
    } else {
      alert('트레일러를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error(error)
    alert('비디오를 불러오는 중 오류가 발생했습니다.')
  }
}

const closeModal = () => {
  showModal.value = false
  modalVideoUrl.value = ''
  document.body.style.overflow = '' // 모달 창이 닫히면 스크롤 활성화
}

const goToDetail = (id) => {
  router.push({ name: 'detail', params: { movieID: id } })
}
</script>
