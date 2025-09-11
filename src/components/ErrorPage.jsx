import React from "react";
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";

const ErrorPage = ({ 
  title = "Something went wrong!", 
  message = "We're sorry, but something unexpected happened. Please try again or go back to the home page.",
  onRetry,
  onGoHome,
  showRetryButton = true,
  showHomeButton = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="inline-flex rounded-full bg-red-100 p-4 text-red-600">
            <ExclamationTriangleIcon className="w-12 h-12" />
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>

        <p className="text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetryButton && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-6 py-3 font-semibold text-black rounded-lg shadow-[3px_3px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:shadow-[1px_1px_0px_0px_#4f4e4e] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Try Again
            </button>
          )}

          {showHomeButton && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-x-2 bg-transparent border-2 border-gray-500 px-6 py-3 font-semibold text-white rounded-lg hover:border-[#ae7aff] hover:text-[#ae7aff] transition-all duration-200"
            >
              <HomeIcon className="w-5 h-5" />
              Go Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;