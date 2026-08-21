export async function fetchWeather(city, lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Unable to fetch weather.");
  }

  const json = await res.json();

  return {
    temperature: json.current.temperature_2m,
    wind: json.current.wind_speed_10m,
    code: json.current.weather_code,
  };
}
