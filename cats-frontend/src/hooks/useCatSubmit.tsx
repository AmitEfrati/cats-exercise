import { useCallback, useState } from "react";
import { CATS_URL } from "../state/cats.store";

type TCatPayload = {
  firstName: string;
  lastName: string;
  description: string;
  image: string;
  mice: { name: string }[];
};

export function useCatSubmit({
  fetchCats,
  navigate,
  resetForm,
}: {
  fetchCats: () => Promise<void>;
  navigate: (path: string) => void;
  resetForm: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (catPayload: TCatPayload, event: React.FormEvent) => {
      event.preventDefault();

      if (
        !catPayload.firstName.trim() ||
        !catPayload.lastName.trim() ||
        !catPayload.description.trim() ||
        !catPayload.image.trim()
      ) {
        alert("Please fill in all fields before submitting.");
        return;
      }
      setIsSubmitting(true);

      try {
        const response = await fetch(CATS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(catPayload),
        });
        if (!response.ok) {
          throw new Error("Failed to add cat");
        }
        const newCat = await response.json();
        console.log("Cat added successfully:", newCat);

        await fetchCats();
        navigate("/cats");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
        resetForm();
      }
    },
    [fetchCats, navigate, resetForm]
  );
  return { isSubmitting, handleSubmit };
}
