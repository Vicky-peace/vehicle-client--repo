import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";

interface LayoutProps {
  children: React.ReactNode;  
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
