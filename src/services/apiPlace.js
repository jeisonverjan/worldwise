import { db } from "./firebase";
import { push, ref, set, get, remove } from "firebase/database";

export async function addPlace(newPlace) {
  try {
    const placesRef = ref(db, `places/${newPlace.userId}`);
    const newPlaceRef = push(placesRef);
    const newPlaceKey = newPlaceRef.key;
    const newPlaceData = { ...newPlace };

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
    throw error;
  }
}

export async function getPlaceById(userId, placeId) {
  try {
    const placeRef = ref(db, `places/${userId}/${placeId}`);

    const snapshot = await get(placeRef);
    if (snapshot.exists()) {
      const placeData = snapshot.val();
      return placeData;
    } else {
      console.log("No se encontró el lugar con el ID proporcionado.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el lugar:", error);
    throw error;
  }
}

export async function deletePlace({ userId, placeId }) {
  try {
    const placeRef = ref(db, `places/${userId}/${placeId}`);

    await remove(placeRef);
    console.log("Place successfully deleted");
  } catch (error) {
    throw new Error("Error deleting the place.");
  }
}
