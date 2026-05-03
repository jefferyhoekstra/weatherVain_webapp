import { useEffect, useMemo, useState } from "react";

const LOCATION = {
  name: "London",
  latitude: 51.5072,
  longitude: -0.1276,
};

export default function TownWeather() {
  const [status, setStatus] = useState("");
  const [weather, setWeather] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const weatherUrl = useMemo(() => {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(LOCATION.latitude));
    url.searchParams.set("longitude", String(LOCATION.longitude));
    url.searchParams.set("current", "temperature_2m,wind_speed_10m");
    url.searchParams.set("temperature_unit", "celsius");
    url.searchParams.set("wind_speed_unit", "kmh");
    return url.toString();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
          throw new Error(`Weather request failed (${response.status})`);
        }

        const data = await response.json();
        const current = data?.current;

        if (!current) {
          throw new Error("Weather response missing current data");
        }

        if (cancelled) return;

        setWeather({
          time: current.time ?? null,
          temperatureC: current.temperature_2m ?? null,
          windSpeedKmh: current.wind_speed_10m ?? null,
        });
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
        setStatus("error");
      }
    }

    loadWeather();
    return () => {
      cancelled = true;
    };
  }, [weatherUrl]);

  return (
    <section className="townweather">
      <h2>{LOCATION.name} Weather</h2>

      {status === "loading" && <p>Loading weather…</p>}

      {status === "error" && (
        <p>
          Could not load weather.
          {errorMessage ? ` ${errorMessage}` : ""}
        </p>
      )}

      {status === "ready" && weather && (
        <div>
          <p>Temperature: {weather.temperatureC}°C</p>
          <p>Wind: {weather.windSpeedKmh} km/h</p>
          {weather.time && <p>As of: {weather.time}</p>}
        </div>
      )}
    </section>
  );
}
