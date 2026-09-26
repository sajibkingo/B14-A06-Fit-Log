import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#080808] border-t border-[#141414] py-8 px-6 sm:px-12 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                <Link href="/" className="flex items-center gap-2.5">
                    <svg
                        className="w-5 h-5 text-[#ccff00] fill-current"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43 1.43 1.43 2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z" />
                    </svg>
                    <span className="font-black text-lg tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                <p className="text-xs text-neutral-500 tracking-wide">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
}