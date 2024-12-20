import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logoutActions } from "../store/user";

export default function MainNavigation() {
  const userData = useSelector((state) => state.myUser.userData);

  const token = userData?.token;
  const name = userData?.name;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutActions());
    navigate("../login");
  }

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <h2>Game Theory</h2>
        <ul className={classes.menu}>
          {token && (
            <ul>
              <li><NavLink to="/">{name}</NavLink></li>
              <NavLink to="/question">Question</NavLink>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
}
