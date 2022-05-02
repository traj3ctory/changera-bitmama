import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

  return (
    <>
      {userData.isLoggedIn === true ? (
        <div className="row">
          <div className="col-md-3 mb-3">
            <img
              src={userData?.user.avatar_url}
              alt={userData?.user.name}
              className="img-fluid rounded-circle mb-3"
              width={300}
              height={300}
            />
            <h4>{userData?.user.name}</h4>
            <p>{userData?.user.login}</p>
            <button className="btn btn-light shadow-sm mb-3 w-100">
              Edit profile
            </button>
            <p>
              <FiUsers />
              &nbsp;{userData?.user.followers}&nbsp;followers.&nbsp;{userData?.user.following}&nbsp;following
            </p>
            <h6>
              <BiMap />
              &ensp;{userData?.user.location}
            </h6>
            <h6>
              <BsLink45Deg />
              &ensp;{userData?.user.blog}
            </h6>
          </div>
          <div className="className col-md-9 mb-3">
            <List repos={userData?.user.userData.repos} />
          </div>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};

export default Home;
