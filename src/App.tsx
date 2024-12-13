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
      <div className="flex justify-center">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {characters.map((c) => (
              <div className="border flex flex-col items-center bg-green-600 w-48 p-3">
                <img src={c.image} alt="" className="w-44" />
                <div className="text-2xl items-center flex flex-col">
                  <p className="text-center">{c.name}</p>
                  <p>{c.species}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
