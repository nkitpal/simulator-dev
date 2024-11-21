export default function Profiles({ data }) {
  return data.map((value, index) => (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      key={value.id}
    >
      <div>
        <img src={value.img} alt="" />
        <div>
          <h3>{value.name}</h3>
          <span>{value.location}</span>
        </div>
      </div>
      <div>
        <span>{value.score}</span>
      </div>
    </div>
  ));
}
