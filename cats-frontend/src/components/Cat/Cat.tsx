import { useMemo } from "react";
import type { TCat } from "../../context/cats.context";
import { useStyle } from "./style";

type TCatProps = {
  cat: TCat;
  onDeleteMouse?: (id: number) => void;
};

export function Cat({ cat, onDeleteMouse }: TCatProps) {
  const classes = useStyle();

  const deleteHandlers = useMemo(() => {
    const map: Record<number, () => void> = {};
    if (onDeleteMouse && cat.mice) {
      for (const mouse of cat.mice) {
        if (mouse.id != null) {
          map[mouse.id] = () => onDeleteMouse(mouse.id!);
        }
      }
    }
    return map;
  }, [onDeleteMouse, cat.mice]);

  return (
    <div className={classes.catCard}>
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
            {cat.mice.map((mouse) => (
              <li key={mouse.id}>
                {mouse.name}{" "}
                {onDeleteMouse && mouse.id != null && (
                  <button
                    className={classes.deleteButton}
                    onClick={deleteHandlers[mouse.id]}
                  >
                    Delete Mouse
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No mice</p>
      )}
    </div>
  );
}
