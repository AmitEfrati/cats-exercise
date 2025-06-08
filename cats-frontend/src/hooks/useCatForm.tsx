import { useState, useCallback } from "react";

export function useCatForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mice, setMice] = useState<string[]>([""]);

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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDescription("");
    setImage("");
    setMice([""]);
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    description,
    setDescription,
    image,
    setImage,
    mice,
    setMice,
    handleMouseChange,
    addMouseField,
    resetForm,
    removeMouseField,
  };
}
