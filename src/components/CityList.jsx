import { useGetPlaces } from "../Features/places/useGetPlaces";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { data: places, isLoading: isLoadingCities } = useGetPlaces();

  if (isLoadingCities) return <Spinner />;
  if (!places.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {places.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
