import { BiEdit } from "react-icons/bi";
import { FormData } from "./edit-entry-modal";
interface Props {
  tableData: any;
  setShowEditModal: (show: boolean) => void;
  setSelectedEntry: (data: FormData) => void;
}
export default function DataTable({
  tableData,
  setShowEditModal,
  setSelectedEntry,
}: Props) {
  return (
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
            Word
          </th>
          <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
            Translation
          </th>
          <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
            Example
          </th>
          <th className="px-6 py-3.5 text-xs font-medium text-left text-gray-500 border-b border-gray-300">
            Translated Example
          </th>
          <th className="px-6 py-3.5 text-xs font-medium text-center text-gray-500 border-b border-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item: any, index: number) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-5 text-base text-black">
              {item.wordFirstLang}
            </td>
            <td className="px-6 py-5 text-base text-black">
              {item.wordSecondLang}
            </td>
            <td className="px-6 py-5 text-base text-black">
              {item.sentenceFirstLang || "No Example!"}
            </td>
            <td className="px-6 py-5 text-base text-black">
              {item.sentenceSecondLang || "No Translated Example!"}
            </td>
            <td className="px-6 py-5 text-base text-black">
              <div className="flex justify-center items-center gap-3">
                <BiEdit
                  onClick={() => (
                    setShowEditModal(true),
                    setSelectedEntry({
                      word: item.wordFirstLang,
                      example_sentence: item.sentenceFirstLang,
                      translated_example_sentence: item.sentenceSecondLang,
                      translation: item.wordSecondLang,
                      id: Number(item.id),
                    })
                  )}
                  size={26}
                  className="text-indigo-600 cursor-pointer"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
