# Vue 영화 웹

<img src="/img/KIM_FOX01.png">

[사이트 링크](https://miento-movie.web.app/)

이 프로젝트는 Vue.js를 사용하여 영화 정보를 표시하는 애플리케이션입니다. TMDB(The Movie Database) API를 사용하여 영화 세부 정보, 예고편, 관련 영상 및 추천 영화를 가져옵니다.

## 주요 기능

<img src="/img/KIM_FOX02.png">
<img src="/img/KIM_FOX03.png">

- 영화 제목, 개봉일, 평점, 상영 시간 및 장르 등의 세부 정보 표시
- 출연진 및 제작진 목록 표시
- 영화 예고편 재생
- 관련 영상 표시
- 추천 영화 표시
- 반응형 디자인

## 사용된 라이브러리

- **Vue.js**: 사용자 인터페이스를 구축하기 위한 주요 JavaScript 프레임워크
- **Vue Router**: 애플리케이션 내에서 라우팅을 처리하기 위해 사용
- **Axios**: TMDb API에 HTTP 요청을 보내기 위해 사용
- **Oh-Vue-Icons**: Font Awesome 아이콘을 애플리케이션 내에서 사용하기 위해 사용

## 사용된 API

- **The Movie Database (TMDB) API**: 영화 세부 정보, 크레딧, 비디오 및 추천 영화를 가져오기 위해 사용

## 설치 및 설정

1. 리포지토리를 클론합니다:

   ```bash
   git clone https://github.com/your-username/vue-movie-app.git
   ```

2. 프로젝트 디렉토리로 이동합니다:

   ```bash
   cd vue-movie-app
   ```

3. 필요한 패키지를 설치합니다:

   ```bash
   npm install
   ```

4. TMDb API 키를 `.env` 파일에 추가합니다:

   ```bash
   VITE_API_KEY=your_tmdb_api_key
   ```

5. 애플리케이션을 로컬 서버에서 실행합니다:
   ```bash
   npm run dev
   ```

## 프로젝트 구조

- **`src`**: 주요 소스 코드 디렉토리
  - **`components`**: Vue 컴포넌트 파일
  - **`views`**: 페이지별 Vue 컴포넌트 파일
  - **`router`**: 라우팅 설정 파일
  - **`assets`**: 스타일시트 및 이미지 파일
  - **`App.vue`**: 애플리케이션의 루트 컴포넌트
  - **`main.js`**: 애플리케이션의 진입점
