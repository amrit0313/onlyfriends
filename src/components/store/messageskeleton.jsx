import React from "react";

const MessageSkeleton = ({ times = 3 }) => {
  return (
    <div className="space-y-6 px-6 sm:px-4">
      {[...Array(times)].map((_, index) => {
        const isRightAligned = Math.random() > 0.5;
        return (
          <div
            key={index}
            className={`flex ${
              isRightAligned ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col space-y-4 ${
                isRightAligned ? "items-end" : "items-start"
              } animate-pulse max-w-[75%] sm:max-w-[85%]`}
            >
              <div className="w-96 h-10 bg-gray-300 rounded-lg sm:w-64 sm:h-8"></div>
              <div className="w-72 h-10 bg-gray-300 rounded-lg sm:w-48 sm:h-8"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
