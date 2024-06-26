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
            <h1 className="text-4xl font-bold mb-1 inline-flex">
              20% <h1 className="text-lg align-end">discount</h1>
            </h1>
            <p className="text-lg mb-2">@ Remedy Coffee</p>
            <div className="flex justify-center">
              <div className="border-2 border-black h-10 w-20 mb-2"></div>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          <button
            className="flex-1 py-2 bg-purple-500 text-white rounded-l-lg hover:bg-purple-700"
            onClick={() => console.log("Learn more")}
          >
            Learn more
          </button>
          <button
            className="flex-1 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-700"
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
