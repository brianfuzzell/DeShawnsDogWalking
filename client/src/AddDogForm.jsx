import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddDogForm = () => {
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        if (data.length > 0) {
          setCityId(data[0].id);
        }
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cityId }),
    });
    const newDog = await res.json();
    navigate(`/dogs/${newDog.id}`);
  };

  return (
    <>
      <h2>Add a Dog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={cityId}
            onChange={(e) => setCityId(parseInt(e.target.value))}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Dog</button>
      </form>
    </>
  );
};
