export default function Input({ label, type, name, ...props }) {
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} {...props} />
    </p>
  );
}
