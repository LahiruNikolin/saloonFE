import { createSignal, createEffect } from "solid-js";
import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import { hours } from "../../../config/miscData";
import styles from "./bookingDisplayArea.module.css";
import { getAColor } from "../../../helpers/commonFuns";
import {
  Button,
  Popover,
  Typography,
  Chip,
  LinearProgress,
  Stack,
} from "@suid/material";
import AppointmentSummaryCard from "../AppointmentSummaryCard";
import AssignmentIcon from "@suid/icons-material/Assignment";
import useWindowSize from "../../../hooks/useWindowSize";
import { StayPrimaryLandscapeOutlined } from "@suid/icons-material";

const customStyles = {
  stickyTableCell: {
    position: "sticky",
    left: 0,
    background: "white",
    borderRight: "1px solid #D8D8D8",
  },
  regularTableCell: {
    borderRight: "1px solid #D8D8D8",
    height: "30px",
    padding: " 10px 0px",
  },
};

function BookingDisplayArea({ appointments, onRefresh }) {
  const [anchorEl, setAnchorEl] = createSignal(null);
  const [selectedSession, setSelectedSession] = createSignal(null);
  const { width, height } = useWindowSize();

  const handleMapIndexToHour = (index) => {
    if (index === 12) return `12 PM - 1 PM`;
    return index > 12
      ? `${index - 12} PM - ${index - 11} PM`
      : `${index} AM - ${index + 1} AM`;
  };

  const handleClick = (event, payload) => {
    setAnchorEl(event.currentTarget);
    setSelectedSession(payload);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSession(null);
  };

  const open = () => Boolean(anchorEl());
  const id = () => (open() ? "simple-popover" : undefined);

  const handleFillRowAndInjectData = (
    primaryData,
    sessionData = { isPrimaryRow: false, session: {}, color: null }
  ) => {
    if (sessionData.isPrimaryRow) {
      const row = hours.map((item, index) =>
        sessionData.session.startTime <= index &&
        index < sessionData.session.endTime ? (
          <TableCell
            key={item.id}
            align="left"
            sx={customStyles.regularTableCell}
          >
            <div
              aria-describedby={id()}
              onClick={(e) =>
                handleClick(e, {
                  session: sessionData.session,
                })
              }
              class={styles.reservedIndicator}
              style={{ background: primaryData.color, color: "#fff" }}
            >
              {sessionData.session.startTime == index
                ? `Job code: ${sessionData.session.jobId}`
                : ""}
              {sessionData.session.startTime == index &&
              sessionData.session.isCompleted ? (
                <Chip label="Finished" color="success" />
              ) : sessionData.session.isStarted ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="secondary" />
                </Stack>
              ) : null}
            </div>
          </TableCell>
        ) : (
          <TableCell
            key={item.id}
            align="left"
            sx={customStyles.regularTableCell}
          />
        )
      );
      return [
        <TableCell key={"one"} align="left" sx={customStyles.stickyTableCell}>
          {primaryData?.name}
        </TableCell>,
        ...row,
      ];
    } else {
      const row = hours.map((item, index) =>
        sessionData.session.startTime <= index &&
        index < sessionData.session.endTime ? (
          <TableCell
            key={item.id}
            align="left"
            sx={customStyles.regularTableCell}
          >
            <div
              aria-describedby={id()}
              onClick={(e) =>
                handleClick(e, {
                  session: sessionData.session,
                })
              }
              class={styles.reservedIndicator}
              style={{ background: primaryData.color, color: "#fff" }}
            >
              {sessionData.session.startTime == index
                ? `Job code: ${sessionData.session.jobId}`
                : ""}
              {sessionData.session.startTime == index &&
              sessionData.session.isCompleted ? (
                <Chip label="Finished" color="success" />
              ) : sessionData.session.isStarted ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="secondary" />
                </Stack>
              ) : null}
            </div>
          </TableCell>
        ) : (
          <TableCell
            key={item.id}
            align="left"
            sx={customStyles.regularTableCell}
          />
        )
      );
      return [
        <TableCell
          key={"one"}
          align="left"
          sx={customStyles.stickyTableCell}
        ></TableCell>,
        ...row,
      ];
    }
  };

  const handlePopulateVaccumColumns = (
    primaryData = null,
    sessionData = { isPrimaryRow: false, session: {} }
  ) => {
    if (primaryData)
      return handleFillRowAndInjectData(primaryData, {
        isPrimaryRow: sessionData.isPrimaryRow,
        session: sessionData.session,
        color: sessionData.color,
      });
  };

  const handleContructRowsForTasks = (data, recursive = false, item = {}) => {
    if (recursive)
      return (
        <TableRow hover role="checkbox" tabIndex={-1}>
          {handlePopulateVaccumColumns(data, {
            isPrimaryRow: false,
            session: item,
          })}
        </TableRow>
      );
    else
      return data.sessions.map((item, index) => (
        <>
          {index === 0 ? (
            <TableRow hover role="checkbox" tabIndex={-1}>
              {handlePopulateVaccumColumns(data, {
                isPrimaryRow: true,
                session: item,
              })}
            </TableRow>
          ) : (
            handleContructRowsForTasks(data, true, item)
          )}
        </>
      ));
  };

  return (
    <>
      <Popover
        id={id()}
        open={!!selectedSession()}
        anchorEl={anchorEl()}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AppointmentSummaryCard
          data={selectedSession}
          onClose={handleClose}
          onRefresh={onRefresh}
        />
      </Popover>

      <Paper sx={{ width: "1100px", margin: "auto"}}>
        <TableContainer sx={{ maxHeight: height() - 170 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: 170,
                    ...customStyles.regularTableCell,
                    paddingLeft: "16px",
                  }}
                >
                  Name / Time
                </TableCell>
                {[...Array(24).keys()].map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ minWidth: 200, ...customStyles.regularTableCell }}
                  >
                    {handleMapIndexToHour(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments()?.map((item, index) => (
                <>
                  {handleContructRowsForTasks({ ...item, color: getAColor() })}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default BookingDisplayArea;
