import { useCatsContainer } from "../state/cats.store";

export default function CatsPage() {
  const { cats } = useCatsContainer();

  if (!cats.length) return <p>Loading Cats..</p>;

  return (
    <div>
      <h1>All Cats</h1>
      {cats.map((cat) => (
        <div key={cat.id}>
          <h2>
            {cat.firstName} {cat.lastName}
          </h2>
          <img src={cat.image} alt={cat.firstName} width={150} />
          <p>{cat.description}</p>

          {cat.mice?.length ? (
            <>
              <h4>Mice:</h4>
              <ul>
                {cat.mice.map((mouse, index) => (
                  <li key={index}>{mouse.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No mice</p>
          )}
        </div>
      ))}
    </div>
  );
}
