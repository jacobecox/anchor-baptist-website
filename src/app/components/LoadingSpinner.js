export default function LoadingSpinner({ size = "medium", color = "blue" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  const colorClasses = {
    blue: "text-custom-gray",
    white: "text-white",
    gray: "text-gray-600"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${colorClasses[color]}`}></div>
    </div>
  );
} 