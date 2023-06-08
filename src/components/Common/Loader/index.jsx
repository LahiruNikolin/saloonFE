import { Backdrop } from "@suid/material";
import styles from "./loader.module.css";
import { useLoader } from "../../../store";
const Loader = () => {
  const [loader, _] = useLoader();

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={loader()}>
      <div class={styles.box}>
        <div class={styles.container}>
          <span class={styles.circle}></span>
          <span class={styles.circle}></span>
          <span class={styles.circle}></span>
          <span class={styles.circle}></span>
        </div>
      </div>
    </Backdrop>
  );
};

export default Loader;
