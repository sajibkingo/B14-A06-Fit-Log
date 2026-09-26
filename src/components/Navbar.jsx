"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkouts } from "@/context/WorkoutContext";

export default function Navbar() {
    const pathname = usePathname();
    const { todayPlan, savedWorkouts } = useWorkouts();

    const isHome = pathname === "/";
    const isPlan = pathname === "/my-plan";

    return (
        <header className="sticky top-0 z-50 bg-[#080808] border-b border-[#141414] px-6 sm:px-12 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle btn-sm text-neutral-400 p-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content mt-3 z-[1] p-2 bg-[#121212] border border-neutral-800 rounded-lg w-40 space-y-1 shadow-2xl"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={`block px-3 py-1.5 text-xs font-semibold rounded ${isHome ? "text-[#ccff00] bg-[#1a200b]" : "text-neutral-300"
                                        }`}
                                >
                                    Workouts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/my-plan"
                                    className={`block px-3 py-1.5 text-xs font-semibold rounded ${isPlan ? "text-[#ccff00] bg-[#1a200b]" : "text-neutral-300"
                                        }`}
                                >
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-3">
                        <svg
                            className="w-6 h-6 text-[#ccff00] fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43 1.43 1.43 2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z" />
                        </svg>
                        <span className="font-black text-xl tracking-wider text-white">
                            FITLOG
                        </span>
                    </Link>
                </div>

                <nav className="hidden lg:flex items-center gap-5">
                    <Link
                        href="/"
                        className={`text-sm font-semibold transition-all ${isHome
                                ? "bg-[#181f08] text-[#ccff00] px-5 py-2 rounded-full border border-[#27330c]"
                                : "text-neutral-400 hover:text-neutral-200 px-2 py-2"
                            }`}
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`text-sm font-semibold transition-all ${isPlan
                                ? "bg-[#181f08] text-[#ccff00] px-5 py-2 rounded-full border border-[#27330c]"
                                : "text-neutral-400 hover:text-neutral-200 px-2 py-2"
                            }`}
                    >
                        My Plan
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                        <span>Plan</span>
                        <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-xs font-black flex items-center justify-center">
                            {todayPlan?.length || 0}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                        <span>Saved</span>
                        <span className="w-5 h-5 rounded-full border border-neutral-700 text-neutral-300 text-xs font-medium flex items-center justify-center">
                            {savedWorkouts?.length || 0}
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
}