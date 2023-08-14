import { db } from "./firebase";
import { push, ref, set, get } from "firebase/database";

export async function addPlace(newPlace) {
  try {
    const placesRef = ref(db, `places/${newPlace.userId}`);
    const newPlaceRef = push(placesRef);

    const newPlaceKey = newPlaceRef.key;
    const newPlaceData = { ...newPlace };
    console.log(newPlaceData, "from apiPlace");
    await set(newPlaceRef, newPlaceData);
    console.log("the place was successfully created");
    return { key: newPlaceKey, ...newPlaceData };
  } catch (error) {
    console.error("Error al agregar el lugar:", error);
  }
}

export async function getPlacesByUserId(userId) {
  try {
    const placesRef = ref(db, `places/${userId}`);

    const snapshot = await get(placesRef);

    if (snapshot.exists()) {
      const placesData = snapshot.val();
      const placesArray = Object.keys(placesData).map((key) => ({
        id: key,
        ...placesData[key],
      }));
      return placesArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los lugares:", error);
    throw error; // Propaga el error para manejo posterior
  }
}
