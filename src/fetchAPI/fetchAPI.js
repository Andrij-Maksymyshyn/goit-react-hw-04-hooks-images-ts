import axios from 'axios';

const KEY = '24382748-1dfb63c81149146d5ea200f75';
const BASE_URL = 'https://pixabay.com/api';
const perPage = 12;

export async function fetchImages(value, currentPage) {
  return await axios.get(
    `${BASE_URL}/?q=${value}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}
`,
  );
}
