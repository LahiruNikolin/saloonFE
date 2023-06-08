import styles from "./controls.module.css";
import LibraryAddIcon from "@suid/icons-material/LibraryAdd";
import ViewTimelineIcon from "@suid/icons-material/ViewTimeline";
import BubbleChartIcon from "@suid/icons-material/BubbleChart";
import ManageSearchIcon from "@suid/icons-material/ManageSearch";
import { Fab } from "@suid/material";

function Controls() {
  return (
    <div class={styles.homeHeroContainer}>
      <div class={styles.ControlBtnContainer}>
        <Fab variant="extended">
          <LibraryAddIcon sx={{ mr: 1 }} />
          Create Appointment
        </Fab>
      </div>
      <div class={styles.ControlBtnContainer}>
        <Fab variant="extended">
          <ViewTimelineIcon sx={{ mr: 1 }} />
          Today's Appointment
        </Fab>
      </div>
      <div class={styles.ControlBtnContainer}>
        <Fab variant="extended">
          <BubbleChartIcon sx={{ mr: 1 }} />
          Examine a date
        </Fab>
      </div>
      <div class={styles.ControlBtnContainer}>
        <Fab variant="extended">
          <ManageSearchIcon sx={{ mr: 1 }} />
          Search Clients
        </Fab>
      </div>
    </div>
  );
}

export default Controls;
