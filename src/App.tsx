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

interface ModalProps {
  onClose: () => void;
  character: Character;
}

function Modal({ onClose, character }: ModalProps) {
  const [favArray, setFavArray] = useState<number[]>(
    JSON.parse(localStorage.getItem("favArray") || "[]")
  );

  function handleFav(id: number) {
    let newArray: number[];

    if (favArray.some((fav) => fav === id)) {
      newArray = favArray.filter((fav) => fav !== id);
    } else {
      const oldArray = favArray;
      oldArray.push(id);
      newArray = oldArray;
    }
    setFavArray(newArray);
    localStorage.setItem("favArray", JSON.stringify(newArray));
  }

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6">
        <img src={character.image} alt="" />
        <div>
          <p>Nombre: {character.name}</p>
          <p>Genero: {character.gender}</p>
          <p>Especie: {character.species}</p>
          <p>Estado: {character.status}</p>
          <p>Origen: {character.origin.name}</p>
          <p>Ubicación: {character.location.name}</p>
          <div className="flex justify-around">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              onClick={() => handleFav(character.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {favArray.some((fav) => fav == character.id)
                ? "Quitar favorito"
                : "Favorito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Order = "A-Z" | "Z-A";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  const [order, setOrder] = useState<Order>("A-Z");

  useEffect(() => {
    if (order === "Z-A") {
      setCharacters(characters.sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (order === "A-Z") {
      setCharacters(characters.sort((a, b) => b.name.localeCompare(a.name)));
    }
  }, [order]);

  async function getData() {
    await fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) =>
        setCharacters(
          data.results.sort((a: Character, b: Character) =>
            a.name.localeCompare(b.name)
          )
        )
      )
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container">
          <header className="h-24 bg-slate-900">
            <select
              name=""
              id=""
              onChange={(e) => {
                setOrder(e.target.value as Order);
              }}
            >
              <option value="A-Z">A - Z</option>
              <option value="Z-A">Z - A</option>
            </select>
          </header>
          <div className="flex flex-wrap justify-center gap-4">
            {characters.map((c) => (
              <div
                onClick={() => {
                  setShowModal(true);
                  setSelectedCharacter(c);
                }}
                className="border flex flex-col items-center bg-green-600 w-48 p-3 rounded-xl"
              >
                <img src={c.image} alt="" className="w-44" />
                <div className="text-2xl items-center flex flex-col">
                  <p className="text-center">{c.name}</p>
                  <p>{c.species}</p>
                </div>
              </div>
            ))}
          </div>
          {showModal && selectedCharacter && (
            <Modal
              onClose={() => {
                setShowModal(false);
                setSelectedCharacter(undefined);
              }}
              character={selectedCharacter}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
