import { TCat } from "../../state/cats.store";
import { useStyle } from "./style";

type TCatProps = {
  cat: TCat;
  onDelete?: (id: number) => void;
};

export function Cat({ cat, onDelete }: TCatProps) {
  const classes = useStyle();

  return (
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
  );
}
