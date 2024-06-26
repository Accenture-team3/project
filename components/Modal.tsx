import { useState } from "react";

function Modal({ showModal, closeModal }: any) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full text-center shadow-lg border-purple border-4">
        <div className="rounded-lg p-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎉 You won!</h1>
          </div>
          <div className="rounded-lg p-4">
            <div className="inline-flex items-end">
              <h1 className="text-4xl font-bold mr-4 inline-flex">20% </h1>
              <h1 className="text-lg ">discount</h1>
            </div>
            <h1 className="text-lg mb-2 font-bold">@ Remedy Coffee</h1>
          </div>
        </div>
        <div className="flex mt-4">
          <button
            className="flex-1 py-2 bg-white text-[#9486DE] rounded-l-lg hover:bg-purple hover:text-white"
            onClick={() => console.log("Learn more")}
          >
            Learn more
          </button>
          <button
            className="flex-1 py-2 bg-[#9486DE] text-white rounded-r-lg hover:bg-purple"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
