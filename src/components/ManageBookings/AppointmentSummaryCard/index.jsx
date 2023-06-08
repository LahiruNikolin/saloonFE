import {
  Button,
  Popover,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@suid/material";

import { Delete, Send, Stop, PlayArrow } from "@suid/icons-material";
import APPOINTMENT_SERVICE from "../../../services/appointment";
import useFetcher from "../../../hooks/useFetcher";

import { convertTo12HourFormat } from "../../../utils/helpers";

const AppointmentSummaryCard = ({ data, onClose, onRefresh }) => {
  const { requestInitiator } = useFetcher;
  const handleStart = async (data) => {
    onClose();
    await requestInitiator(() => APPOINTMENT_SERVICE.updateJobStatus(data));
    onRefresh();
  };

  const handleComplete = async (data) => {
    onClose();
    await requestInitiator(() => APPOINTMENT_SERVICE.updateJobStatus(data));
    onRefresh();
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 20px 0 20px",
        }}
      >
        <Typography sx={{ p: 2 }} variant="body3" gutterBottom>
          Appointment Summary
        </Typography>
      </Box>
      <Divider component="li" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px 20px 0 20px",
        }}
      >
        <Typography variant="body5">Job Id: {data().session.jobId}</Typography>
        <Typography variant="body4">
          Start Time: {convertTo12HourFormat(data().session.startTime)}
        </Typography>
        <Typography variant="subtitle1">
          End Time: {convertTo12HourFormat(data().session.endTime)}
        </Typography>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<PlayArrow />}
              disabled={data().session.isCompleted}
              onClick={() => {
                handleStart({
                  appointmentId: data().session.appointmentId,
                  type: "jobStatus",
                  isStarted: true,
                });
              }}
            >
              start
            </Button>
            <Button
              variant="contained"
              endIcon={<Stop />}
              onClick={() => {
                handleComplete({
                  appointmentId: data().session.appointmentId,
                  type: "jobStatus",
                  isCompleted: true,
                });
              }}
              disabled={data().session.isCompleted}
            >
              done
            </Button>
          </Stack>
        </Box>
        <TableContainer>
          <Typography variant="body3">Treatments:</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data().session.treatments.map((treatment, index) => (
                <TableRow key={index}>
                  <TableCell>{treatment.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AppointmentSummaryCard;
