// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePlace } from "../Features/places/usePlace";
import { useState } from "react";
import { addPlace } from "../services/apiPlace";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

function Form() {
  const { isLoading, newPlace, error } = usePlace();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { user, isLoading: isLoadingUser } = useAuth0();
  const navigate = useNavigate();

  if (isLoading || isLoadingUser) return <Spinner />;

  const newCity = {
    ...newPlace,
    date: date.toDateString(),
    notes,
    userId: user?.nickname,
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !newCity.userId) return;
    addPlace(newCity);
    navigate("/app/cities");
  }

  if (error) return <Message message={error.message} />;
  if (!newPlace.cityName)
    return <Message message={"Start by clicking somewhere on the map!"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" name="cityName" defaultValue={newPlace.cityName} />
        <span className={styles.flag}>
          <ReactCountryFlag countryCode={newPlace.countryCode} svg />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {newPlace.cityName}?</label>
        <DatePicker
          id="date"
          name="date"
          selected={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {newPlace.cityName}
        </label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={notes}
          onChange={(e) => setNotes(e.target.value)}
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
