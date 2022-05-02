import Header from "./Header";
import Footer from "./Footer";

/**
 * @author traj3ctory
 * @function @Layout
 **/

type LayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="container-lg container-fluid content">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
