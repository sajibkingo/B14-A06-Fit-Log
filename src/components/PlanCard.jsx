"use client";

import Link from "next/link";
import Image from "next/image";

export default function PlanCard({ workout, onRemove, onToggleDone, isPlanTab }) {
    const workoutId = workout._id || workout.id;

    return (
        <div
            className={`bg-[#121418] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all ${workout.isDone
                    ? "border-emerald-500/50 bg-[#0e1612]"
                    : "border-[#1f232b] hover:border-neutral-700"
                }`}
        >
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#1a1d24] rounded-xl overflow-hidden shrink-0">
                    {workout.image ? (
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                            No image
                        </div>
                    )}
                </div>

                <div>
                    <h3
                        className={`font-[family-name:var(--font-oswald)] font-bold text-lg sm:text-xl uppercase tracking-wide leading-tight ${workout.isDone ? "line-through text-neutral-500" : "text-white"
                            }`}
                    >
                        {workout.name}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-0.5">{workout.equipment}</p>

                    <div className="flex items-center gap-4 mt-3 text-neutral-400 text-xs">
                        <span className="flex items-center gap-1">
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                            </svg>
                            {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2c-3 4-6 7.5-6 11a6 6 0 0 0 12 0c0-3.5-3-7-6-11z" />
                            </svg>
                            {workout.calories} kcal
                        </span>

                        <span className="flex items-center gap-1">
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <polygon
                                    strokeWidth="2"
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                />
                            </svg>
                            {workout.rating}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1f232b]">
                <Link
                    href={`/workouts/${workoutId}`}
                    className="btn btn-sm bg-[#1a1d24] hover:bg-[#252a34] text-neutral-200 border border-neutral-700 text-xs font-bold uppercase rounded-lg"
                >
                    View Details
                </Link>

                {isPlanTab && onToggleDone && (
                    <button
                        onClick={() => onToggleDone(workoutId)}
                        className={`btn btn-sm btn-circle border-none ${workout.isDone
                                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                                : "bg-[#1a1d24] hover:bg-[#252a34] text-neutral-300 border border-neutral-700"
                            }`}
                        title={workout.isDone ? "Completed" : "Mark as Done"}
                    >
                        <svg
                            className="w-4 h-4 stroke-[3]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </button>
                )}

                <button
                    onClick={() => onRemove(workoutId)}
                    className="btn btn-sm btn-circle bg-[#1a1d24] hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 border border-neutral-700 hover:border-rose-900/60"
                    title="Remove"
                >
                    <svg
                        className="w-4 h-4 stroke-[2.5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}