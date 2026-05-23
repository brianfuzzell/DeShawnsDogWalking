import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const WalkerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [walker, setWalker] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCityIds, setSelectedCityIds] = useState([]);

  useEffect(() => {
    fetch(`/api/walkers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWalker(data);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/walkers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityIds: selectedCityIds }),
    }).then(() => navigate("/walkers"));
  };

  if (!walker) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit {walker.name}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
