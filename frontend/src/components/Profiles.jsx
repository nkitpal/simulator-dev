export default function Profiles({ student }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <p>{student.email}</p>
      <p>{student.name}</p>
      <span>{student.score}</span>
    </div>
  );
}
