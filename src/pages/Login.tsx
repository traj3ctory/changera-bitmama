import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import GithubIcon from "mdi-react/GithubIcon";

/**
 * @author traj3ctory
 * @function @Login
 **/

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri, proxy_url } = user;

  // useEffect(() => {
  //   // After requesting Github access, Github redirects back to your app with a code parameter
  //   const url = window.location.href;
  //   const hasCode = url.includes("?code=");

  //   // If Github API returns the code parameter
  //   if (hasCode) {
  //     const newUrl = url.split("?code=");
  //     window.history.pushState({}, "", newUrl[0]);
  //     setData({ ...data, isLoading: true });

  //     const requestData = {
  //       code: newUrl[1],
  //     };

  //     // Use code parameter and other parameters to make POST request to proxy_server
  //     fetch(proxy_url, {
  //       method: "POST",
  //       body: JSON.stringify(requestData),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         dispatch({
  //           type: "LOGIN",
  //           payload: { user: data, isLoggedIn: true },
  //         });
  //       })
  //       .catch((error) => {
  //         setData({
  //           isLoading: false,
  //           errorMessage: "Sorry! Login failed",
  //         });
  //       });
  //   }
  // }, [user, dispatch, data, proxy_url]);

  // if (user.isLoggedIn) {
  //   return navigate("/");
  // }

  return (
    <section className="row">
      <div className="col-md-6 mx-auto">
        <span>{data.errorMessage}</span>
        <div className="card card-body border-0 shadow-sm">
          {data.isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              <a
                className="btn btn-dark"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                onClick={() => {
                  setData({ ...data, errorMessage: "" });
                }}
              >
                {/* <GithubIcon /> */}
                <span>Login with GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
