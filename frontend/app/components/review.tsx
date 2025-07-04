"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"

const Review = ({ imdbId }: { imdbId: string }) => {
    const [reviewBody, setReviewBody] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!reviewBody.trim()) {
            setMessage("Please write a review before submitting.")
            return
        }

        setIsSubmitting(true)
        setMessage("")

        const payload = {
            reviewBody: reviewBody.trim(),
            imdbId,
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/reviews", payload)
            console.log("Review submitted:", response.data)
            setReviewBody("")
            setMessage("Review submitted successfully!")
        } catch (error) {
            console.error("Error submitting review:", error)
            setMessage("Failed to submit review. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-zinc-900 p-4 rounded shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-white">✍ Add Review</h2>
                <textarea
                    placeholder="Write your review..."
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    className="w-full p-3 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-red-500 focus:outline-none resize-none"
                    rows={4}
                    disabled={isSubmitting}
                />
                {message && (
                    <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || !reviewBody.trim()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default Review
