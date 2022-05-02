// import { FC } from "react";

// interface IProps {}

// /**
//  * @author traj3ctory
//  * @function @Home
//  **/

// const Home: FC<IProps> = (props) => {
//   return <div>Home</div>;
// };

// export default Home;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";


export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  // if (!state.isLoggedIn) {
  //   return <navigate to="/login" />;
  // }
  useEffect(() => {
    if (!state.isLoggedIn) {
      return navigate("/login");
    }
  }, [state.isLoggedIn, navigate]);

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <div className="container">
      <button onClick={() => handleLogout()}>Logout</button>
      <div>
        <div className="content">
          <img src={avatar_url} alt="Avatar" />
          <span>{name}</span>
          <span>{public_repos} Repos</span>
          <span>{followers} Followers</span>
          <span>{following} Following</span>
        </div>
      </div>
    </div>
  );
}