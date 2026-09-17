import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * ReviewSection
 * Shows existing customer reviews for a product, and lets a logged-in
 * customer (not the admin) leave their own star rating + comment.
 */
function ReviewSection({ reviews, canReview, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (comment.trim().length < 5) {
      setError("Please write at least a few words.");
      return;
    }
    setError("");
    setSubmitting(true);
    await onSubmitReview({ rating, comment: comment.trim() });
    setComment("");
    setRating(5);
    setSubmitting(false);
  }

  return (
    <div className="mt-12 max-w-2xl">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Customer reviews ({reviews.length})
      </h2>

      {reviews.length === 0 && (
        <p className="text-sm text-slate-400 mb-6">No reviews yet — be the first!</p>
      )}

      <ul className="space-y-4 mb-8">
        {reviews.map((r) => (
          <li key={r.id} className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-800">{r.userName}</span>
              <span className="text-amber-500 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{r.comment}</p>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {canReview ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Leave a review</p>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-amber-500" : "text-slate-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your experience with this product..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Post review"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-slate-400">
          <Link to="/login" className="text-emerald-600 hover:underline">
            Log in
          </Link>{" "}
          as a customer to leave a review.
        </p>
      )}
    </div>
  );
}

export default ReviewSection;
