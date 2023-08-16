import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { usePlaceContext } from "../contexts/PlaceContext";
import { useDeletePlace } from "../Features/places/useDeletePlace";
import Spinner from "./Spinner";
import { useAuth0 } from "@auth0/auth0-react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { lastVisitedPlaceId } = usePlaceContext();
  const { isLoading: isDeleting, deletePlaceMutation } = useDeletePlace();
  const { user, isLoading: isLoadingUser } = useAuth0();
  const { cityName, countryCode: emoji, date, id, position } = city;

  if (isDeleting || isLoadingUser) return <Spinner />;

  function handleClick(e) {
    e.preventDefault();
    deletePlaceMutation({ userId: user.nickname, placeId: id });
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === lastVisitedPlaceId?.key ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          <ReactCountryFlag countryCode={emoji} svg />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
