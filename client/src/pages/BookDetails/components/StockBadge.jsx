/**
 * StockBadge Component
 * Displays stock availability status
 */
const StockBadge = ({ stock }) => {
  if (stock === 0) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex h-3 w-3 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
        </div>
        <span className="text-sm font-semibold text-red-600">Out of Stock</span>
      </div>
    );
  }

  if (stock <= 10) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex h-3 w-3 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
        </div>
        <span className="text-sm font-semibold text-amber-600">
          Only {stock} left in stock
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-3 w-3 items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
      </div>
      <span className="text-sm font-semibold text-green-600">In Stock</span>
    </div>
  );
};

export default StockBadge;
