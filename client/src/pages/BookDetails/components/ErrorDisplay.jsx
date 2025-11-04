import { useNavigate } from 'react-router-dom';

/**
 * ErrorDisplay Component
 * Displays error messages with retry functionality
 */
const ErrorDisplay = ({ error, bookId }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const getErrorMessage = () => {
    if (error?.response?.status === 404) {
      return 'Book not found. It may have been removed or the ID is incorrect.';
    }
    if (error?.response?.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (error?.message?.includes('Network Error')) {
      return 'Connection problem. Please check your internet and try again.';
    }
    return 'An error occurred while loading the book details.';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-slate-800">Oops! Something went wrong</h1>
        <p className="mb-8 text-slate-600">{getErrorMessage()}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleRetry}
            className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Go to Home
          </button>
        </div>

        {error?.response?.data?.error && (
          <div className="mt-6 rounded-lg bg-gray-100 p-4 text-left">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Error Code:</span> {error.response.data.error.code}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
