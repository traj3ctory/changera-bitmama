import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List";
import { FiUsers } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Home
 **/

const Home: FC<IProps> = (props) => {
  const userData = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.isLoggedIn === false) {
      return navigate("/login");
    }
  }, [userData, navigate]);

  if (userData.isLoggedIn === false) {
    navigate("/login");
  }
  const { avatar_url, name, login, followers, following, location, blog } =
    userData.user;

  return (
    <>
      {userData.isLoggedIn === true ? (
        <div className="row">
          <div className="col-md-3 mb-3">
            <img
              src={avatar_url}
              alt={name}
              className="img-fluid rounded-circle mb-3"
              width={300}
              height={300}
            />
            <h4>{name}</h4>
            <p>{login}</p>
            <button className="btn btn-light shadow-sm mb-3 w-100">
              Edit profile
            </button>
            <p>
              <FiUsers />
              &nbsp;{followers}&nbsp;followers.&nbsp;{following}&nbsp;following
            </p>
            <h6>
              <BiMap />
              &ensp;{location}
            </h6>
            <h6>
              <BsLink45Deg />
              &ensp;{blog}
            </h6>
          </div>
          <div className="className col-md-9 mb-3">
            <List repos={userData.repos} />
          </div>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};

export default Home;
