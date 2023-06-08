import {
  Button,
  Dialog,
  ListItem,
  ListItemText,
  ListItemButton,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Chip,
  Stack,
  Box,
} from "@suid/material";

import { Fab } from "@suid/material";
import FavoriteIcon from "@suid/icons-material/Favorite";
import PendingIcon from "@suid/icons-material/Pending";
import TaskAltIcon from "@suid/icons-material/TaskAlt";
import CloseIcon from "@suid/icons-material/Close";
import PauseIcon from "@suid/icons-material/Pause";
import { ArrowBack } from "@suid/icons-material";
import { format } from "date-fns";
import styles from "../CardContainer/cardContainer.module.css";

const DetailedConsultancy = ({
  testFlag,
  open,
  onClose,
  onClick,
  data,
  onBack,
}) => {
  const openedDate = {
    char1: format(new Date(data()?.createdAt), "do"),
    char2: format(new Date(data()?.createdAt), "LLLL"),
    char3: format(new Date(data()?.createdAt), "yyyy"),
    char4: format(new Date(data()?.createdAt), "h:m a"),
  };

  console.log("openedDate", openedDate);
  return (
    <Box>
      <IconButton onClick={onBack}>
        <ArrowBack />
      </IconButton>
      <div class={styles.consultDetailsContainer}>
        <div>
          <div class={styles.entryDataContainer}>
            <div class={styles.entryInnerDataContainer}>
              <span class={styles.openActCont}>
                <div class={styles.iconContianer}>
                  <TaskAltIcon />
                </div>
                {/* {`Opened On 3rd of February on 2023 at 12.43 PM`} */}
                {`Opened On ${openedDate.char1} of ${openedDate.char2} on ${openedDate.char3} at ${openedDate.char4}`}
              </span>

              <div class={styles.verticalLiner}></div>
            </div>

            {data()?.consults?.map((consultItem) => (
              <div class={styles.treatmentInstructedDataContainer}>
                <div>
                  <div class={styles.treatmentOuterActiviesContainer}>
                    <div class={styles.treatmentSectionMarker}>
                      <div class={styles.iconContianer}>
                        <PendingIcon />
                      </div>
                    </div>

                    <div class={styles.treatmentActiviesContainerAlt}>
                      <div class={styles.treatmentActiviesRight}>
                        <span>Type:</span>
                        <span>Recommended Days:</span>
                      </div>
                      <div class={styles.treatmentActiviesLeft}>
                        <span>
                          {consultItem?.treatments.length &&
                            consultItem?.treatments
                              ?.map((item) => item.name)
                              .join(",")}
                        </span>
                        <div class={styles.daysContainer}>
                          {/* <span>27th of March 2023 </span> */}
                          <span>{format(new Date(consultItem?.afterDate), "yyyy-MM-dd")}</span>
                          <span>
                            <PauseIcon color={"#fff"} />
                          </span>
                          <span>{format(new Date(consultItem?.beforeDate), "yyyy-MM-dd")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class={styles.participateCont}>
                    <div>
                      {consultItem?.attended ? (
                        <div class={styles.participatedContainer}>
                          <Fab disabled aria-label="like">
                            <FavoriteIcon />
                          </Fab>
                          <span>Client has attended</span>
                        </div>
                      ) : (
                        "Client Participated ?"
                      )}
                    </div>
                    <div>
                      <Stack direction="row" spacing={1}>
                        {consultItem.attended ? (
                          <div>
                            <Button color="secondary">Upload</Button>
                          </div>
                        ) : (
                          <>
                            <Chip label="Yes" onClick={() => {}} />
                            <Chip
                              label="No"
                              variant="outlined"
                              onClick={() => {}}
                            />
                          </>
                        )}
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class={styles.compareResultsContainer}>
            <div>
              <Button variant="contained" disabled>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default DetailedConsultancy;
