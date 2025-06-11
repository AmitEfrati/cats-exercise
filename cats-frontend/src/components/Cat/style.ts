import { createUseStyles } from 'react-jss';

export const useStyle = createUseStyles({
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
  }
})