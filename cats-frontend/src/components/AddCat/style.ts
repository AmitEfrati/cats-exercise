import { createUseStyles } from "react-jss";

export const useStyle = createUseStyles({
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 24,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    fontFamily: 'Arial, sans-serif',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    composes: '$input',
    resize: 'vertical',
  },
  button: {
    padding: '10px 16px',
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    color: '#fff',
    backgroundColor: '#007bff',
    cursor: 'pointer',
    width: 'fit-content',
    marginTop: 10,
  },
  addMouseButton: {
    backgroundColor: '#6c757d',
    marginTop: 10,
    cursor: 'pointer',
  },
  miceGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  miceRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  }
});
