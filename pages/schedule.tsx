import React from "react";
import Navbar from "@/components/navbar/NavBar";

const Schedule: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white w-screen">
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold">Schedule</h1>
        <i className="bi bi-bell-fill text-xl"></i>
      </header>
      <main className="flex-grow p-4 h-screen flex items-center w-full">
        <div className="max-w-3xl w-full">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Select date</h2>
            <div className="mt-2 text-2xl">Thursday, Jun 27</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>June 2024</span>
              <div>
                <button>&lt;</button>
                <button>&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              {Array.from({ length: 31 }, (_, day) => (
                <div
                  key={day}
                  className={`p-2 rounded-full ${
                    day === 16
                      ? "bg-purple-700 text-white"
                      : day === 4
                      ? "border-2 border-purple-700"
                      : ""
                  }`}
                >
                  {day + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="bg-purple-700 text-white p-2 rounded-full">
                <i className="bi bi-bell-fill text-xl"></i>
              </div>
              <div className="ml-4">
                <div className="text-sm text-purple-700">
                  Thursday 27th June
                </div>
                <div className="text-lg font-semibold">
                  from Britomart Station to University of Auckland
                </div>
                <div className="text-sm">x2</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Schedule;
