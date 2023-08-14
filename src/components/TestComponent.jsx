import ReactDatePicker from "react-datepicker";
import { usePlace } from "../Features/places/usePlace";
import { useState } from "react";
import { addPlace } from "../services/apiPlace";
import { useAuth0 } from "@auth0/auth0-react";

function TestComponent() {
  const { isLoading, newPlace } = usePlace();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { user, isLoading: isLoadingUser } = useAuth0();

  if (isLoading || isLoadingUser) return null;

  const newCity = {
    ...newPlace,
    date: date.toDateString(),
    notes,
    userId: user?.nickname,
  };

  function handleClick() {
    if (!date || !newCity.userId) return;
    console.log(newCity.date);
    console.log(newCity);
    addPlace(newCity);
  }

  return (
    <div>
      <input type="text" value={newPlace.cityName}></input>
      <ReactDatePicker
        id="date"
        name="date"
        selected={date}
        onChange={(newDate) => setDate(newDate)}
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <button onClick={handleClick}>submit</button>
    </div>
  );
}

export default TestComponent;
