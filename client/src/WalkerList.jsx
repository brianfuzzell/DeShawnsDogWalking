import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then(setCities);
  }, []);

  useEffect(() => {
    const url = selectedCityId ? `/api/walkers?cityId=${selectedCityId}` : "/api/walkers";
    fetch(url)
      .then((res) => res.json())
      .then(setWalkers);
  }, [selectedCityId]);

  const handleDelete = async (id) => {
    await fetch(`/api/walkers/${id}`, { method: "DELETE" });
    setWalkers(walkers.filter((w) => w.id !== id));
  };

  return (
    <div>
      <h2>Walkers</h2>
      <select
        value={selectedCityId}
        onChange={(e) => setSelectedCityId(e.target.value)}
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <ul>
        {walkers.map((walker) => (
          <li key={walker.id}>
            <Link to={`/walkers/${walker.id}/edit`}>{walker.name}</Link>: {walker.cities.map((c) => c.name).join(", ")}{" "}
            <Link to={`/walkers/${walker.id}/dogs`}>Add Dog</Link>{" "}
            <button onClick={() => handleDelete(walker.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
