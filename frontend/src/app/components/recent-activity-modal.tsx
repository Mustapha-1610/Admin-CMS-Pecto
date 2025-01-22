import { FaRegClock } from "react-icons/fa6";
import { useRecentActivityStore } from "../store/recentActivityStore";
import { IoClose } from "react-icons/io5";

interface Props {
  setShowActivityModal: (showModal: boolean) => void;
}
export default function RecentActivity({ setShowActivityModal }: Props) {
  const { activities, clearActivities } = useRecentActivityStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative w-3/4 max-w-3xl max-h-[80%] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
          <div className="flex space-x-2">
            <button
              className="text-red-600 hover:text-red-800"
              onClick={clearActivities}
            >
              Clear All
            </button>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => setShowActivityModal(false)}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
        {activities.length === 0 ? (
          <div className="text-center text-gray-600">
            <FaRegClock size={32} className="mx-auto mb-2" />
            No recent activity to display.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(
              activities.reduce((acc, entry) => {
                acc[entry.id] = acc[entry.id] || [];
                acc[entry.id].push(entry);
                return acc;
              }, {} as Record<string, typeof activities>)
            ).map(([id, activities]) => (
              <div
                key={id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="text-lg font-semibold text-gray-800">
                  Entry ID: {id}
                </div>
                <ul className="mt-2 space-y-2">
                  {activities.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <span className="font-medium text-blue-600">
                        {activity.field}:
                      </span>{" "}
                      {activity.oldValue} → {activity.newValue}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
