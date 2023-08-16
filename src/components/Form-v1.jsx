// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const initialState = {
  isLoadingGeocoding: false,
  cityName: "",
  county: "",
  emoji: "",
  date: new Date(),
  notes: "",
  geoCodingError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingGeocoding: true, geoCodingError: "" };
    case "city/submitted":
      return {
        ...state,
        cityName: action.payload.city || action.payload.locality || "",
        country: action.payload.countryName,
        emoji: convertToEmoji(action.payload.countryCode),
        isLoadingGeocoding: false,
      };
    case "city/update": {
      return { ...state, [action.field]: action.value };
    }
    case "rejected":
      return {
        ...state,
        geoCodingError: action.payload,
        isLoadingGeocoding: false,
      };
    default:
      throw new Error("Action unknown");
  }
}

function Form() {
  
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const { lat, lng } = useUrlPosition();
  const [
    {
      isLoadingGeocoding,
      cityName,
      country,
      emoji,
      date,
      notes,
      geoCodingError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchCity() {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryName)
            throw new Error(
              `That that doesn't seem to be a city. Click somewhere else!`
            );

          dispatch({ type: "city/submitted", payload: data });
        } catch (error) {
          dispatch({ type: "rejected", payload: error.message });
        }
      }
      fetchCity();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  function handleInputChange(event, fieldName) {
    dispatch({
      type: "city/update",
      field: fieldName,
      value: event.target.value,
    });
  }

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map!"} />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          name="cityName"
          value={cityName}
          onChange={(e) => handleInputChange(e, e.target.name)}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          name="date"
          selected={date}
          onChange={(date) =>
            handleInputChange({ target: { value: date } }, "date")
          }
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => handleInputChange(e, e.target.name)}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
