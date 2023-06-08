import styles from "./controlsContainer.module.css";
import { format } from "date-fns";

function ControlsContainer({ handleDateChange, viewingDate }) {
  handleDateChange(format(new Date(), "yyyy-MM-dd"), true);

  return (
    <div class={styles.controlMainContainer}>
      <div>Showing Shedule for</div>
      <input
        type="date"
        value={viewingDate()}
        class={styles.datePickerInput}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default ControlsContainer;
