import { createUseStyles } from "react-jss";

export const useStyle = createUseStyles({
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },
  searchBar: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  input: {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
    flex: 1,
  },
  catName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
  },
  description: {
    margin: "12px 0",
  },
});
