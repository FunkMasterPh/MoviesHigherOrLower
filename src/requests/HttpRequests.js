import axios from 'axios'
import { generateRandomIndexes } from '../HelperFunctions/GenericHelperFunctions';

export async function getMovies() {
    const pageNumber = Math.floor(Math.random() * 501);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=d2aa2a193948070849cc573738fc71ce&language=en-US&page=${pageNumber}`;
    

    const res = await axios.get(url).then(
        (response) => {
            if (response.status === 200) {
                return {success: true, data: response.data}
            }
        }
    )
    const indexes = generateRandomIndexes(res.data.results.length);
    const movie1 = res.data.results[indexes[0]];
    const movie2 = res.data.results[indexes[1]];
    return [movie1, movie2];
}

export async function getMovie() {
    const pageNumber = Math.floor(Math.random() * 501);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=d2aa2a193948070849cc573738fc71ce&language=en-US&page=${pageNumber}`;


    const res = await axios.get(url).then(
        (response) => {
            if (response.status === 200) {
                return { success: true, data: response.data }
            }
        }
    )
    const indexes = generateRandomIndexes(res.data.results.length);
    const movie1 = res.data.results[indexes[0]];
    return movie1;
}



export async function getMoviePoster(posterPath) {
    const url = 'https://image.tmdb.org/t/p/w500/' + posterPath;

    const res2 = await fetch(url);
    const imgBlob = await res2.blob();
    const imgObj = URL.createObjectURL(imgBlob);
    return imgObj;
}