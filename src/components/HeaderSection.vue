<template>
  <header id="header" role="banner" :class="{ scrolled: isScrolled }">
    <div class="header__inner container">
      <div class="header__wrap">
        <div class="left">
          <h1 @click="goHome">
            <v-icon name="md-moviefilter-twotone" scale="2.3"></v-icon>
            Kim<span>Fox</span>
          </h1>
        </div>
        <div class="right">
          <div class="search">
            <input type="search" v-model="searchQuery" @keypress.enter="searchMovies" />
            <button @click="searchMovies"><v-icon name="fa-search" scale="1"></v-icon></button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const isScrolled = ref(false)
const searchQuery = ref('')
const emits = defineEmits(['search', 'resetFilters'])
const router = useRouter()

const handleScroll = () => {
  if (window.scrollY > 0) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

const searchMovies = async () => {
  const apikey = import.meta.env.VITE_API_KEY
  if (!searchQuery.value.trim()) return

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery.value)}&api_key=${apikey}`
    )
    emits('search', response.data.results)
  } catch (error) {
    console.error(error)
  }
}

const goHome = () => {
  emits('resetFilters')
  if (router.currentRoute.value.name !== 'home') {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
#header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  background-color: var(--black200);
  font-family: 'nanumSquareNeo';
  backdrop-filter: blur(10px);
  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease; /* 배경색과 블러 전환 애니메이션 */
  box-shadow: inset 0 30px 30px -10px rgba(0, 0, 0, 0.605); /* 헤더에 그림자 추가 */

  &.scrolled {
    background-color: rgba(0, 0, 0, 0.7); /* 스크롤 시 배경색 */
    backdrop-filter: blur(20px); /* 스크롤 시 블러 추가 */
  }

  .header__inner {
    display: flex;
    padding: 20px;
    height: 100px;
    flex-direction: column;
    justify-content: center;

    .header__wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 20%;
        h1 {
          cursor: pointer;
          svg {
            height: 50px;
            padding-bottom: 4px;
            padding-left: 2px;
          }
          font-size: 2rem;
          text-transform: uppercase;
          font-weight: 900;
          margin-bottom: 5px;
          span {
            color: var(--pointColor);
          }
        }
      }
      .right {
        width: 80%;
        justify-content: right;
        display: flex;
        align-items: center;
        .search {
          width: 90%;
          display: flex;
          justify-content: space-between;
          input {
            width: calc(100% - 60px);
            height: 40px;
            border-radius: 20px;
            color: var(--white200);
            font-family: 'nanumSquareNeo';
            background-color: rgba(97, 97, 97, 0.375);
            backdrop-filter: blur(10px);
            padding: 5px 15px;
          }
          button {
            font-family: 'nanumSquareNeo';
            width: 60px;
            height: 40px;
            color: var(--white200);
            background-color: rgba(97, 97, 97, 0.375);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            margin-left: 10px;
            padding: 5px 15px;
          }
        }
      }
      @media (max-width: 1000px) {
        .left {
          width: 30%;
        }
        .right {
          width: 70%;
        }
      }
      @media (max-width: 800px) {
        .left {
          h1 {
            svg {
              padding-bottom: 0;
            }
          }
        }
      }
      @media (max-width: 600px) {
        justify-content: center;
        .left {
          display: none;
          h1 {
            svg {
              padding-bottom: 0;
            }
          }
        }
        .right {
          width: 100%;
          .search {
            width: 100%;
          }
        }
      }
    }
  }
}

.search-results {
  padding: 20px;
}
</style>
