import { FaRegSave, FaCheck, FaTimes } from "react-icons/fa";
import { useState } from "react";

interface SaveLocationButtonProps {
  isAuthenticated: boolean;
  isSaved: boolean;
  onSave: () => void;
  onRemove: () => void;
  hasReachedLimit: boolean;
}

export const SaveLocationButton = ({
  isAuthenticated,
  isSaved,
  onSave,
  onRemove,
  hasReachedLimit,
}: SaveLocationButtonProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  if (!isAuthenticated) return null;

  const handleClick = () => {
    if (hasReachedLimit && !isSaved) return; // limit
    if (isSaved && !isHovering) return;

    if (isSaved) {
      onRemove();
    } else {
      onSave();
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
        p-2 rounded-full transition-all duration-200
        flex items-center justify-center
        ${
          hasReachedLimit && !isSaved
            ? "text-gray-400 hover:bg-gray-100 hover:text-gray-500 cursor-not-allowed "
            : isSaved
            ? "text-green-600 hover:bg-red-50 hover:text-red-600 cursor-pointer"
            : "text-gray-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
        }
      `}
        aria-label={
          hasReachedLimit && !isSaved
            ? "Maximum saved locations reached"
            : isSaved
            ? "Remove from saved"
            : "Save location"
        }
      >
        {hasReachedLimit && !isSaved ? (
          <FaRegSave className="w-5 h-5 opacity-50" />
        ) : isSaved ? (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <FaCheck
              className={`transition-opacity duration-200 ${
                isHovering ? "opacity-0" : "opacity-100"
              }`}
            />
            <FaTimes
              className={`absolute transition-opacity duration-200 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ) : (
          <FaRegSave className="w-5 h-5" />
        )}
      </button>

      {showConfirmation && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-green-700 text-white text-xs rounded whitespace-nowrap">
          Location saved!
        </div>
      )}

      {isSaved && isHovering && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-red-600 text-white text-xs rounded whitespace-nowrap">
          Click to remove saved location
        </div>
      )}
      {hasReachedLimit && !isSaved && isHovering && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-red-600 text-white text-xs rounded whitespace-nowrap">
          Maximum reached (6/6)
        </div>
      )}
    </div>
  );
};
