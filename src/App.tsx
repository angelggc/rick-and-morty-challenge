import { useEffect, useState } from "react";

interface Character {
  id: number;
  gender: string;
  created: string;
  image: string;
  name: string;
  species: string;
  status: string;
  type: string;
  url: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  async function getData() {
    await fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {characters.map((c) => (
        <p>{c.name}</p>
      ))}
    </>
  );
}

export default App;
