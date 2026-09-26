"use client";

import { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
    const [todayPlan, setTodayPlan] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const storedPlan = localStorage.getItem("fitlog_plan");
            const storedSaved = localStorage.getItem("fitlog_saved");
            if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
            if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
        } catch (e) {
            console.error(e);
        } finally {
            setMounted(true);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
            localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
        }
    }, [todayPlan, savedWorkouts, mounted]);

    const addToPlan = (workout) => {
        if (todayPlan.some((item) => item.id === workout.id)) {
            toast.error("Already in today's plan!");
            return;
        }
        if (todayPlan.length >= 5) {
            toast.error("Cap reached! Maximum 5 lifts for today.");
            return;
        }
        setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
        toast.success("Added to today's plan");
    };

    const saveForLater = (workout) => {
        if (savedWorkouts.some((item) => item.id === workout.id)) {
            toast.error("Already in saved lifts!");
            return;
        }
        setSavedWorkouts((prev) => [...prev, workout]);
        toast.success("Saved for later");
    };

    const removeFromPlan = (id) => {
        setTodayPlan((prev) => prev.filter((item) => item.id !== id));
        toast.success("Removed from plan");
    };

    const removeFromSaved = (id) => {
        setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
        toast.success("Removed from saved");
    };

    const markAsDone = (id) => {
        setTodayPlan((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isDone: !item.isDone } : item
            )
        );
        toast.success("Status updated!");
    };

    return (
        <WorkoutContext.Provider
            value={{
                todayPlan,
                savedWorkouts,
                addToPlan,
                saveForLater,
                removeFromPlan,
                removeFromSaved,
                markAsDone,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
}

export function useWorkouts() {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkouts must be used within a WorkoutProvider");
    }
    return context;
}