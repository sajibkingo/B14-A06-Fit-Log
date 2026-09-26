import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ToastContainer } from "react-toastify";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${oswald.variable} ${inter.variable}`}
      data-theme="dark"
    >
      <body className="bg-[#0e0f12] text-neutral-100 min-h-screen flex flex-col font-sans antialiased">
        <WorkoutProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="dark"
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
        </WorkoutProvider>
      </body>
    </html>
  );
}