"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data || [];
        setWorkouts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div>
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase tracking-wider">
              THE LIBRARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-400 uppercase font-semibold">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-sm bg-[#14161a] border-[#23272f] text-xs text-neutral-200 rounded-lg focus:outline-none focus:border-[#ccff00] pr-8"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#121418] border border-[#23272f] rounded-2xl h-80 animate-pulse flex flex-col p-4 justify-between"
              >
                <div className="w-full h-44 bg-[#1e222a] rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-[#1e222a] rounded w-2/3" />
                  <div className="h-3 bg-[#1e222a] rounded w-1/3" />
                </div>
                <div className="h-4 bg-[#1e222a] rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout._id || workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}