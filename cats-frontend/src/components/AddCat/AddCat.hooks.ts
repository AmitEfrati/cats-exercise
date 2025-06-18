import { useState, useCallback } from "react";
import { createCatApi } from "../../api/cats.api";
import type { TCat } from "../../context/cats.context";

export function useCatForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mice, setMice] = useState<string[]>([""]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
    },
    []
  );

  const handleLastNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.value);
    },
    []
  );
  const handleMouseChange = useCallback((index: number, value: string) => {
    setMice((prev) => {
      const newMice = [...prev];
      newMice[index] = value;
      return newMice;
    });
  }, []);

  const addMouseField = useCallback(() => {
    setMice((prev) => [...prev, ""]);
  }, []);

  const removeMouseField = useCallback((index: number) => {
    setMice((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setDescription("");
    setImage("");
    setMice([""]);
  }, []);

  return {
    state: {
      firstName,
      lastName,
      description,
      image,
      mice,
    },
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
  };
}

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
