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
                const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
                const json = await res.json();
                const data = Array.isArray(json) ? json : json.data || [];
                const found = data.find(
                    (item) => String(item._id || item.id) === String(workoutsId)
                );
                setWorkout(found || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkout();
    }, [workoutsId]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-6 aspect-square bg-[#14161b] rounded-2xl animate-pulse" />
                    <div className="lg:col-span-6 space-y-4">
                        <div className="h-6 bg-[#14161b] rounded w-1/4 animate-pulse" />
                        <div className="h-12 bg-[#14161b] rounded w-3/4 animate-pulse" />
                        <div className="h-20 bg-[#14161b] rounded w-full animate-pulse" />
                        <div className="h-44 bg-[#14161b] rounded w-full animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h2 className="text-3xl font-[family-name:var(--font-oswald)] font-bold uppercase text-white mb-3">
                    WORKOUT NOT FOUND
                </h2>
                <p className="text-sm text-neutral-400 mb-8">
                    The requested exercise does not exist or has been removed.
                </p>
                <Link
                    href="/"
                    className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 border-none text-xs rounded-lg"
                >
                    BACK TO WORKOUTS
                </Link>
            </div>
        );
    }

    const categories = Array.isArray(workout.categories)
        ? workout.categories
        : workout.category
            ? [workout.category]
            : [];

    const defaultInstructions = [
        "Position yourself correctly with a stable stance and engage your core.",
        "Grip the weight or position bodyweight with joints aligned properly.",
        "Perform the eccentric (lowering) phase under strict control.",
        "Drive back up explosively through the concentric phase to starting posture."
    ];

    const instructions =
        Array.isArray(workout.instructions) && workout.instructions.length > 0
            ? workout.instructions
            : defaultInstructions;

    const specs = [
        { label: "EQUIPMENT", value: workout.equipment || "Standard" },
        { label: "DIFFICULTY", value: workout.difficulty || "Intermediate" },
        { label: "SETS", value: workout.sets || "4" },
        { label: "REPS", value: workout.reps || "8-12" },
        { label: "DURATION", value: `${workout.duration} min` },
        { label: "CALORIES", value: `${workout.calories} kcal` },
        { label: "RATING", value: workout.rating || "4.8" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                <div className="lg:col-span-6 w-full sticky top-24">
                    <div className="relative w-full aspect-square bg-[#121418] border border-[#1f232b] rounded-3xl overflow-hidden shadow-2xl">
                        {workout.image ? (
                            <Image
                                src={workout.image}
                                alt={workout.name}
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

                <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {categories.map((cat, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#ccff00] text-black text-xs font-black uppercase px-3 py-1 rounded-full tracking-wide"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white leading-tight mb-4">
                            {workout.name}
                        </h1>

                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                            {workout.description ||
                                "A targeted gym exercise designed to build muscle mass, increase total body work capacity, and reinforce mechanical strength."}
                        </p>

                        <div className="bg-[#121418] border border-[#1f232b] rounded-2xl p-5 mb-8">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                                KEY SPECIFICATIONS
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                                {specs.map((spec, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                                            {spec.label}
                                        </span>
                                        <span className="text-sm font-bold text-white uppercase">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                                INSTRUCTIONS
                            </h3>
                            <div className="space-y-3">
                                {instructions.slice(0, 4).map((step, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3.5 bg-[#121418] border border-[#1f232b] p-3.5 rounded-xl"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#1c2208] border border-[#27330c] text-[#ccff00] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm text-neutral-300 leading-normal">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1f232b]">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="flex-1 btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm h-12 border-none rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95"
                        >
                            <svg
                                className="w-4 h-4 stroke-[2.5]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            <span>Add to today&apos;s plan</span>
                        </button>

                        <button
                            onClick={() => saveForLater(workout)}
                            className="flex-1 btn bg-[#15181e] hover:bg-[#1f232c] border border-neutral-700 hover:border-neutral-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm h-12 rounded-xl flex items-center justify-center gap-2 active:scale-95"
                        >
                            <svg
                                className="w-4 h-4 stroke-[2]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                            <span>Save for later</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}