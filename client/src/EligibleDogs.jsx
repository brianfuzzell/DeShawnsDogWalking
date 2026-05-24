import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EligibleDogs = () => {
  const { id } = useParams();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch(`/api/walkers/${id}/dogs`)
      .then((res) => res.json())
      .then(setDogs);
  }, [id]);

  return (
    <div>
      <h2>Eligible Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name} ({dog.cityName})
          </li>
        ))}
      </ul>
    </div>
  );
};
