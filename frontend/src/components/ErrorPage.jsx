import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main>
      <h1>Error Occurred!</h1>
      <p>We can't serve you right now</p>
      <p>Please visit later</p>
      <p>Sorry for inconvenience</p>
      <NavLink to="/">Return to Dashboard</NavLink>
    </main>
  );
}
