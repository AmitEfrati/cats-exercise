import { useCatsContext } from "../../state/cats.store";
import { useStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { MouseInput } from "../MouseInput";
import { useCatForm } from "../../hooks/useCatForm";
import { useCatSubmit } from "../../hooks/useCatSubmit";
import { useEffect } from "react";

export function AddCatPage() {
  const { actions: catsActions } = useCatsContext();
  const { fetchCats } = catsActions;
  const navigate = useNavigate();
  const classes = useStyle();
  const { state, actions: catFormActions } = useCatForm();
  const { firstName, lastName, description, image, mice } = state;
  const {
    setFirstName,
    setLastName,
    setDescription,
    setImage,
    resetForm,
    addMouseField,
    removeMouseField,
    handleMouseChange,
  } = catFormActions;

  const { isSubmitting, handleSubmit } = useCatSubmit({
    fetchCats,
    navigate,
    resetForm,
  });

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(
      {
        firstName,
        lastName,
        description,
        image,
        mice: mice
          .filter((mouse) => mouse.trim() !== "")
          .map((name) => ({ name })),
      },
      e
    );
  };

  return (
    <div className={classes.container}>
      <h1>Add a New Cat</h1>
      <form className={classes.formGroup} onSubmit={onSubmit}>
        <div>
          <label className={classes.label}> First Name: </label>
          <input
            className={classes.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className={classes.label}> Last Name: </label>
          <input
            className={classes.input}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className={classes.label}> Description: </label>
          <textarea
            className={classes.textarea}
            placeholder="Enter Cat's description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className={classes.label}> Image URL: </label>
          <input
            className={classes.input}
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className={classes.label}>Mice:</label>
          <div className={classes.miceGroup}>
            {mice.map((name, index) => (
              <MouseInput
                index={index}
                name={name}
                onChange={handleMouseChange}
                onRemove={removeMouseField}
              />
            ))}
            <button
              className={classes.addMouseButton}
              type="button"
              onClick={addMouseField}
            >
              + Add Mouse
            </button>
          </div>
        </div>
        <div>
          <button
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <button onClick={() => navigate("/cats")}>Go to cat's list</button>
    </div>
  );
}
