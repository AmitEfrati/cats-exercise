import { useState } from "react";
import { CATS_URL, useCatsStore } from "../../state/cats.store";
import { useStyle } from "./style";
import { useNavigate } from "react-router-dom";

export function AddCatPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mice, setMice] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchCats } = useCatsStore();
  const navigate = useNavigate();
  const classes = useStyle();

  const handleMouseChange = (index: number, value: string) => {
    const newMice = [...mice];
    newMice[index] = value;
    setMice(newMice);
  };

  const addMouseField = () => {
    setMice((prev) => [...prev, ""]);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDescription("");
    setImage("");
    setMice([""]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(CATS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          description,
          image,
          mice: mice
            .filter((mouse) => mouse.trim() !== "")
            .map((name) => ({ name })),
        }),
      });

      const newCat = await response.json();

      if (response.ok) {
        console.log("Cat added successfully:", newCat);
        await fetchCats();
        navigate("/cats");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className={classes.container}>
      <h1>Add a New Cat</h1>
      <form className={classes.formGroup} onSubmit={handleSubmit}>
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
              <input
                key={index}
                type="text"
                value={name}
                placeholder={`Mouse ${index + 1}`}
                onChange={(e) => handleMouseChange(index, e.target.value)}
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
