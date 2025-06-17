import { useCallback, useState } from "react";
import { createCatApi } from "../api/cats.api";
import type { TCat } from "../context/cats.context";

type TCatPayload = {
  firstName: string;
  lastName: string;
  description: string;
  image: string;
  mice: { name: string }[];
};

export function useCatSubmit({
  addCat,
  navigate,
  resetForm,
}: {
  addCat: (cat: TCat) => void;
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
        const newCat = await createCatApi(catPayload);
        console.log("Cat added successfully:", newCat);
        addCat(newCat);
        resetForm();
        navigate("/cats");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [addCat, navigate, resetForm]
  );
  return { isSubmitting, handleSubmit };
}
