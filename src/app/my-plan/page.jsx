"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkouts } from "@/context/WorkoutContext";
import PlanCard from "@/components/PlanCard";

export default function MyPlanPage() {
    const [activeTab, setActiveTab] = useState("plan");
    const {
        todayPlan,
        savedWorkouts,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
    } = useWorkouts();

    const totalMinutes = todayPlan.reduce(
        (sum, item) => sum + (Number(item.duration) || 0),
        0
    );
    const totalCalories = todayPlan.reduce(
        (sum, item) => sum + (Number(item.calories) || 0),
        0
    );

    const displayList = activeTab === "plan" ? todayPlan : savedWorkouts;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="mb-8">
                <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white">
                    MY PLAN
                </h1>
                <p className="text-neutral-400 text-sm mt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-5">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Exercises
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white mt-1">
                        {todayPlan.length} <span className="text-xs text-neutral-500 font-normal">/ 5 max</span>
                    </p>
                </div>

                <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-5">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Minutes
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#ccff00] mt-1">
                        {totalMinutes}
                    </p>
                </div>

                <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-5">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Calories
                    </p>
                    <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white mt-1">
                        {totalCalories} <span className="text-xs text-neutral-500 font-normal">kcal</span>
                    </p>
                </div>
            </div>

            <div className="flex border-b border-[#1f232b] mb-6">
                <button
                    onClick={() => setActiveTab("plan")}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === "plan"
                            ? "text-[#ccff00]"
                            : "text-neutral-400 hover:text-white"
                        }`}
                >
                    Today&apos;s Plan ({todayPlan.length})
                    {activeTab === "plan" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00]" />
                    )}
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === "saved"
                            ? "text-[#ccff00]"
                            : "text-neutral-400 hover:text-white"
                        }`}
                >
                    Saved ({savedWorkouts.length})
                    {activeTab === "saved" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00]" />
                    )}
                </button>
            </div>

            {displayList.length === 0 ? (
                <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-12 text-center my-6">
                    <h3 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wider text-white mb-2">
                        NOTHING HERE YET
                    </h3>
                    <p className="text-neutral-400 text-sm mb-6 max-w-sm mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/"
                        className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 border-none text-xs rounded-lg"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {displayList.map((workout) => (
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