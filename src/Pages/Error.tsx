import type React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const Error: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error;

    const getErrorMessage = () => {
      switch (status) {
        case 404:
          return {
            title: "404 - Not Found",
            message: "The page you're looking for doesn't exist."
          };
        case 500:
          return {
            title: "500 - Server Error",
            message: "Something went wrong on our end. Please try again later."
          };
        default:
          return {
            title: `Error ${status}`,
            message: statusText || "An unexpected error occurred."
          };
      }
    };

    const { title, message } = getErrorMessage();

    return (
      <div className="flex flex-col h-screen items-center justify-center text-center">
        <h1 className="text-red-600 text-4xl font-bold">{title}</h1>
        <p className="text-2xl mt-2">{message}</p>
      </div>
    );
  }

  // Fallback for unexpected errors
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center">
      <h1 className="text-red-600 text-4xl font-bold">Oops!</h1>
      <p className="text-2xl mt-2">An unexpected error occurred.</p>
    </div>
  );
};
