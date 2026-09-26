import Link from "next/link";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
    const workoutId = workout._id || workout.id;

    // Comprehensive category & muscle group extractor
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
            return raw.map((val) => (typeof val === "object" ? val.name || "" : String(val)));
        }

        if (typeof raw === "string" && raw.trim().length > 0) {
            return raw.includes(",")
                ? raw.split(",").map((s) => s.trim())
                : [raw.trim()];
        }

        // Fallback: Infer muscle group from common exercise names if API left it empty
        const nameLower = (item.name || "").toLowerCase();
        if (nameLower.includes("bench") || nameLower.includes("chest") || nameLower.includes("push-up")) return ["CHEST", "ARMS"];
        if (nameLower.includes("squat") || nameLower.includes("lunge") || nameLower.includes("leg")) return ["LEGS"];
        if (nameLower.includes("deadlift") || nameLower.includes("pull-up") || nameLower.includes("row")) return ["BACK"];
        if (nameLower.includes("curl") || nameLower.includes("tricep") || nameLower.includes("dip")) return ["ARMS"];
        if (nameLower.includes("press") || nameLower.includes("deltoid")) return ["SHOULDERS", "ARMS"];
        if (nameLower.includes("plank") || nameLower.includes("twist") || nameLower.includes("crunch") || nameLower.includes("abs")) return ["CORE"];

        return ["FULL BODY"];
    };

    const categories = getCategories(workout);

    const calories =
        workout.calories ??
        workout.caloriesBurned ??
        workout.calorie ??
        workout.kcal ??
        0;

    const duration =
        workout.duration ??
        workout.durationMinutes ??
        workout.time ??
        0;

    const rating = workout.rating ?? "4.8";

    return (
        <Link
            href={`/workouts/${workoutId}`}
            className="group bg-[#111317] border border-[#1f232b] rounded-2xl overflow-hidden flex flex-col hover:border-neutral-700 transition-all duration-200"
        >
            <div className="relative w-full aspect-[4/3] bg-[#1a1d24] overflow-hidden">
                {workout.image ? (
                    <Image
                        src={workout.image}
                        alt={workout.name || "Workout"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                        No image
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Category Tag Pills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-[#ccff00] text-black text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wide"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    <h3 className="font-[family-name:var(--font-oswald)] font-bold text-white text-xl uppercase tracking-wide leading-tight mb-1.5">
                        {workout.name}
                    </h3>

                    <p className="text-neutral-500 text-xs tracking-normal">
                        {workout.equipment}
                    </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1c2027] flex items-center gap-5 text-neutral-400 text-xs">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5 stroke-[2] text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5 fill-current text-neutral-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2c-3 4-6 7.5-6 11a6 6 0 0 0 12 0c0-3.5-3-7-6-11z" />
                        </svg>
                        <span>{calories} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5 stroke-[2] text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}