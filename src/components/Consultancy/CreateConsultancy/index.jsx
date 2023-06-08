import { createSignal, createEffect } from "solid-js";
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
  Avatar,
  IconButton,
  Button,
} from "@suid/material";

import shortid from "shortid";

import { ArrowBack, Phone, Badge, Add } from "@suid/icons-material";

import CUSTOMER_SERVICE from "../../../services/customer";
import TREATMENT_SERVICE from "../../../services/treatment";
import CONSULTANCY_SERVICE from "../../../services/consultancy";
import ConsultItem from "../ConsultItem";

const CreateConsultancy = ({ onBack }) => {
  const { requestInitiator } = useFetcher;
  const [customers, setCustomers] = createSignal([]);
  const [treatments, setTreatments] = createSignal([]);
  const [form, setForm] = createSignal({
    goal: "",
    customer: "",
  });

  const [consults, setConsults] = createSignal([]);
  //structure
  //   [
  //     {
  //       id: null,
  //       claimed: false,
  //       data: {
  //         afterDate: "",
  //         beforeDate: "",
  //         treatments: [],
  //       },
  //     },
  //   ]
  const handleFormState = (inputType, e) => {
    setForm((prevState) => ({ ...prevState, [inputType]: e.target.value }));
  };
  const handleSave = async () => {
    const payload = {
      ...form(),
      consults: consults().map((item) => ({
        id: item.id,
        timeStamp: item.timeStamp,
        ...item.data,
      })),
    };
    const response = await requestInitiator(() =>
      CONSULTANCY_SERVICE.create(payload)
    );

    handleResetForm();
  };

  const handleGetCustomers = async () => {
    const response = await CUSTOMER_SERVICE.fetchAll();
    setCustomers(response.data);
  };

  const handleGetTreatments = async () => {
    const response = await TREATMENT_SERVICE.fetchAll();
    setTreatments(response.data);
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

  const handleAddConsultPackage = () => {
    setConsults((prevState) => [
      ...prevState,
      {
        id: shortid.generate(),
        claimed: false,
        data: null,
        timeStamp: Date.now(),
      },
    ]);
  };

  const handlePopulateConsultData = (id, type, e) => {
    const relatedExistingItem = consults().find((item) => item.id === id);

    let newRay = consults().filter((item) => item.id !== id);

    newRay = [
      ...newRay,
      {
        ...relatedExistingItem,
        data: { ...relatedExistingItem.data, [type]: e.target.value },
      },
    ];

    setConsults(newRay);
  };

  const checkAllFilled = () =>
    Object.values(form()).some((item) => item === "");

  createEffect(() => {
    handleGetCustomers();
    handleGetTreatments();
  });

  const checkSaveIsDisable = () => {
    if (Object.values(form()).some((item) => item === "")) return true;
    if (!consults().length) return true;
    for (const consultItem of consults()) {
      if (!consultItem?.data) return true;
      if (Object.keys(consultItem.data)?.length < 3) return true;
      if (!consultItem.data?.treatments.length) return true;
      if (Object.values(consultItem.data).some((item) => item === ""))
        return true;
    }
    return false;
  };

  createEffect(() => {
    // console.log("custimers", customers());
    // console.log(shortid.generate());
  });

  createEffect(() => {});

  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>
      <IconButton onClick={onBack}>
        <ArrowBack />
      </IconButton>
      <div style={{ padding: "17px 20px" }}>New Consultancy Package</div>
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  pt: 2,
                }}
              >
                <InputLabel id="taken_by_employees-label">Goal</InputLabel>
                <TextField
                  id="standard-basic"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={form().firstName}
                  variant="standard"
                  onChange={(e) => handleFormState("goal", e)}
                />

                <InputLabel id="taken_by_employees-label">Client</InputLabel>
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

                {consults()
                  .sort((x, y) => x.timeStamp - y.timeStamp)
                  .map((consult) => (
                    <ConsultItem
                      onChange={handlePopulateConsultData}
                      id={consult.id}
                      treatments={treatments}
                      data={consult.data}
                    />
                  ))}

                <Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddConsultPackage}
                  >
                    Add a consulant
                  </Button>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={checkSaveIsDisable()}
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

export default CreateConsultancy;
