"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const AllMovies = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/movies")
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching movies", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">🎬 All Movies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-4 space-y-2">
                            <h2 className="text-xl font-semibold">{movie.title}</h2>
                            <p className="text-sm text-gray-400">
                                📅 Release Date: {movie.releaseDate}
                            </p>
                            <p className="text-sm text-gray-400">
                                🎭 Genres: {movie.genres?.join(", ")}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <a
                                    href={movie.trailerLink}
                                    target="_blank"
                                    className="text-sm text-blue-400 hover:underline"
                                >
                                    ▶ Watch Trailer
                                </a>
                                <button onClick={() => router.push(`/movie/${movie.imdbId}`)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer">
                                    ✍ Review
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
