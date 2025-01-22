import { FaFileSignature } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-24 py-3 max-md:px-6 max-md:py-4 max-sm:p-4">
      <div className="text-xl font-semibold text-gray-800">
        Content Management System
      </div>
      <div className="flex gap-2 items-center px-4 py-2.5 text-base text-white bg-gray-700 rounded-lg cursor-pointer">
        <FaFileSignature size={22} />
        <span>Recent Activity</span>
      </div>
    </div>
  );
}
