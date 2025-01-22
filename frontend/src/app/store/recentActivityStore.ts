import { create } from "zustand";

// Define the shape of a single recent activity.
interface RecentActivity {
  id: number;
  field: string;
  oldValue: string | null;
  newValue: string | null;
}

// Define the state and actions for the recent activity store.
interface RecentActivityState {
  activities: RecentActivity[]; // List of recent activities.
  addActivity: (activity: RecentActivity) => void; // Function to add a new activity.
  clearActivities: () => void; // Function to clear all activities.
}

export const useRecentActivityStore = create<RecentActivityState>((set) => ({
  activities: [], // Initial state with an empty activities array.

  // Add a new activity to the store.
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities], // Add the new activity at the start of the array.
    })),

  // Clear all activities in the store.
  clearActivities: () => set({ activities: [] }),
}));
