import { faStar as solidStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Rating({ rating = 0, size = 14 }) {

  const getStarIcon = (position) => {
    if (rating >= position) {
      return solidStar;
    } else if (rating >= position - 0.5) {
      return faStarHalfStroke;
    } else {
      return regularStar;
    }
  };

  return (
    <div className="flex items-center gap-1 text-yellow-400" style={{ fontSize: `${size}px` }}>
      {[1, 2, 3, 4, 5].map((position) => (
        <FontAwesomeIcon
          key={position}
          icon={getStarIcon(position)}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}
    </div>
  );
}