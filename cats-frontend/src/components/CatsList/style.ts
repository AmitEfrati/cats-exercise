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
  catCard: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    background: "#f9f9f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  catHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #ccc",
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
