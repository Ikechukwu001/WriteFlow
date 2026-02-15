'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({ type: '', message: '' });

  const [form, setForm] = useState({
    name: '',
    title: '',
    message: '',
    rating: 5,
  });

  // UI controls
  const [filterRating, setFilterRating] = useState('all'); // 'all' | 5 | 4 | 3 | 2 | 1
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'highest' | 'lowest'
  const [visibleCount, setVisibleCount] = useState(8);

  // 20 “seed” reviews (backdated across 2024, 2025, early 2026)
  const placeholderReviews = useMemo(
    () => [
      // 2024
      { id: 'ph-2024-01', name: 'Chloe M.', title: 'Quiet, premium experience', message: 'The atmosphere was calm and professional. I left feeling lighter and well-rested.', rating: 5, created_at: '2024-02-14T10:12:00.000Z' },
      { id: 'ph-2024-02', name: 'Jordan K.', title: 'Great for shoulder tension', message: 'Excellent pressure control and very respectful communication. My shoulders felt noticeably better.', rating: 5, created_at: '2024-03-28T16:40:00.000Z' },
      { id: 'ph-2024-03', name: 'Priya S.', title: 'Clean and professional', message: 'Everything felt hygienic and thoughtfully prepared. A genuinely relaxing, clinical-standard setup.', rating: 5, created_at: '2024-05-03T12:05:00.000Z' },
      { id: 'ph-2024-04', name: 'Evan R.', title: 'Smooth booking process', message: 'Quick replies, clear instructions, and a comfortable session from start to finish.', rating: 5, created_at: '2024-06-18T09:50:00.000Z' },
      { id: 'ph-2024-05', name: 'Sofia L.', title: 'Perfect pacing', message: 'The pacing was steady and calming. I felt relaxed without feeling rushed at any point.', rating: 5, created_at: '2024-07-22T14:11:00.000Z' },
      { id: 'ph-2024-06', name: 'Marcus T.', title: 'Deep release without pain', message: 'Targeted work where I needed it most. Strong technique but still comfortable.', rating: 5, created_at: '2024-08-09T18:25:00.000Z' },
      { id: 'ph-2024-07', name: 'Amina O.', title: 'Respectful and discreet', message: 'Very professional, private, and consistent care. I felt safe and comfortable.', rating: 5, created_at: '2024-09-18T11:30:00.000Z' },
      { id: 'ph-2024-08', name: 'Nathan B.', title: 'Helped my lower back', message: 'My lower back was tight for weeks—this session made a big difference.', rating: 5, created_at: '2024-10-27T13:42:00.000Z' },
      { id: 'ph-2024-09', name: 'Grace D.', title: 'A calm reset', message: 'Clean space, steady hands, and a relaxing atmosphere. I slept better afterwards.', rating: 4, created_at: '2024-11-12T19:05:00.000Z' },
      { id: 'ph-2024-10', name: 'Leo P.', title: 'Attention to detail', message: 'Small details made the experience feel premium. Great technique and professionalism.', rating: 5, created_at: '2024-12-05T08:18:00.000Z' },

      // 2025
      { id: 'ph-2025-01', name: 'Mia K.', title: 'Exactly what I needed', message: 'The session was tailored to my needs. I felt refreshed and calm afterwards.', rating: 5, created_at: '2025-01-22T12:31:00.000Z' },
      { id: 'ph-2025-02', name: 'Caleb S.', title: 'Strong technique', message: 'Great pressure and control—effective work on tight areas without discomfort.', rating: 5, created_at: '2025-02-16T17:10:00.000Z' },
      { id: 'ph-2025-03', name: 'Hannah V.', title: 'Relaxing from minute one', message: 'From the start, the environment felt calm and professional. Highly recommend.', rating: 5, created_at: '2025-03-09T10:05:00.000Z' },
      { id: 'ph-2025-04', name: 'Owen J.', title: 'Worth it', message: 'Great session and great communication. I felt balanced and lighter afterwards.', rating: 5, created_at: '2025-04-11T15:44:00.000Z' },
      { id: 'ph-2025-05', name: 'Zara N.', title: 'Comfortable and respectful', message: 'Everything was respectful, discreet, and well explained. I felt comfortable throughout.', rating: 5, created_at: '2025-06-09T14:11:00.000Z' },
      { id: 'ph-2025-06', name: 'Dylan C.', title: 'Great for stress', message: 'I came in stressed and left calm. The pacing and pressure were perfect.', rating: 4, created_at: '2025-07-26T09:22:00.000Z' },
      { id: 'ph-2025-07', name: 'Fatima A.', title: 'Professional service', message: 'Clear boundaries, professional approach, and a genuinely relaxing session.', rating: 5, created_at: '2025-09-03T18:02:00.000Z' },
      { id: 'ph-2025-08', name: 'Ryan W.', title: 'Clean setup', message: 'Very clean, organized, and calm. The experience felt premium and intentional.', rating: 5, created_at: '2025-10-14T12:50:00.000Z' },
      { id: 'ph-2025-09', name: 'Ivy Q.', title: 'Soothing and effective', message: 'A great blend of relaxation and therapeutic work. I booked again the same week.', rating: 5, created_at: '2025-11-05T09:50:00.000Z' },

      // early 2026
      { id: 'ph-2026-01', name: 'Ava D.', title: 'A refined wellness reset', message: 'The vibe was calm and premium. I felt refreshed and well cared for.', rating: 5, created_at: '2026-01-08T11:30:00.000Z' },
    ],
    []
  );

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast.message) return;
    const t = setTimeout(() => setToast({ type: '', message: '' }), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  function normalizeReview(r) {
    return {
      id: r.id,
      name: r.name || 'Anonymous',
      title: r.title || 'Client Review',
      message: r.message || '',
      rating: Number(r.rating || 5),
      created_at: r.created_at || new Date().toISOString(),
      __source: r.__source || 'db',
    };
  }

  function mergeAndSortReviews(dbReviews = [], placeholders = []) {
    const map = new Map();

    placeholders
      .map((r) => normalizeReview({ ...r, __source: 'placeholder' }))
      .forEach((r) => map.set(r.id, r));

    dbReviews
      .map((r) => normalizeReview({ ...r, __source: 'db' }))
      .forEach((r) => map.set(r.id, r));

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async function fetchReviews() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(mergeAndSortReviews(data || [], placeholderReviews));
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews(mergeAndSortReviews([], placeholderReviews));
      setToast({ type: 'error', message: 'Could not load live reviews. Showing placeholders.' });
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: '', title: '', message: '', rating: 5 });
  }

  function validateForm() {
    const title = form.title.trim();
    const message = form.message.trim();
    const rating = Number(form.rating);

    if (title.length < 3) return 'Please enter a short title (at least 3 characters).';
    if (message.length < 10) return 'Please share a bit more detail (at least 10 characters).';
    if (rating < 1 || rating > 5) return 'Rating must be between 1 and 5.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const errorMsg = validateForm();
    if (errorMsg) {
      setToast({ type: 'error', message: errorMsg });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name?.trim() || 'Anonymous',
        title: form.title.trim(),
        message: form.message.trim(),
        rating: Number(form.rating),
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setReviews((prev) =>
        mergeAndSortReviews(
          [data, ...prev.filter((r) => r.__source === 'db')],
          placeholderReviews
        )
      );

      resetForm();
      setVisibleCount((v) => Math.max(v, 8));
      setToast({ type: 'success', message: 'Review submitted. Thank you.' });
    } catch (error) {
      console.error('Error submitting review:', error);
      setToast({ type: 'error', message: 'Failed to submit review. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const stats = useMemo(() => {
    if (!reviews.length) return { avg: 5, total: 0 };
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    const avg = total ? sum / total : 5;
    return { avg, total };
  }, [reviews]);

  const filteredSorted = useMemo(() => {
    let list = [...reviews];

    if (filterRating !== 'all') {
      const fr = Number(filterRating);
      list = list.filter((r) => Number(r.rating) === fr);
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'highest') {
      list.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === 'lowest') {
      list.sort((a, b) => Number(a.rating) - Number(b.rating));
    }

    return list;
  }, [reviews, filterRating, sortBy]);

  const visible = filteredSorted.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredSorted.length;

  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      {/* subtle lounge glow */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,185,120,0.12),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,120,160,0.10),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Toast */}
        {toast.message ? (
          <div className="fixed top-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2">
            <div
              className={`rounded-2xl border border-border bg-card/90 backdrop-blur px-4 py-3 shadow-xl ${
                toast.type === 'error' ? 'text-destructive' : 'text-foreground'
              }`}
              role="status"
              aria-live="polite"
            >
              <p className="text-sm">
                <span className="font-medium">
                  {toast.type === 'error' ? 'Note:' : 'Done:'}
                </span>{' '}
                {toast.message}
              </p>
            </div>
          </div>
        ) : null}

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Reviews
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif text-foreground">
            Client reviews
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Honest experiences shared by clients who have taken time to relax, reset, and restore.
          </p>
        </div>

        {/* Summary + Controls */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 rounded-3xl border border-border bg-card/60 backdrop-blur p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Overall rating
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(stats.avg)} />
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{stats.avg.toFixed(1)}</span> / 5
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {stats.total} review{stats.total === 1 ? '' : 's'}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Discreet, professional service — designed for comfort and calm pacing.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <select
                value={filterRating}
                onChange={(e) => {
                  setFilterRating(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                aria-label="Filter by rating"
              >
                <option value="all">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                aria-label="Sort reviews"
              >
                <option value="newest">Newest first</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
            </div>

            <button
              type="button"
              onClick={fetchReviews}
              className="w-full sm:w-auto rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-10 space-y-6">
          {loading ? (
            <div className="rounded-3xl border border-border bg-muted/25 p-8 text-center">
              <p className="text-muted-foreground">Loading reviews…</p>
            </div>
          ) : null}

          {!loading && filteredSorted.length === 0 ? (
            <div className="rounded-3xl border border-border bg-muted/25 p-8 text-center">
              <p className="text-muted-foreground">
                No reviews match this filter yet.
              </p>
            </div>
          ) : null}

          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {canLoadMore ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + 8)}
                className="w-full rounded-2xl border border-border bg-background/70 backdrop-blur px-6 py-4 text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>

        {/* Form */}
        <div className="mt-16 max-w-3xl">
          <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-8">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Leave a review
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Your feedback helps others choose confidently.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <input
                type="text"
                placeholder="Review title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <div>
                <textarea
                  rows={6}
                  placeholder="Share your experience"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Be respectful and concise.</span>
                  <span>{form.message.trim().length}/2000</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit review'}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground hover:bg-muted transition disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            If reviews are not saving, check your Supabase Row Level Security (RLS) policies for{' '}
            <span className="text-foreground font-medium">insert</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Review Card */
function ReviewCard({ review }) {
  const isPlaceholder = review.__source === 'placeholder';

  return (
    <article className="rounded-3xl border border-border bg-muted/25 p-7">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} />
          {isPlaceholder ? (
            <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
              Sample
            </span>
          ) : null}
        </div>

        <time className="text-xs uppercase tracking-widest text-muted-foreground">
          {new Date(review.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </div>

      <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
        {review.title}
      </h3>

      <p className="text-muted-foreground leading-relaxed">{review.message}</p>

      <p className="mt-4 text-sm text-muted-foreground">
        — {review.name || 'Anonymous'}
      </p>
    </article>
  );
}

/* Stars */
function StarRating({ rating }) {
  const r = Math.max(1, Math.min(5, Number(rating || 5)));

  return (
    <div className="flex gap-1" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= r ? 'text-accent' : 'text-muted-foreground/40'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}
