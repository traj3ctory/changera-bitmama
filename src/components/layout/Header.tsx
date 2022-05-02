import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/Auth";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Header
 **/

const Header: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          React-Github
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-end">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
