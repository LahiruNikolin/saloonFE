import { createSignal } from "solid-js";
import useFetcher from "../../../hooks/useFetcher";
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
  Avatar,
  IconButton,
} from "@suid/material";

import { ArrowBack } from "@suid/icons-material";
import CUSTOMER_SERVICE from "../../../services/customer";

const CreateCustomer = ({ onBack }) => {
  const { requestInitiator } = useFetcher;
  const [form, setForm] = createSignal({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
  });

  const handleFormState = (inputType, e) => {
    setForm((prevState) => ({ ...prevState, [inputType]: e.target.value }));
  };
  const handleSave = async () => {
    const response = await requestInitiator(() =>
      CUSTOMER_SERVICE.create(form())
    );

    handleResetForm();
  };

  const handleResetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      age: "",
      phoneNumber: "",
      email: "",
    });
  };

  const checkAllFilled = () =>
    Object.values(form()).some((item) => item === "");

  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>
      <IconButton onClick={onBack}>
        <ArrowBack />
      </IconButton>
      <div style={{ padding: "17px 20px" }}>New Customer</div>
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
                  value={form().firstName}
                  variant="standard"
                  onChange={(e) => handleFormState("firstName", e)}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  value={form().lastName}
                  variant="standard"
                  onChange={(e) => handleFormState("lastName", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Phone number"
                  value={form().phoneNumber}
                  type="number"
                  variant="standard"
                  onChange={(e) => handleFormState("phoneNumber", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Email Address"
                  value={form().email}
                  variant="standard"
                  type="email"
                  onChange={(e) => handleFormState("email", e)}
                />

                <TextField
                  id="standard-basic"
                  label="Age"
                  value={form().age}
                  variant="standard"
                  type="number"
                  onChange={(e) => handleFormState("age", e)}
                />

                {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <InputLabel id="customer-image">Image</InputLabel>

                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 76, height: 76, marginInline: 4 }}
                  />
                  <Box
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    <TextField
                      id="customer-image"
                      variant="standard"
                      type="file"
                      fullWidth
                      onChange={(e) => handleFormState("image", e)}
                    />
                  </Box>
                </Box> */}

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={checkAllFilled()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleResetForm}
                  >
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

export default CreateCustomer;
