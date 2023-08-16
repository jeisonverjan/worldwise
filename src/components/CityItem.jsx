import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { cityName, countryCode: emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  //console.log(currentCity);

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
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
