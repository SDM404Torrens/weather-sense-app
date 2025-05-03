import { FaRegSave, FaCheck } from "react-icons/fa";
import { useState } from "react";

interface SaveLocationButtonProps {
  isAuthenticated: boolean;
  isSaved: boolean;
  onSave: () => void;
  onRemove: () => void;
}

export const SaveLocationButton = ({
  isAuthenticated,
  isSaved,
  onSave,
  onRemove,
}: SaveLocationButtonProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isAuthenticated) return null;

  const handleClick = () => {
    if (isSaved) {
      onRemove();
    } else {
      onSave();
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`p-2 rounded-full  transition-colors ${
          isSaved
            ? "text-green-600 hover:text-green-700"
            : "cursor-pointer text-gray-600 hover:text-blue-700"
        }`}
        aria-label={isSaved ? "Remove from saved" : "Save location"}
      >
        {isSaved ? <FaCheck /> : <FaRegSave className="w-5 h-5" />}
      </button>

      {/* Simple confirmation tooltip */}
      {showConfirmation && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
          Location saved!
        </div>
      )}
    </div>
  );
};
