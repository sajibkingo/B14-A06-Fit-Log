"use client";

import Image from "next/image";

export default function Hero() {
    const scrollToLibrary = () => {
        const section = document.getElementById("library");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <div className="bg-[#14161a] border border-[#23272f] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">

                <div className="flex-1 max-w-2xl z-10">
                    <p className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-6xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-6">
                        TRAIN WITH INTENT. LOG <br /> EVERY SET.
                    </h1>

                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    <button
                        onClick={scrollToLibrary}
                        className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 border-none rounded-lg shadow-lg active:scale-95"
                    >
                        BROWSE WORKOUTS
                    </button>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none">
                    <div className="relative w-full aspect-square max-w-[420px]">
                        <Image
                            src="/assets/banner.png"
                            alt="Anatomy illustration of workout training"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}