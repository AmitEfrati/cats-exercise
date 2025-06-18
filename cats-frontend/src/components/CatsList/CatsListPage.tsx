import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMouseApi } from "../../api/mice.api";
import { useCatsContext } from "../../context/cats.context";
import { Cat } from "../Cat";
import { useStyle } from "./style";
import { useDebouncedCats } from "./CatsList.hooks";

export function CatsPage() {
  const [searchCatName, setSearchCatName] = useState("");
  const [searchMouseName, setSearchMouseName] = useState("");
  const {
    state: { cats },
    actions: { removeMouse },
  } = useCatsContext();

  useDebouncedCats(searchCatName, searchMouseName);

  const navigate = useNavigate();
  const classes = useStyle();

  const handleAddCatClick = useCallback(() => {
    navigate("/cats/add");
  }, [navigate]);

  const handleSearchCatNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCatName(e.target.value);
    },
    []
  );

  const handleSearchMouseNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchMouseName(e.target.value);
    },
    []
  );

  const handleDeleteMouse = useCallback(
    async (mouseId: number, catId: number) => {
      try {
        await deleteMouseApi(mouseId);
        removeMouse(catId, mouseId);
      } catch (error) {
        console.error("Error deleting mouse", error);
      }
    },
    [removeMouse]
  );

  return (
    <div className={classes.container}>
      <button onClick={handleAddCatClick}>+ Add New Cat</button>
      <h1>Cats List</h1>
      <div className={classes.searchBar}>
        <h3>Search Cats</h3>
        <input
          className={classes.input}
          type="text"
          value={searchCatName}
          onChange={handleSearchCatNameChange}
          placeholder="Search cat by name"
        />
        <input
          className={classes.input}
          type="text"
          value={searchMouseName}
          onChange={handleSearchMouseNameChange}
          placeholder="Search mouse by name"
        />
      </div>
      {!cats.length ? (
        <p>No cats found 🙀</p>
      ) : (
        cats.map((cat) => (
          <Cat
            key={cat.id}
            cat={cat}
            onDeleteMouse={(mouseId) => handleDeleteMouse(mouseId, cat.id)}
          />
        ))
      )}
    </div>
  );
}
