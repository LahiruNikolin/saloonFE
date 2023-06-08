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
import { createResource, createEffect, createSignal } from "solid-js";
import useFetcher from "../../hooks/useFetcher";

import treatment from "../../services/treatment";
const NewTreatment = () => {
  // const [data, { mutate, refetch }] = createResource(CONSULTANCY_SERVICES.GET);
  const [name, setName] = createSignal(null);
  const { requestInitiator } = useFetcher;

  const handlePost = async () => {
    console.log("name", name());
    if (name()) {
      await requestInitiator(() => treatment.create({ name: name() }));
      setName(null);
    }
    // treatment
    //  refetch();
  };

  createEffect(() => {
    // console.log(" inside efecrt", data());
  });

  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>
      <div style={{ padding: "17px 20px" }}>New Treatment</div>

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
                  label="Name"
                  variant="standard"
                  value={name()}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Button variant="contained" onClick={handlePost}>
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

export default NewTreatment;
