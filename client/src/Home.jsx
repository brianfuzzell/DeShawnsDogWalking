import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("/api/dogs")
      .then((res) => res.json())
      .then(setDogs);
  }, []);

  return (
    <>
      <h2>Dogs</h2>
      <Link to="/dogs/add">Add Dog</Link>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <Link to={`/dogs/${dog.id}`}>{dog.name}</Link> — {dog.cityName} — {dog.walkerName ?? "No walker"}
          </li>
        ))}
      </ul>
    </>
  );
}
