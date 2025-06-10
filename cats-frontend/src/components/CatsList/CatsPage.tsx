import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCatsContext } from "../../state/cats.store";
import { useStyle } from "./style";

export function CatsPage() {
  const [searchCatName, setSearchCatName] = useState("");
  const [searchMouseName, setSearchMouseName] = useState("");
  const { state } = useCatsContext();
  const { cats } = state;
  const navigate = useNavigate();
  const classes = useStyle();

  const lowerSearchCat = searchCatName.toLowerCase();
  const lowerSearchMouse = searchMouseName.toLowerCase();

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => {
      const catName = `${cat.firstName} ${cat.lastName}`.toLowerCase();
      const miceNames =
        cat.mice?.map((mouse) => mouse.name.toLowerCase()) || [];

      const matchesCat = catName.includes(lowerSearchCat);
      const matchesMouse =
        !lowerSearchMouse ||
        miceNames?.some((mouse) => mouse.includes(lowerSearchMouse));

      return matchesCat && matchesMouse;
    });
  }, [cats, lowerSearchCat, lowerSearchMouse]);

  if (!cats.length) return <p>No cats yet</p>;

  return (
    <div className={classes.container}>
      <button onClick={() => navigate("/cats/add")}>+ Add New Cat</button>
      <h1>Cats List</h1>
      <div className={classes.searchBar}>
        <h3>Search Cats</h3>
        <input
          className={classes.input}
          type="text"
          value={searchCatName}
          onChange={(e) => setSearchCatName(e.target.value)}
          placeholder="Search cat by name"
        />
        <input
          className={classes.input}
          type="text"
          value={searchMouseName}
          onChange={(e) => setSearchMouseName(e.target.value)}
          placeholder="Search mouse by name"
        />
      </div>
      {!filteredCats.length ? (
        <p>No matching cats to your search</p>
      ) : (
        filteredCats.map((cat) => (
          <div key={cat.id} className={classes.catCard}>
            <div className={classes.catHeader}>
              <img
                src={cat.image}
                alt={cat.firstName}
                className={classes.image}
                width={150}
              />

              <h2>
                {cat.firstName} {cat.lastName}
              </h2>
            </div>
            <p>{cat.description}</p>

            {cat.mice?.length ? (
              <>
                <h4>Mice:</h4>
                <ul>
                  {cat.mice.map((mouse, index) => (
                    <li key={index}>{mouse.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No mice</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
