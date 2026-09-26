"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

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
        if (todayPlan.some((item) => String(item._id || item.id) === String(workout._id || workout.id))) {
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
        if (savedWorkouts.some((item) => String(item._id || item.id) === String(workout._id || workout.id))) {
            toast.warn("Workout is already saved for later!");
            return;
        }
        setSavedWorkouts((prev) => [...prev, workout]);
        toast.success("Saved for later!");
    };

    const removeFromPlan = (id) => {
        const itemToRemove = todayPlan.find((item) => String(item._id || item.id) === String(id));
        setTodayPlan((prev) => prev.filter((item) => String(item._id || item.id) !== String(id)));
        toast.info(`${itemToRemove?.name || "Workout"} removed from today's plan`);
    };

    const removeFromSaved = (id) => {
        const itemToRemove = savedWorkouts.find((item) => String(item._id || item.id) === String(id));
        setSavedWorkouts((prev) => prev.filter((item) => String(item._id || item.id) !== String(id)));
        toast.info(`${itemToRemove?.name || "Workout"} removed from saved`);
    };

    const markAsDone = (id) => {
        setTodayPlan((prev) =>
            prev.map((item) => {
                if (String(item._id || item.id) === String(id)) {
                    const nextState = !item.isDone;
                    if (nextState) {
                        toast.success(`Completed: ${item.name}!`);
                    } else {
                        toast.info(`Marked as incomplete: ${item.name}`);
                    }
                    return { ...item, isDone: nextState };
                }
                return item;
            })
        );
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