import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EligibleDogs = () => {
  const { id } = useParams();
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/walkers/${id}/dogs`)
      .then((res) => res.json())
      .then(setDogs);
  }, [id]);

  const handleAssign = async (dogId) => {
    await fetch(`/api/dogs/${dogId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walkerId: id }),
    });
    navigate(`/dogs/${dogId}`);
  };

  return (
    <div>
      <h2>Eligible Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <button onClick={() => handleAssign(dog.id)}>
              {dog.name} ({dog.cityName})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
