import styles from "./layout.module.css";
import Header from "../Common/Header";
import Loader from "../Common/Loader";
function Layout({ children }) {
  return (
    <div class={styles.mainLayoutContainer}>
      <Loader />
      <Header />
      {children}
    </div>
  );
}

export default Layout;
