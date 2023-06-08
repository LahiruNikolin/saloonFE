import { createSignal } from "solid-js";
import {
  Box,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  Button,
} from "@suid/material";

import employee from "../../services/employee";
import useFetcher from "../../hooks/useFetcher";

const AddEmployee = () => {
  const [form, setForm] = createSignal({
    firstName: "",
    lastName: "",
    birthDay: "6576547434",
    phoneNumber: "",
    email: "",
    salary: 0,
  });

  const { requestInitiator } = useFetcher;
  const handleSave = async () => {
    const response = await requestInitiator(() => employee.create(form()));
    handleResetForm();
  };

  const handleResetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      birthDay: "",
      phoneNumber: "",
      email: "",
      salary: 0,
    });
  };

  const handleFormState = (inputType, e) => {
    setForm((prevState) => ({ ...prevState, [inputType]: e.target.value }));
    console.log("date", e.target.value);
  };
  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>
      <div style={{ padding: "17px 20px" }}>New Employee</div>

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
                  label="First Name"
                  variant="standard"
                  onChange={(e) => handleFormState("firstName", e)}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={(e) => handleFormState("lastName", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Phone number"
                  variant="standard"
                  onChange={(e) => handleFormState("phoneNumber", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Email Address"
                  variant="standard"
                  onChange={(e) => handleFormState("email", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Salary"
                  variant="standard"
                  type="number"
                  onChange={(e) => handleFormState("salary", e)}
                />

                <InputLabel id="birth-date">Birth Date</InputLabel>

                <TextField
                  id="birth-date"
                  variant="standard"
                  type="date"
                  onChange={(e) => handleFormState("birthDay", e)}
                />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button variant="contained" onClick={handleSave}>
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

export default AddEmployee;
