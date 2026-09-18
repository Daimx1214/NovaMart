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
      <h2 className="text-lg font-bold text-ink-900 mb-4 font-heading">
        Customer reviews ({reviews.length})
      </h2>

      {reviews.length === 0 && (
        <p className="text-sm text-ink-500 mb-6">No reviews yet — be the first to share your experience!</p>
      )}

      <ul className="space-y-4 mb-8">
        {reviews.map((r) => (
          <li key={r.id} className="bg-white border border-ink-200/90 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink-900 text-sm font-heading">{r.userName}</span>
              <span className="text-amber-500 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            <p className="text-sm text-ink-600 mt-1.5 leading-relaxed">{r.comment}</p>
            <p className="text-xs text-ink-400 mt-2">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {canReview ? (
        <form onSubmit={handleSubmit} className="bg-white border border-ink-200/90 rounded-xl p-5">
          <p className="text-sm font-semibold text-ink-900 mb-2 font-heading">Leave a review</p>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? "text-amber-500" : "text-ink-300"}`}
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
            className="w-full rounded-lg border border-ink-300 px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm bg-white"
          />
          {error && <p className="text-sm text-rose-500 mt-1">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-lg bg-brand-600 text-white px-5 py-2 text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Posting..." : "Post review"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-ink-500">
          <Link to="/login" className="text-brand-600 font-semibold hover:underline">
            Log in
          </Link>{" "}
          as a customer to leave a review.
        </p>
      )}
    </div>
  );
}

export default ReviewSection;
