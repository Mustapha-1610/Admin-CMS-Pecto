import { BiEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import {
  MdOutlineDeleteForever,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="flex overflow-hidden flex-col mx-auto my-0 w-full      max-w-[1440px]">
          <div className="flex justify-between items-center px-24 py-4  max-md:px-6 max-md:py-4 max-sm:p-4">
            <div className="text-xl font-semibold text-gray-800">
              Content Management System
            </div>
            <div className="flex gap-2 items-center px-4 py-2.5 text-base text-white bg-indigo-600 rounded-lg cursor-pointer">
              <FaPlus />
              <span>Add New Entry</span>
            </div>
          </div>
          <div className="px-24 py-8  min-h-[calc(100vh_-_65px)] max-md:p-6">
            <div className="flex gap-4 p-4 mb-7  max-md:flex-col">
              <div className="relative flex-1">
                <i className=" absolute left-3 top-2/4 text-gray-400 -translate-y-2/4" />
                <input
                  type="text"
                  placeholder="Search words or phrases..."
                  className="py-3  pl-4 w-full text-base rounded-lg  border border-solid"
                />
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.1)] max-sm:overflow-x-auto">
              <table className="w-full border-collapse max-sm:min-w-[800px] bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3.5 text-xs font-medium tracking-wide text-left text-gray-500 uppercase ">
                      Word/Phrase
                    </th>
                    <th className="px-6 py-3.5 text-xs font-medium tracking-wide text-left text-gray-500 uppercase ">
                      Translation
                    </th>
                    <th className="px-6 py-3.5 text-xs font-medium tracking-wide text-left text-gray-500 uppercase ">
                      Example
                    </th>
                    <th className="px-6 py-3.5 text-xs font-medium tracking-wide text-left text-gray-500 uppercase ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Hello
                    </td>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Hola
                    </td>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Hello, how are you?
                    </td>
                    <td className="flex gap-3 justify-end px-6 py-5 pr-8 text-base text-black border-b border-solid border-b-gray-100">
                      <BiEdit size={23} color="black" />
                      <MdOutlineDeleteForever size={25} color="black" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Goodbye
                    </td>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Adiós
                    </td>
                    <td className="px-6 py-5 text-base text-black border-b border-solid border-b-gray-100">
                      Goodbye, see you tomorrow!
                    </td>
                    <td className="flex gap-3 justify-end px-6 py-5 pr-8 text-base text-black border-b border-solid border-b-gray-100">
                      <BiEdit size={23} color="black" />
                      <MdOutlineDeleteForever size={25} color="black" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center px-6 py-3.5 bg-white border-t border-solid border-t-gray-100 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
                <div className="text-sm text-gray-700">
                  Showing 10 of 20 results
                </div>
                <div className="flex gap-2 items-center">
                  <MdOutlineKeyboardArrowLeft
                    size={20}
                    className="cursor-pointer"
                  />

                  <button className="w-7 h-7 text-base rounded-lg text-white cursor-pointer bg-indigo-600">
                    1
                  </button>
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
