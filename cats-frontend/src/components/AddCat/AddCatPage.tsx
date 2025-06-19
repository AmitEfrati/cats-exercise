import { useCallback } from "react";
import { useCatsContext } from "../../context/cats.context";
import { useStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { MouseInput } from "../MouseInput";
import { useCatForm, useCatSubmit } from "./AddCat.hooks";

export function AddCatPage() {
  const {
    actions: { addCat },
  } = useCatsContext();
  const navigate = useNavigate();
  const classes = useStyle();

  const {
    state: { firstName, lastName, description, image, mice },
    actions: {
      handleNameChange,
      handleLastNameChange,
      handleDescriptionChange,
      handleImageChange,
      handleMouseChange,
      addMouseField,
      removeMouseField,
      resetForm,
    },
  } = useCatForm();

  const { isSubmitting, handleSubmit } = useCatSubmit({
    addCat,
    resetForm,
  });

  const handleGoBackButton = useCallback(() => {
    navigate("/cats");
  }, [navigate]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
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
    },
    [firstName, lastName, description, image, mice, handleSubmit]
  );

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
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label className={classes.label}> Last Name: </label>
          <input
            className={classes.input}
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label className={classes.label}> Description: </label>
          <textarea
            className={classes.textarea}
            placeholder="Enter Cat's description"
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label className={classes.label}> Image URL: </label>
          <input
            className={classes.input}
            type="text"
            value={image}
            onChange={handleImageChange}
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
      <button className={classes.button} onClick={handleGoBackButton}>
        Go to cat's list
      </button>
    </div>
  );
}
