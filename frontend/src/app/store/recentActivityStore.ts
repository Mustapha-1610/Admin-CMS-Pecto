import { create } from "zustand";

interface RecentActivity {
  id: number;
  field: string;
  oldValue: string | null;
  newValue: string | null;
}

interface RecentActivityState {
  activities: RecentActivity[];
  addActivity: (activity: RecentActivity) => void;
  clearActivities: () => void;
}

export const useRecentActivityStore = create<RecentActivityState>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  clearActivities: () => set({ activities: [] }),
}));
