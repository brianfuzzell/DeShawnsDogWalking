import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch(`/api/dogs/${id}`)
      .then((res) => res.json())
      .then(setDog);
  }, [id]);

  if (!dog) return null;

  return (
    <>
      <h2>{dog.name}</h2>
      <p>City: {dog.cityName}</p>
      <p>Walker: {dog.walkerName ?? "No walker"}</p>
    </>
  );
}
