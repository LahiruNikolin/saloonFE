import { createSignal, createEffect } from "solid-js";
import { format } from "date-fns";
import {
  Box,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Checkbox,
  ListItemText,
  IconButton,
  Alert,
  AlertTitle,
} from "@suid/material";
import useFetcher from "../../hooks/useFetcher";
import styles from "./createAppointment.module.css";
import employee from "../../services/employee";
import treatment from "../../services/treatment";
import appointment from "../../services/appointment";
import customer from "../../services/customer";
import { Phone, Badge } from "@suid/icons-material";

const [form, setForm] = createSignal({
  title: "",
  treatment: [],
  takenBy: "",
  date: "",
  from: "",
  to: "",
  customer: "",
});

const CreateAppointment = () => {
  const { requestInitiator } = useFetcher;
  const [treatments, setTreatments] = createSignal([]);
  const [employees, setEmployees] = createSignal([]);
  const [customers, setCustomers] = createSignal([]);

  const [errors, setErrors] = createSignal({
    content: "",
  });

  const handleSubmit = async () => {
    const payload = {};
    if (errors().content) return;
    if (Object.values(form()).some((state) => state === "")) return;
    payload.title = form().title;
    payload.startTime = `${form().date} ${form().from}`;
    payload.endTime = `${form().date} ${form().to}`;
    payload.scheduledDate = form().date;
    payload.treatments = form().treatment;
    payload.customer = form().customer;
    payload.employee = form().takenBy;

    const response = await requestInitiator(() => appointment.create(payload));
    handleResetForm();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
  };

  const handleFormState = (inputType, e) => {
    setForm((prevState) => ({ ...prevState, [inputType]: e.target.value }));
  };

  const handleResetForm = () => {
    setForm({
      title: "",
      treatment: [],
      takenBy: "",
      date: "",
      from: "",
      to: "",
      customer: "",
    });
    handleSetDateAsToday();
  };

  const handleGetEmployees = async () => {
    const response = await employee.fetchAll();
    setEmployees(response.data);
  };

  const handleGetTreatments = async () => {
    const response = await treatment.fetchAll();
    setTreatments(response.data);
  };

  const handleGetCustomers = async () => {
    const response = await customer.fetchAll();
    setCustomers(response.data);
  };

  const renderValueForTreatment = (selected) => {
    const selectedNames = treatments()
      .filter((treatment) => selected.includes(treatment._id))
      .map((treatment) => treatment.name);
    return selectedNames?.join(", ");
  };

  const handleSetDateAsToday = () => {
    const artificalEvent = {
      target: {
        value: format(new Date(), "yyyy-MM-dd"),
      },
    };
    handleFormState("date", artificalEvent);
  };

  createEffect(() => {
    handleGetEmployees();
    handleGetTreatments();
    handleGetCustomers();
    handleSetDateAsToday();
  });

  createEffect(() => {
    console.log("form", form());
  });

  createEffect(() => {
    if (form().to && form().from) {
      if (form().to < form().from) {
        setErrors({
          content: "Please specify the ending time after the start time",
        });
      } else {
        setErrors({
          content: "",
        });
      }
    }
  });

  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>
      <div style={{ padding: "17px 20px" }}>New Appointment</div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <Paper elevation={3}>
          <div style={{ padding: "13px 20px" }}>
            <Box>
              <Box
                component="form"
                noValidate
                autocomplete="off"
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <TextField
                  id="standard-basic"
                  label="Title"
                  variant="standard"
                  value={form().title}
                  onChange={(e) => {
                    handleFormState("title", e);
                  }}
                />

                <InputLabel id="treatment-label">Treatment</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="treatment_id"
                    id="treatment_select"
                    value={form().treatment}
                    multiple
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    renderValue={renderValueForTreatment}
                    onChange={(e) => {
                      handleFormState("treatment", e);
                    }}
                  >
                    {treatments().map((treatment) => (
                      <MenuItem value={treatment._id}>
                        <Checkbox
                          checked={form().treatment.indexOf(treatment._id) > -1}
                        />
                        <ListItemText primary={treatment.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <InputLabel id="taken_by_label">Customer</InputLabel>

                <FormControl fullWidth>
                  <Select
                    labelId="taken_by_label"
                    id="taken_by_employees"
                    value={form().customer ? form().customer : null}
                    onChange={(e) => {
                      handleFormState("customer", e);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {customers().map((customer) => (
                      <MenuItem
                        value={customer._id}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <IconButton>
                          <Badge />
                        </IconButton>
                        {`${customer.firstName} ${customer.lastName} |`}
                        <IconButton>
                          <Phone />
                        </IconButton>
                        {`${customer.phoneNumber}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <InputLabel id="taken_by_label">Assign To</InputLabel>

                <FormControl fullWidth>
                  <Select
                    labelId="taken_by_label"
                    id="taken_by_employees"
                    value={form().takenBy ? form().takenBy : null}
                    onChange={(e) => {
                      handleFormState("takenBy", e);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {employees().map((employee) => (
                      <MenuItem
                        value={employee._id}
                      >{`${employee.firstName} ${employee.lastName}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <InputLabel id="shedule-label">Scheduled On</InputLabel>
                <input
                  id="shedule-label"
                  type="date"
                  value={form().date}
                  class={styles.datePickerInput}
                  onChange={(e) => handleFormState("date", e)}
                />
                <InputLabel id="shedule-label">From</InputLabel>
                <input
                  type="time"
                  value={form().from}
                  class={styles.datePickerInput}
                  onChange={(e) => handleFormState("from", e)}
                />
                <InputLabel id="shedule-label">To</InputLabel>
                <input
                  type="time"
                  value={form().to}
                  max="04:00"
                  class={styles.datePickerInput}
                  onChange={(e) => handleFormState("to", e)}
                />

                {errors().content && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{`${errors().content}!`}</strong>
                  </Alert>
                )}

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button variant="contained" onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Clear
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default CreateAppointment;
