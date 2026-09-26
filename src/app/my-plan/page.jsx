"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWorkouts } from "@/context/WorkoutContext";
import PlanCard from "@/components/PlanCard";

export default function MyPlanPage() {
    const [activeTab, setActiveTab] = useState("plan");
    const [sortBy, setSortBy] = useState("duration");
    const [loading, setLoading] = useState(true);

    const {
        todayPlan,
        savedWorkouts,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
    } = useWorkouts();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Helper to extract calorie value regardless of API naming convention
    const extractCalories = (item) => {
        const val =
            item.calories ??
            item.caloriesBurned ??
            item.calorie ??
            item.kcal ??
            0;
        return Number(val) || 0;
    };

    // Helper to extract duration value
    const extractDuration = (item) => {
        const val =
            item.duration ??
            item.durationMinutes ??
            item.time ??
            0;
        return Number(val) || 0;
    };

    const totalExercises = todayPlan.length;
    const totalMinutes = todayPlan.reduce(
        (sum, item) => sum + extractDuration(item),
        0
    );
    const totalCalories = todayPlan.reduce(
        (sum, item) => sum + extractCalories(item),
        0
    );

    const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

    const sortedList = [...currentList].sort((a, b) => {
        if (sortBy === "duration") {
            return extractDuration(a) - extractDuration(b);
        }
        if (sortBy === "calories") {
            return extractCalories(b) - extractCalories(a);
        }
        if (sortBy === "rating") {
            return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        }
        return 0;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="mb-8">
                <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white">
                    MY PLAN
                </h1>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-6 sm:p-8 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:divide-x sm:divide-[#1f232b]">
                <div>
                    <p className="text-xs font-semibold text-neutral-400 mb-1">
                        Exercises
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold text-[#ccff00]">
                        {totalExercises}
                    </p>
                </div>

                <div className="sm:pl-8">
                    <p className="text-xs font-semibold text-neutral-400 mb-1">
                        Minutes
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold text-white">
                        {totalMinutes}
                    </p>
                </div>

                <div className="sm:pl-8">
                    <p className="text-xs font-semibold text-neutral-400 mb-1">
                        Calories
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold text-white">
                        {totalCalories}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center bg-[#101216] border border-[#1f232b] p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "plan"
                                ? "bg-[#1f232b] text-white shadow-sm"
                                : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "saved"
                                ? "bg-[#1f232b] text-white shadow-sm"
                                : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs text-neutral-400">Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-sm bg-[#121418] border-[#1f232b] text-xs text-neutral-200 rounded-lg focus:outline-none focus:border-neutral-600"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center text-sm text-neutral-500">
                    Loading workouts…
                </div>
            ) : sortedList.length === 0 ? (
                <div className="border border-dashed border-[#1f232b] rounded-2xl p-16 text-center my-4">
                    <h3 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wide text-white mb-2">
                        NOTHING HERE YET
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold uppercase text-xs px-6 py-3 rounded-full transition-transform active:scale-95"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedList.map((workout) => (
                        <PlanCard
                            key={workout._id || workout.id}
                            workout={workout}
                            isPlanTab={activeTab === "plan"}
                            onRemove={
                                activeTab === "plan" ? removeFromPlan : removeFromSaved
                            }
                            onToggleDone={activeTab === "plan" ? markAsDone : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}