import React from "react";
import { Transition } from "@headlessui/react";
export const ModalBody = ({ children }) => {
  return <div className="relative px-4 py-3 flex-auto">{children}</div>;
};
export const ModalFooter = ({ children }) => {
  return (
    <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-slate-200 ">
      {children}
    </div>
  );
};
export const Modal = ({ open, children, header, onHide }) => {
  return (
    <>
      {open && (
        <div className={`opacity-25 fixed inset-0 bg-black z-[49]`}></div>
      )}
      <Transition
        show={open}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0 "
        enterTo="opacity-100 "
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <div
          className={` flex justify-center items-center z-50 overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none transition-opacity duration-[200ms] ease-linear`}
        >
          <div className="relative mx-auto w-full h-full">
            <div className="border-0 shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-baseline justify-between px-4 py-1 border-b border-solid border-slate-200">
                <h3 className="text-base font-bold">{header}</h3>
                <button
                  onClick={onHide}
                  className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="bg-transparent text-black opacity-75 h-6 w-6 text-2xl  outline-none focus:outline-none flex items-center">
                    &#215;
                  </span>
                </button>
              </div>
              {/* header */}
              {children}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
