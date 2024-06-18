<template>
  <div class="detail-view">
    <div class="header">
      <h1>{{ movie.title }}</h1>
      <router-link to="/">뒤로가기</router-link>
    </div>
    <div class="overview">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title" />
      <div class="info">
        <p class="desc">{{ movie.overview }}</p>
        <p><strong>개봉일:</strong> {{ movie.release_date }}</p>
        <p><strong>평점:</strong>
          <div class="average">
            <div class="stars">
              <i
                v-for="n in 5"
                :key="n"
                class="fa-star"
                :class="getStarClass(movie.vote_average, n)"
              ></i>
              <em v-if="movie.vote_average">{{ movie.vote_average.toFixed(1) }}</em>
              <em v-else>평점 없음</em>
            </div>
          </div>
        </p>
        <p><strong>상영 시간:</strong> {{ movie.runtime }} 분</p>
        <p>
          <strong>장르:</strong>
          <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</span>
        </p>
        <button v-if="trailerUrl" @click="showTrailerModal">예고편</button>
      </div>
    </div>
    <div class="details">
      <h2>배우 & 제작진</h2>
      <div class="slider">
        <button class="prev" v-if="canSlidePrev" @click="slidePrev">&lt;</button>
        <ul class="cast-list">
          <li v-for="member in combinedList" :key="member.id">
            <img
              :src="'https://image.tmdb.org/t/p/w200/' + member.profile_path"
              :alt="member.name"
              v-if="member.profile_path"
            />
            <div class="cast-info">
              <p>{{ member.name }}</p>
              <span>{{ member.job || member.character }}</span>
            </div>
          </li>
        </ul>
        <button class="next" v-if="canSlideNext" @click="slideNext">&gt;</button>
      </div>
    </div>
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <iframe :src="modalVideoUrl" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movie = ref({})
const casts = ref([])
const directors = ref([])
const trailerUrl = ref('')
const showModal = ref(false)
const modalVideoUrl = ref('')

onMounted(async () => {
  const movieID = route.params.movieID
  const apiKey = import.meta.env.VITE_API_KEY

  try {
    // Fetch movie details
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=ko-KR`
    )
    movie.value = movieResponse.data

    // Fetch movie credits
    const creditsResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}&language=ko-KR`
    )
    casts.value = creditsResponse.data.cast.slice(0, 10) // Show top 10 cast members
    directors.value = creditsResponse.data.crew.filter((member) => member.job === 'Director')

    // Fetch movie videos
    const videosResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=ko-KR`
    )
    const trailer = videosResponse.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    )
    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}`
    } else {
      console.log('No trailer found')
    }
  } catch (error) {
    console.error(error)
  }
})

const combinedList = computed(() => {
  return [...directors.value, ...casts.value]
})

const showTrailerModal = () => {
  if (trailerUrl.value) {
    modalVideoUrl.value = `${trailerUrl.value}?autoplay=1&mute=1`
    showModal.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  showModal.value = false
  modalVideoUrl.value = ''
  document.body.style.overflow = ''
}

const canSlidePrev = computed(() => {
  const list = document.querySelector('.cast-list')
  return list && list.scrollLeft > 0
})

const canSlideNext = computed(() => {
  const list = document.querySelector('.cast-list')
  return (
    list &&
    list.scrollWidth > list.clientWidth &&
    list.scrollLeft < list.scrollWidth - list.clientWidth
  )
})

const slidePrev = () => {
  const list = document.querySelector('.cast-list')
  list.scrollBy({ left: -200, behavior: 'smooth' })
}

const slideNext = () => {
  const list = document.querySelector('.cast-list')
  list.scrollBy({ left: 200, behavior: 'smooth' })
}

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
</script>

<style scoped lang="scss">
.detail-view {
  height: 100vh;
  color: var(--white);
  padding: 20px;
  margin: auto;
  font-family: 'nanumSquareNeo';
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      background-color: #282626;
      padding: 5px 20px;
      border-radius: 50px;
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0;
    }

    a {
      text-decoration: none;
      color: #007bff;
      font-size: 1rem;
    }
  }

  .overview {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    img {
      width: 200px;
      height: auto;
      border-radius: 8px;
      margin-right: 20px;
    }

    .info {
      flex: 1;
      .desc {
        width: 50%;
      }
      p {
        margin: 10px 0;
        font-size: 1rem;
        line-height: 1.5;
      }

      span {
        margin-right: 10px;
      }

      .average {
        display: flex;
        align-items: center;
        .stars {
          display: flex;
          align-items: center;
          i {
            margin-right: 5px;
          }
          .filled {
            color: #ffcc00;
          }
          .fa-star-half-alt {
            color: #ffcc00;
          }
          .far {
            color: #ccc;
          }
        }
        em {
          margin-left: 10px;
        }
      }

      button {
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'nanumSquareNeo';
      }
    }
  }

  .details {
    margin-bottom: 20px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .slider {
      width: 100%;
      display: flex;
      align-items: center;

      .prev,
      .next {
        background-color: transparent;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #fff;
      }

      ul {
        display: flex;
        overflow-x: auto;
        list-style: none;
        padding: 0;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 10px;
          width: 100px;

          img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 10px;
          }

          .director-info,
          .cast-info {
            text-align: center;
            p {
              margin: 0;
              font-size: 1rem;
              line-height: 1.5;
            }
            span {
              font-size: 0.9rem;
              color: #ccc;
            }
          }
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 3%;

    iframe {
      width: 100%;
      height: 100%;
    }

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      z-index: -1;
    }
  }

  .modal-content {
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: -20px;
    right: -10px;
    background: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--white);
  }
}
</style>