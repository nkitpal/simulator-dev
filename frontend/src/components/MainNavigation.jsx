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

  function handleClick() {
    dispatch(logoutActions());
    navigate("../login");
  }
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <h2>Game Theory</h2>
        <ul className={classes.menu}>
          {token ? (
            <>
              <li>{name}</li>
              <NavLink onClick={handleClick}>Logout</NavLink>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
