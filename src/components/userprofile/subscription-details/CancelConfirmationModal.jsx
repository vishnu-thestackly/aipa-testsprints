import React from "react";
import cancelIcon from "../../../assets/images/cancel.png";

export default function CancelConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-2 sm:px-4">
      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-[300px]
          rounded-[20px]
          bg-white
          px-3
          py-6
          shadow-xl

          sm:max-w-[360px]
          sm:px-6
          sm:py-7

          md:max-w-[620px]
          md:min-h-[370px]
          md:p-8
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            flex
            h-[18px]
            w-[18px]
            items-center
            justify-center
            rounded-full
            bg-[#FF4D4F]
            text-[10px]
            text-white
            md:top-5
            md:right-5
          "
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          {/* Image */}
          <img
            src={cancelIcon}
            alt="Cancel"
            className="
              w-[120px]
              h-[70px]
              object-contain

              sm:w-[145px]
              sm:h-[85px]

              md:w-[190px]
              md:h-[110px]
            "
          />

          <div className="mt-5 w-full">
            {/* Title */}
            <h2
              className="
                text-center
                font-semibold
                text-[#4866F6]
                text-[18px]
                sm:text-[20px]
                md:text-[24px]
              "
            >
              Cancel Subscription
            </h2>

            {/* Description */}
            <p
              className="
                mt-3
                text-center
                text-[#8D8D8D]
                text-[12px]
                sm:text-[14px]
                md:text-[16px]
                leading-5
              "
            >
              Are you sure you want to cancel the subscription?
            </p>

            {/* Buttons */}
            <div className="mt-5 flex items-center justify-center gap-1 sm:gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="
                  w-[108px]
                  h-[38px]

                  sm:w-[145px]
                  sm:h-[42px]

                  md:w-[180px]
                  md:h-[46px]

                  rounded-full
                  border
                  border-[#4866F6]
                  bg-white
                  text-[#4866F6]
                  font-medium

                  text-[9px]
                  sm:text-[12px]
                  md:text-[14px]

                  whitespace-nowrap
                  px-1
                "
              >
                No
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="
                  w-[108px]
                  h-[38px]

                  sm:w-[145px]
                  sm:h-[42px]

                  md:w-[180px]
                  md:h-[46px]

                  rounded-full
                  bg-[#4866F6]
                  text-white
                  font-medium

                  text-[9px]
                  sm:text-[12px]
                  md:text-[14px]

                  whitespace-nowrap
                  px-1
                  disabled:opacity-50
                "
              >
                {loading ? "Please wait..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}