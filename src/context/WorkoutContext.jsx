"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
    const [todayPlan, setTodayPlan] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Safely defer reading from localStorage after full mount
    useEffect(() => {
        const initTimer = setTimeout(() => {
            try {
                if (typeof window !== "undefined") {
                    const storedPlan = window.localStorage.getItem("fitlog_plan");
                    const storedSaved = window.localStorage.getItem("fitlog_saved");

                    if (storedPlan) {
                        const parsed = JSON.parse(storedPlan);
                        if (Array.isArray(parsed)) {
                            setTodayPlan(parsed);
                        }
                    }

                    if (storedSaved) {
                        const parsed = JSON.parse(storedSaved);
                        if (Array.isArray(parsed)) {
                            setSavedWorkouts(parsed);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to parse workouts from localStorage:", err);
            } finally {
                setIsLoaded(true);
            }
        }, 0);

        return () => clearTimeout(initTimer);
    }, []);

    // Write changes to localStorage only after initial load finishes
    useEffect(() => {
        if (!isLoaded) return;

        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
                window.localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
            }
        } catch (err) {
            console.error("Failed to write to localStorage:", err);
        }
    }, [todayPlan, savedWorkouts, isLoaded]);

    const addToPlan = (workout) => {
        if (!workout) return;
        const targetId = String(workout._id || workout.id);

        if (todayPlan.some((item) => String(item._id || item.id) === targetId)) {
            toast.warn("Workout is already in today's plan!");
            return;
        }

        if (todayPlan.length >= 5) {
            toast.error("Cap reached! Maximum 5 lifts for today.");
            return;
        }

        setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
        toast.success("Added to today's plan!");
    };

    const saveForLater = (workout) => {
        if (!workout) return;
        const targetId = String(workout._id || workout.id);

        if (savedWorkouts.some((item) => String(item._id || item.id) === targetId)) {
            toast.warn("Workout is already saved for later!");
            return;
        }

        setSavedWorkouts((prev) => [...prev, workout]);
        toast.success("Saved for later!");
    };

    const removeFromPlan = (id) => {
        const targetId = String(id);
        const itemToRemove = todayPlan.find(
            (item) => String(item._id || item.id) === targetId
        );

        setTodayPlan((prev) =>
            prev.filter((item) => String(item._id || item.id) !== targetId)
        );
        toast.info(`${itemToRemove?.name || "Workout"} removed from today's plan`);
    };

    const removeFromSaved = (id) => {
        const targetId = String(id);
        const itemToRemove = savedWorkouts.find(
            (item) => String(item._id || item.id) === targetId
        );

        setSavedWorkouts((prev) =>
            prev.filter((item) => String(item._id || item.id) !== targetId)
        );
        toast.info(`${itemToRemove?.name || "Workout"} removed from saved`);
    };

    const markAsDone = (id) => {
        const targetId = String(id);
        const item = todayPlan.find(
            (entry) => String(entry._id || entry.id) === targetId
        );

        if (!item) return;

        const willBeDone = !item.isDone;

        if (willBeDone) {
            toast.success(`Completed: ${item.name}!`);
        } else {
            toast.info(`Marked as incomplete: ${item.name}`);
        }

        setTodayPlan((prev) =>
            prev.map((entry) =>
                String(entry._id || entry.id) === targetId
                    ? { ...entry, isDone: willBeDone }
                    : entry
            )
        );
    };

    return (
        <WorkoutContext.Provider
            value={{
                todayPlan,
                savedWorkouts,
                isLoaded,
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