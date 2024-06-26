import React from "react";
import Link from "next/link";

export const WeeklyFront: React.FC = () => {
  return (
    <div className="absolute bottom-40 left-4 z-50 bg-white rounded-lg shadow-lg grid grid-cols-3 items-center w-64">
      <div className="overflow-hidden h-full col-span-1 rounded-l-lg">
        <img
          src="/skytower.jpg"
          alt="sky tower"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="col-span-2 px-2 pt-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-[#4A37BE]">
            Weekly destination
          </p>
          <div className="rounded-full bg-[#9486DE] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sky Tower</h3>
          <p className="text-sm text-gray-600">around 20 minutes away</p>
          <div className="flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-yellow-500 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            <p>x10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyFront;
