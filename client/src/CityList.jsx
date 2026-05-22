import { useEffect, useState } from "react";

export const CityList = () => {
  const [cities, setCities] = useState([]);
  const [newCityName, setNewCityName] = useState("");

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then(setCities);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCityName }),
    })
      .then((res) => res.json())
      .then((newCity) => {
        setCities([...cities, newCity]);
        setNewCityName("");
      });
  };

  return (
    <>
      <h2>Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCityName}
          onChange={(event) => setNewCityName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
