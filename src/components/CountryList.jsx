import { useGetPlaces } from "../Features/places/useGetPlaces";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList() {
  const { isLoadingCountry, countries } = useGetPlaces();

  if (isLoadingCountry) return <Spinner />;

  const uniqueCountries = Object.values(countries);

  if (!uniqueCountries.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
