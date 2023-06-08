import styles from "./clientDataRow.module.css";
import { Typography } from "@suid/material";

function ClientDataRow() {
  return (
    <div class={styles.clientDataRowContainer}>
      <Typography component="div" variant="h5">
        Mr. Dilki Premasiri
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        @ 9.15 AM
      </Typography>
    </div>
  );
}

export default ClientDataRow;
