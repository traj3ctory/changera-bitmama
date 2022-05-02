import { FC, createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initialState, reducer } from "./store/reducer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/layout";
import NotFound from "./components/NotFound";
import "./style/index.scss";

export const AuthContext = createContext();

/**
 * @author traj3ctory
 * @function App
 **/
const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route
        path="*"
        element={<Navigate to="/" replace />}
    /> */}
          </Routes>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
