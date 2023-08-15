import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Loader from "../Loader/Loader";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTZmNDg0NzNkMjRlZTBjOWM4YTg4NmNiNmFkODQ2ZCIsInN1YiI6IjY0ZDE1MmQ3ZDlmNGE2MDNiNTRhOTU0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s4_T2lHWSmjDOegqYp1IZqdY0r6ehkr7E9h1Y-nxtzM",
  },
};

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const id = useParams();
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id.movieId}?language=en-US`,
        options
      );
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };
    setTimeout(() => {
      fetchMovie();
    }, 1500);
  }, [id]);
  
  return (
    <>
      {!token && <Navigate to={"/"} />}

      {loading === true ? (
        <Loader loading={loading} />
      ) : (
        <section className="grid grid-cols-2 items-center p-10 m-10 border border-slate-800 rounded-lg shadow-2xl shadow-slate-800 bg-cyan-900 text-white">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-5 text-xl">
            <h2 className="text-5xl italic">{movie.title}</h2>
            <small>
              Original: {movie.original_title} - {movie.original_language}
            </small>
            <div className="grid grid-cols-3 m-5">
              <div>
                <p>Genres: </p>
                <ul className="list-disc">
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-md">Popularity:</p> 
                <p>{movie.popularity.toFixed(2)}</p>
                <ul className="list-disc">
                  <li>Average: {movie.vote_average.toFixed(2)}</li>
                  <li>Votes: {movie.vote_count}</li>
                </ul>
              </div>
              <div>
                <p>Production companies:</p>
                <ul className="list-disc">
                  {movie.production_companies.map((prod) => {
                    return (
                      <li key={prod.id}>{prod.name}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <h2 className="text-lg">Overview:</h2>
            <p>{movie.overview}</p>
            {movie.homepage.length === 0 ? null : (
              <p className="mt-auto">
                Homepage:{" "}
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Follow this link</strong>
                </a>
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetail;