import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useGetPlaces } from "../Features/places/useGetPlaces";

function CountryList() {
  const { cities, isLoading } = useCities();
  const { isLoadingCountry, countries } = useGetPlaces();

  if (isLoading || isLoadingCountry) return <Spinner />;

  const uniqueCountries = Object.values(countries);

  if (!uniqueCountries.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  /* const countries = cities.reduce((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = { country: city.country, emoji: city.emoji };
    }
    return acc;
  }, {}); */


  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
