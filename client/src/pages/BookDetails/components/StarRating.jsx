/**
 * StarRating Component
 * Displays star rating (read-only or interactive)
 * @param {number} rating - Rating value (0-5)
 * @param {string} size - Size variant ('sm', 'md', 'lg')
 * @param {boolean} interactive - Whether stars are clickable
 * @param {function} onRatingChange - Callback for rating changes (interactive mode)
 */
const StarRating = ({ rating, size = 'md', interactive = false, onRatingChange }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= fullStars;
      const isHalf = i === fullStars + 1 && hasHalfStar;

      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'} focus:outline-none`}
        >
          {isHalf ? (
            <svg
              className={`${sizeClasses[size]} text-amber-400`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#e5e7eb" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          ) : (
            <svg
              className={`${sizeClasses[size]} ${isFilled ? 'text-amber-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </button>
      );
    }

    return stars;
  };

  return <div className="flex items-center space-x-1">{renderStars()}</div>;
};

export default StarRating;
