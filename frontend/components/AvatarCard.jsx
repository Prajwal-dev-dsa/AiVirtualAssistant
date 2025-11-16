/**
 * A reusable card component to display an avatar.
 *
 * @param {object} props
 * @param {string} props.imageUrl - The URL of the image to display.
 * @param {boolean} props.isSelected - Whether this card is currently selected.
 * @param {function} props.onClick - The function to call when clicked.
 */
const AvatarCard = ({ imageUrl, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        cursor-pointer
        group relative aspect-square w-full overflow-hidden rounded-2xl
        bg-gray-800 shadow-lg transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-cyan-400 
        focus:ring-offset-2 focus:ring-offset-gray-950
        ${
          isSelected
            ? "ring-4 ring-cyan-400 ring-offset-2 ring-offset-gray-950"
            : "border-2 border-gray-700 hover:scale-105 hover:border-gray-500"
        }
      `}
    >
      <img
        src={imageUrl}
        alt="Assistant Avatar"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </button>
  );
};

export default AvatarCard;
