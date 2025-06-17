import { useState, useCallback } from "react";

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
