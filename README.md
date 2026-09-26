# FitLog — Modern Workout Library & Daily Plan Tracker

A high-performance, dark-themed workout tracking web application built to help users browse exercises, configure daily routines, monitor metrics, and log training progress with high fidelity.

---

## ⚡ Short Description

**FitLog** is an exercise library and workout management dashboard developed with Next.js App Router and Tailwind CSS. It allows fitness enthusiasts to explore detailed exercise routines, curate a 5-lift daily plan with real-time metric tracking (duration and calorie expenditure), save workouts for later, and track execution status seamlessly across sessions using local browser persistence.

---

## 🛠️ Technologies Used

* **Core Framework:** Next.js (App Router, React 19)
* **Styling & UI:** Tailwind CSS, DaisyUI
* **Typography:** `next/font` (Oswald, Inter)
* **State Management:** React Context API (`WorkoutContext`)
* **Persistence Layer:** Browser LocalStorage API with SSR hydration mismatch guards
* **Notifications:** React Toastify
* **Asset Optimization:** Next.js Image Component (`next/image`)

---

## 🚀 Key Features

* **Dynamic Workout Library & Detail View:** Explore exercises across various muscle groups with responsive two-column detail views detailing equipment, difficulty, sets, reps, duration, calories burned, and step-by-step instructions.
* **Daily Plan Curation with Guardrails:** Add lifts directly to "Today's Plan" with an enforced 5-lift daily maximum to promote balanced training sessions without overtraining.
* **Live Aggregate Metric Tracking:** Real-time summary dashboard that updates total planned exercises, accumulated workout minutes, and calorie burn estimates dynamically as routines are modified.
* **Dual-State Workflow (Today's Plan vs. Saved):** Organize training regimens between immediate actionable workouts for the day and long-term routines bookmarked for future sessions.
* **Persistent Progress & Interactive Status:** Track exercise completion inline with "Mark as Done" functionality, full local storage persistence across browser reloads, and toast alerts for state updates.

---

## 📦 Getting Started

### Prerequisites

* Node.js 18.17+ or later
* npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/fitlog.git](https://github.com/your-username/fitlog.git)
   cd fitlog
