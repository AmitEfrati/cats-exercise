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

  //I can also do this- which is better?
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      switch (name) {
        case "firstName":
          setFirstName(value);
          break;
        case "lastName":
          setLastName(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "image":
          setImage(value);
          break;
        default:
          break;
      }
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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDescription("");
    setImage("");
    setMice([""]);
  };

  return {
    state: {
      firstName,
      lastName,
      description,
      image,
      mice,
    },
    actions: {
      setFirstName,
      setLastName,
      setDescription,
      setImage,
      setMice,
      handleMouseChange,
      addMouseField,
      resetForm,
      removeMouseField,
      handleNameChange,
      handleLastNameChange,
      handleDescriptionChange,
      handleImageChange,
      // handleInputChange,
    },
  };
}
