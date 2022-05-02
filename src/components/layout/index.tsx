import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * @author traj3ctory
 * @function @Layout
 **/

const Layout: FC = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="container-lg container-fluid">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
