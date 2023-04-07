import { getMovie, getMoviePoster, getMovies } from "../requests/HttpRequests";

export function generateRandomIndexes(listLength) {
    var index1 = 0;
    var index2 = 0;
    while (index1 === index2) {
        index1 = Math.floor(Math.random() * listLength);
        index2 = Math.floor(Math.random() * listLength);
    }
    return [index1, index2];
}

export function calculateUserGuess(movie1Rating, movie2Rating, userGuess) {
    var isHigher;
    if (movie2Rating > movie1Rating || movie2Rating === movie1Rating) {
        isHigher = true;
    }
    else {
        isHigher = false;
    }
    if (userGuess === isHigher) {
        return true;
    }
    else {
        return false;
    }
}

export function updateUserStats(
                score,
                lives,
                setLives,
                setScore,
                result,
                setResult,
                setMovieTitle1,
                setMovieRating1,
                setMoviePoster1,
                setMovieTitle2,
                setMovieRating2,
                setMoviePoster2,
                movieTitle2,
                movieRating2,
                moviePoster2,
                )
{
    if (result) {
        getNewMovie(
            setMovieTitle1,
            setMovieRating1,
            setMoviePoster1,
            setMovieTitle2,
            setMovieRating2,
            setMoviePoster2,
            movieTitle2,
            movieRating2,
            moviePoster2);
        setScore(() => score + 1);
        setResult(null);
    }
    else if(result === false) {
        getNewMovie(
            setMovieTitle1,
            setMovieRating1,
            setMoviePoster1,
            setMovieTitle2,
            setMovieRating2,
            setMoviePoster2,
            movieTitle2,
            movieRating2,
            moviePoster2);
        setLives(() => lives - 1);
        setResult(null);
    }
}

export async function getInitMovies(
                      setMovieTitle1,
                      setMovieRating1,
                      setMoviePoster1,
                      setMovieTitle2,
                      setMovieRating2,
                      setMoviePoster2
                      )
{
    const res = await getMovies();

    setMovieTitle1(res[0].title.toUpperCase());
    setMovieRating1(res[0].vote_average);
    setMoviePoster1(await getMoviePoster(res[0].poster_path));

    setMovieTitle2(res[1].title.toUpperCase());
    setMovieRating2(res[1].vote_average);
    setMoviePoster2(await getMoviePoster(res[1].poster_path));
}

export async function getNewMovie(
                    setMovieTitle1,
                    setMovieRating1,
                    setMoviePoster1,
                    setMovieTitle2,
                    setMovieRating2,
                    setMoviePoster2,
                    movieTitle2,
                    movieRating2,
                    moviePoster2,
                    )
{
    setMovieTitle1(movieTitle2);
    setMovieRating1(movieRating2);
    setMoviePoster1(moviePoster2);

    const res = await getMovie();

    setMovieTitle2(res.title.toUpperCase());
    setMovieRating2(res.vote_average);
    setMoviePoster2(await getMoviePoster(res.poster_path));
}