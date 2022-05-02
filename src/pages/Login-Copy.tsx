import { FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsGithub } from "react-icons/bs";
import { LOGIN, SET_REPO } from "../store/Auth";

/**
 * @author traj3ctory
 * @function @Login
 **/

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const user = useSelector((state: any) => state.auth);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const [loading, setLoading] = useState(false);
  // const [username, setUsername ] = useState("");

  const { client_id, redirect_uri, proxy_url, client_secret } = user;

  // ================
  useEffect(() => {
    const getRepos = async (username: string) => {
      fetch(
        `https://api.github.com/users/${username}/repos?type=public&per_page=20`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch({ type: SET_REPO, payload: response });
        })
        .catch((error) => {
          console.log(error);
        });
      // try {
      //   const response = await fetch(`${proxy_url}/repos`, {
      //     method: "POST",
      //     body: username,
      //   });
      //   const json = await response.json();
      //   dispatch({ type: SET_REPO, payload: json });
      //   // navigate(`/repos/${username}`);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    // ================
    const handleAuth = async () => {
      setLoading(true);
      //  wait for the updated url to be loaded
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const code = searchParams.get("code");
      if (code) {
        const data = new FormData();
        data.append("client_id", client_id);
        data.append("client_secret", client_secret);
        data.append("code", code);
        data.append("redirect_uri", redirect_uri);

        fetch(`https://github.com/login/oauth/access_token`, {
          method: "POST",
          body: data,
        })
          .then((response) => response.text())
          .then((paramsString) => {
            let params = new URLSearchParams(paramsString);
            const access_token = params.get("access_token");

            // Request to return data of a user that has been authenticated
            return fetch(`https://api.github.com/user`, {
              headers: {
                Authorization: `token ${access_token}`,
              },
            });
          })
          .then((response) => response.json())
          .then((response) => {
            dispatch(LOGIN({ user: response, isLoggedIn: true }));
            getRepos(response.login);
            navigate("/");
          })
          .catch((error) => {
            setData({
              isLoading: false,
              errorMessage: "Sorry! Login failed",
            });
          });
        // ====== fetch repo
      }
      setLoading(false);
    };
    handleAuth();
  }, [searchParams, dispatch, proxy_url, navigate, client_id, client_secret, redirect_uri]);
  // ================

  return (
    <section className="row h_login">
      <div className="col-md-6 mx-auto">
        <span>{data.errorMessage}</span>
        <div className="card card-body border-0 shadow text-center py-4">
          {loading ? (
            <div className="loader-container">
              <div className="loader">Loading</div>
            </div>
          ) : (
            <a
              className="btn btn-dark"
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              onClick={() => setData({ ...data, errorMessage: "" })}
            >
              <BsGithub />
              &nbsp;Login with Github!
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
