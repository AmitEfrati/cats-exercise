import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCatsApi } from "../../api/cats.api";
import { TCat, useCatsContext } from "../../state/cats.store";
import { Cat } from "../Cat/Cat";
import { useStyle } from "./style";

export function CatsPage() {
  const [searchCatName, setSearchCatName] = useState("");
  const [searchMouseName, setSearchMouseName] = useState("");
  const [filteredCats, setFilteredCats] = useState<TCat[]>([]);
  const { state } = useCatsContext();
  const { cats } = state;
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

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await fetchCatsApi(searchCatName, searchMouseName);
        setFilteredCats(cats);
      } catch (error) {
        console.error("Error fetching cats", error);
        setFilteredCats([]);
      }
    };
    fetchCats();
  }, [searchCatName, searchMouseName]);

  if (!cats.length) return <p>No cats yet 🙀</p>;

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
      {!filteredCats.length ? (
        <p>No matching cats to your search</p>
      ) : (
        filteredCats.map((cat) => <Cat key={cat.id} cat={cat} />)
      )}
    </div>
  );
}
