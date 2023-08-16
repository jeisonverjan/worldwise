const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export async function getPlaceName({ lat, lng }) {
  if (!lat || !lng) return;

  try {
    const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
    const data = await res.json();
    if (!data.countryName)
      throw new Error(`That doesn't seem to be a city. Click somewhere else!`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
