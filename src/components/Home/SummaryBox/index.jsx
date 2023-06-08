import styles from "./summaryBox.module.css";
import { Card, CardContent } from "@suid/material";
import ClientDataRow from "../ClientDataRow";

function SummaryBox() {
  return (
    <div class={styles.summaryBoxMainContainer}>
      <div class={styles.summaryBoxContainer}>
        <Card classes={{ root: styles.customCard }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
            <ClientDataRow />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SummaryBox;
