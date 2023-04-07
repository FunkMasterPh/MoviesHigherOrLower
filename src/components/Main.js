import React, { useEffect, useState, useRef } from 'react';
import { CaretUpFill } from 'react-bootstrap-icons';
import { CaretDownFill } from 'react-bootstrap-icons';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { calculateUserGuess, getInitMovies, updateUserStats } from '../HelperFunctions/GenericHelperFunctions';
import GuessToast from './GuessToast';

const Main = () => {
    const [loading, setLoading] = useState(false);
    const [movieTitle1, setMovieTitle1] = useState();
    const [movieRating1, setMovieRating1] = useState();
    const [moviePoster1, setMoviePoster1] = useState();
    const [movieTitle2, setMovieTitle2] = useState();
    const [movieRating2, setMovieRating2] = useState();
    const [moviePoster2, setMoviePoster2] = useState();
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const ref = useRef();

    const handleUpVote = () => {
        setResult(calculateUserGuess(movieRating1, movieRating2, true));
        
    }

    const handleDownVote = () => {
        setResult(calculateUserGuess(movieRating1, movieRating2, false));
    }

    const handleRetry = () => {
        setLives(3);
        setScore(0);
    }

    useEffect(() => {
        setLoading(true);
        getInitMovies(
            setMovieTitle1,
            setMovieRating1,
            setMoviePoster1,
            setMovieTitle2,
            setMovieRating2,
            setMoviePoster2,
        );
        setLoading(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            updateUserStats(
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
                moviePoster2
            );
        }, 1700)
        console.log(result);
    }, [result]);

    if (!loading) {
        return (
            <>
            {lives > 0 ?
                <div className="main-page">
                    <div className="stat-bar">
                        <div className="stat">Score: {score}</div>
                        {lives === 3 ? (
                            <div className="stat">
                                <HeartFill className="life" size={40} />
                                <HeartFill className="life" size={40} />
                                <HeartFill className="life" size={40} />
                            </div>
                        ) : lives === 2 ? (
                            <div className="stat">
                                <HeartFill className="life" size={40} />
                                <HeartFill className="life" size={40} />
                                <Heart className="life" size={40} />
                            </div>
                        ) : lives === 1 ? (
                            <div className="stat">
                                <HeartFill className="life" size={40} />
                                <Heart className="life" size={40} />
                                <Heart className="life" size={40} />
                            </div>
                        ) : (
                            <div className="stat">
                                <Heart className="life" size={40} />
                                <Heart className="life" size={40} />
                                <Heart className="life" size={40} />
                            </div>
                        )}
                    </div>
                    <div className="container">
                        <div className="sub-container">
                            <img src={moviePoster1} className="movie-poster" />
                            <div className="movie-title">{movieTitle1}</div>
                            <p className="movie-rating">{movieRating1} / 10</p>
                        </div>
                        <div className="sub-container">
                            <img src={moviePoster2} className="movie-poster" />
                            <div className="movie-title">{movieTitle2}</div>
                            {result === null ? 
                                <>
                                <div className="container-row" ref={ref}>
                                    <div className="vote-container" onClick={handleUpVote}>
                                        <label className="up-label">Higher</label>
                                        <CaretUpFill className="upvote-arrow" size={100} />
                                    </div>
                                    <div className="vote-container" onClick={handleDownVote}>
                                        <label className="down-label">Lower</label>
                                        <CaretDownFill className="downvote-arrow" size={100} />
                                    </div>
                                </div>
                                </>
                                :
                                <div className="container-row" ref={ref}>
                                    <p className="movie-rating">{movieRating2} / 10</p>
                                    <GuessToast guessResult={result}></GuessToast>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            :
            <div className="main-page">
                <div className="container">
                    <div className="final-score">Final Score: {score}</div>
                <div className="retry" onClick={handleRetry}>Retry?</div>
                </div>
            </div>
            }
            </>
        )
    }
}
export default Main;
