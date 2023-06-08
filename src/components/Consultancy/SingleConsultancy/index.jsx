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

import styles from "../CardContainer/cardContainer.module.css";
const Transition = function Transition(props) {
  return <Slide direction="up" {...props} />;
};

const SingleConsultancy = ({ testFlag, open, onClose, onClick, data }) => {
  return (
    <Dialog
      fullScreen
      open={open()}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{ maxWidth: "1150px", margin: "auto" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton> */}
          <Typography
            sx={{
              ml: 2,
              flex: 1,
            }}
            variant="h6"
            component="div"
            align="center"
          >
            {`Consulatancy Details - ${data().customer?.firstName} ${
              data().customer?.lastName
            }`}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box>
        <div class={styles.consultDetailsContainer}>
          <div>
            <div class={styles.entryDataContainer}>
              <div class={styles.entryInnerDataContainer}>
                <span class={styles.openActCont}>
                  <div class={styles.iconContianer}>
                    <TaskAltIcon />
                  </div>
                  {/* {`Opened On 3rd of February on 2023 at 12.43 PM`} */}
                  {`Opened On 3rd of ${data()?.createdAt}`}
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
                            <span>{consultItem?.afterDate}</span>
                            <span>
                              <PauseIcon color={"#fff"} />
                            </span>
                            <span>{consultItem?.beforeDate}</span>
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

              {/* <div class={styles.treatmentInstructedDataContainer}>
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
                        <span>Faical</span>
                        <div class={styles.daysContainer}>
                          <span>27th of March 2023 </span>
                          <span>
                            <PauseIcon color={"#fff"} />
                          </span>
                          <span>31th of March 2023 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class={styles.participateCont}>
                    <div>
                      {testFlag() ? (
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
                        {testFlag() ? (
                          <div>
                            <Button color="secondary">Upload</Button>
                          </div>
                        ) : (
                          <>
                            <Chip
                              label="Yes"
                              onClick={() => {
                                onClick(true);
                              }}
                            />
                            <Chip
                              label="No"
                              variant="outlined"
                              onClick={() => {
                                onClick(false);
                              }}
                            />
                          </>
                        )}
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>

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
                        <span>Pedicure</span>
                        <div class={styles.daysContainer}>
                          <span>5th of April 2023 </span>
                          <span>6th of April 2023 </span>
                          <span>7th of April 2023 </span>
                          <span>8th of April 2023 </span>
                          <span>9th of April 2023 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class={styles.participateCont}>
                    <span>Client Participated ?</span>
                    <div>
                      <Stack direction="row" spacing={1}>
                        <Chip label="Yes" onClick={onClick} />
                        <Chip label="No" variant="outlined" onClick={onClick} />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div> */}
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
    </Dialog>
  );
};

export default SingleConsultancy;
