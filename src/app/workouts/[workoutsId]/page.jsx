"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWorkouts } from "@/context/WorkoutContext";

export default function WorkoutDetailPage({ params }) {
    const unwrappedParams = use(params);
    const { workoutsId } = unwrappedParams;

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToPlan, saveForLater } = useWorkouts();

    useEffect(() => {
        async function fetchWorkout() {
            try {
                const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
                    cache: "no-store",
                });
                const json = await res.json();
                const data = Array.isArray(json) ? json : json.data || [];
                const found = data.find(
                    (item) => String(item._id || item.id) === String(workoutsId)
                );
                setWorkout(found || null);
            } catch (err) {
                console.error("Failed to load workout:", err);
            } finally {
                setLoading(false);
            }
        }

        if (workoutsId) {
            fetchWorkout();
        }
    }, [workoutsId]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-6 aspect-[4/5] bg-[#121418] rounded-3xl animate-pulse" />
                    <div className="lg:col-span-6 space-y-4">
                        <div className="h-8 bg-[#121418] rounded w-2/3 animate-pulse" />
                        <div className="h-14 bg-[#121418] rounded w-full animate-pulse" />
                        <div className="h-64 bg-[#121418] rounded-2xl w-full animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-28 text-center">
                <h2 className="text-3xl font-[family-name:var(--font-oswald)] font-bold uppercase text-white mb-3">
                    WORKOUT NOT FOUND
                </h2>
                <p className="text-sm text-neutral-400 mb-8">
                    The requested exercise could not be found.
                </p>
                <Link
                    href="/"
                    className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 border-none text-xs rounded-xl"
                >
                    BACK TO WORKOUTS
                </Link>
            </div>
        );
    }

    // Safe tag extraction
    const getCategories = (item) => {
        const raw =
            item.muscleGroups ||
            item.muscles ||
            item.muscle ||
            item.targetMuscles ||
            item.targetMuscle ||
            item.primaryMuscles ||
            item.primaryMuscle ||
            item.categories ||
            item.category ||
            item.tags ||
            item.bodyPart;

        if (Array.isArray(raw)) {
            return raw.map((val) =>
                typeof val === "object" ? val.name || "" : String(val)
            );
        }

        if (typeof raw === "string" && raw.trim().length > 0) {
            return raw.includes(",")
                ? raw.split(",").map((s) => s.trim())
                : [raw.trim()];
        }

        const nameLower = (item.name || "").toLowerCase();
        if (nameLower.includes("bench") || nameLower.includes("chest") || nameLower.includes("push-up"))
            return ["CHEST", "ARMS"];
        if (nameLower.includes("squat") || nameLower.includes("lunge") || nameLower.includes("leg"))
            return ["LEGS"];
        if (nameLower.includes("deadlift") || nameLower.includes("pull-up") || nameLower.includes("row"))
            return ["BACK"];
        if (nameLower.includes("curl") || nameLower.includes("tricep") || nameLower.includes("dip"))
            return ["ARMS"];
        if (nameLower.includes("press") || nameLower.includes("deltoid"))
            return ["SHOULDERS", "ARMS"];
        if (nameLower.includes("plank") || nameLower.includes("twist") || nameLower.includes("crunch") || nameLower.includes("abs"))
            return ["CORE"];

        return ["FULL BODY"];
    };

    const categories = getCategories(workout);

    const caloriesValue =
        workout.calories ??
        workout.caloriesBurned ??
        workout.calorie ??
        workout.kcal ??
        0;

    const durationValue =
        workout.duration ??
        workout.durationMinutes ??
        workout.time ??
        0;

    const defaultInstructions = [
        "Lie on the bench with eyes under the bar and feet planted.",
        "Unrack with locked elbows and lower the bar to mid-chest.",
        "Press up in a slight arc until elbows lock without bouncing.",
        "Keep shoulder blades pinched and a natural arch in the back.",
    ];

    const instructions =
        Array.isArray(workout.instructions) && workout.instructions.length > 0
            ? workout.instructions
            : defaultInstructions;

    const specs = [
        { label: "EQUIPMENT", value: workout.equipment || "Barbell, Bench" },
        { label: "DIFFICULTY", value: workout.difficulty || "Intermediate" },
        { label: "SETS", value: workout.sets || "4" },
        { label: "REPS", value: workout.reps || "6-8" },
        { label: "DURATION", value: `${durationValue} min` },
        { label: "CALORIES", value: `${caloriesValue} kcal` },
        { label: "RATING", value: workout.rating || "4.8" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left: Image */}
                <div className="lg:col-span-6 w-full">
                    <div className="relative w-full aspect-[4/5] bg-[#121418] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-2xl">
                        {workout.image ? (
                            <Image
                                src={workout.image}
                                alt={workout.name || "Workout"}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm">
                                No visual preview
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="lg:col-span-6 flex flex-col">
                    <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white leading-tight mb-3">
                        {workout.name}
                    </h1>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5">
                        {workout.description ||
                            "A compound exercise designed to build muscle mass, increase total body work capacity, and reinforce mechanical strength."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-[#ccff00] text-black text-xs font-bold uppercase px-3.5 py-1 rounded-full"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    <div className="bg-[#121418] border border-neutral-800/70 rounded-2xl p-5 mb-8">
                        <div className="divide-y divide-neutral-800/60">
                            {specs.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                                >
                                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                                        {spec.label}
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-neutral-200">
                                        {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-[family-name:var(--font-oswald)] text-sm font-bold text-white uppercase tracking-widest mb-3">
                            INSTRUCTIONS
                        </h3>
                        <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed list-none">
                            {instructions.slice(0, 4).map((step, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-neutral-400 font-medium shrink-0">
                                        {idx + 1}.
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b5e600] text-black font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all active:scale-95"
                        >
                            <svg
                                className="w-4 h-4 stroke-[2]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Add to today&apos;s plan</span>
                        </button>

                        <button
                            onClick={() => saveForLater(workout)}
                            className="inline-flex items-center gap-2 bg-[#121418] hover:bg-[#181c22] border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold text-xs capitalize px-5 py-3 rounded-xl transition-all active:scale-95"
                        >
                            <svg
                                className="w-4 h-4 stroke-[2]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>Save for later</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}