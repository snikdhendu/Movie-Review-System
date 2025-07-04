"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Review from "@/app/components/review"

const MovieDetailsPage = () => {
    const { imdbId } = useParams()
    const [movie, setMovie] = useState<any>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!imdbId) return

        const fetchSingleMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/movies/${imdbId}`)
                console.log(response.data)
                setMovie(response.data)
                setReviews(response.data.reviewIds)
            } catch (error) {
                console.error("Failed to fetch movie", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSingleMovie()
    }, [imdbId])

    if (loading) return <div className="text-white p-6">Loading...</div>
    if (!movie) return <div className="text-red-500 p-6">Movie not found!</div>

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Movie Content - Left Side */}
                <div className="lg:w-3/5">
                    <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full max-w-[400px] h-[500px] mb-4 rounded shadow-lg object-cover"
                    />
                    <p>📅 Release Date: {movie.releaseDate}</p>
                    <p>🎭 Genres: {movie.genres?.join(", ")}</p>
                    <a
                        href={movie.trailerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline mt-4 inline-block"
                    >
                        ▶ Watch Trailer
                    </a>
                    <h2 className="mt-6 text-xl font-semibold">Backdrops</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {movie.backdrops?.map((url: string, index: number) => (
                            <img key={index} src={url || "/placeholder.svg"} alt="backdrop" className="rounded" />
                        ))}
                    </div>
                </div>

                {/* Reviews Section - Right Side */}
                <div className="lg:w-2/5">
                    {typeof imdbId === "string" && <Review imdbId={imdbId} />}

                    <div className="mt-6 bg-zinc-800 p-4 rounded">
                        <h3 className="text-lg font-semibold mb-2">📋 Reviews</h3>
                        {reviews.length === 0 ? (
                            <p className="text-gray-400 text-sm">No reviews yet.</p>
                        ) : (
                            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
                                {reviews.map((review, index) => (
                                    <li key={index} className="bg-zinc-700 p-3 rounded text-sm">
                                        {review.body}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsPage
