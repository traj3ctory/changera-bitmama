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

  const { client_id, redirect_uri, proxy_url } = user;

  // ================
  useEffect(() => {
    const getRepos = async (username: string) => {
      try {
        const response = await fetch(`${proxy_url}/repos`, {
          method: "POST",
          body: username,
        });
        const json = await response.json();
        dispatch({ type: SET_REPO, payload: json });
        // navigate(`/repos/${username}`);
      } catch (error) {
        console.log(error);
      }
    };
    // ================
    const handleAuth = async () => {
      setLoading(true);
      //  wait for the updated url to be loaded
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const code = searchParams.get("code");
      if (code) {
        fetch(proxy_url, {
          method: "POST",
          body: code,
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(LOGIN({ user: data, isLoggedIn: true }));
            // setUsername(data.login);
            getRepos(data.login);
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
  }, [searchParams, dispatch, proxy_url, navigate]);
  // ================

  return (
    <section className="row h_login">
      <div
        className="col-md-6 mx-auto"
      >
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
