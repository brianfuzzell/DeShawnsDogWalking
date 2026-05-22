import { useEffect, useState } from "react";

export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("/api/dogs")
      .then((res) => res.json())
      .then(setDogs);
  }, []);

  return (
    <>
      <h2>Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name} — {dog.cityName} — {dog.walkerName ?? "No walker"}
          </li>
        ))}
      </ul>
    </>
  );
}
