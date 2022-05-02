import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/layout";
import NotFound from "./components/NotFound";
import "./style/index.scss";

/**
 * @author traj3ctory
 * @function App
 **/
const App: FC = () => {
  return (
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
  );
};

export default App;
