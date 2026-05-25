import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WalkerList } from "./WalkerList";

export const WalkerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [walker, setWalker] = useState(null);
  const [walkerName, setWalkerName] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCityIds, setSelectedCityIds] = useState([]);

  useEffect(() => {
    fetch(`/api/walkers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWalker(data);
        setWalkerName(data.name);
        setSelectedCityIds(data.cities.map((c) => c.id));
      });

    fetch("/api/cities")
      .then((res) => res.json())
      .then(setCities);
  }, []);

  const handleCityToggle = (cityId) => {
    if (selectedCityIds.includes(cityId)) {
      setSelectedCityIds(selectedCityIds.filter((id) => id !== cityId));
    } else {
      setSelectedCityIds([...selectedCityIds, cityId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/walkers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityIds: selectedCityIds, name: walkerName }),
    });
    navigate("/walkers");
  };

  if (!walker) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit {walker.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="walkerName">Name</label>
          <input
            id="walkerName"
            type="text"
            value={walkerName}
            onChange={(e) => setWalkerName(e.target.value)}
          />
        </div>
        {cities.map((city) => (
          <div key={city.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCityIds.includes(city.id)}
                onChange={() => handleCityToggle(city.id)}
              />
              {city.name}
            </label>
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
