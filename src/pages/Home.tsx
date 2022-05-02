import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

interface IProps {}

/**
 * @author traj3ctory
 * @function @Home
 **/

const Home: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  console.log(userData);
  // if (!userData.isLoggedIn) {
  //   return <navigate to="/login" />;
  // }
  useEffect(() => {
    if (userData.isLoggedIn === false) {
      return navigate("/login");
    }
  }, [userData.isLoggedIn, navigate]);

  // const { avatar_url, name, public_repos, followers, following } =
  //   userData.user;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="container">
      <button onClick={() => handleLogout()}>Logout</button>
      {/* {userData.user && (
        <div className="content">
          <img src={avatar_url} alt="Avatar" />
          <span>{name}</span>
          <span>{public_repos} Repos</span>
          <span>{followers} Followers</span>
          <span>{following} Following</span>
        </div>
      )} */}
    </div>
  );
};

export default Home;
