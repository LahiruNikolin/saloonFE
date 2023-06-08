import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@suid/material";

import styles from "./consultItem.module.css";

const ConsultItem = ({ onChange, id, treatments, data }) => {
  console.log("data", data);

  const handleStateUpdate = (type, e) => {
    onChange(id, type, e);
  };
  const renderValueForTreatment = (selected) => {
    const selectedNames = treatments()
      .filter((treatment) => selected.includes(treatment._id))
      .map((treatment) => treatment.name);
    return selectedNames?.join(", ");
  };

  return (
    <Box
      component="form"
      noValidate
      autocomplete="off"
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <InputLabel id="shedule-label">After</InputLabel>
      <input
        id="shedule-label"
        value={data?.afterDate}
        type="date"
        class={styles.datePickerInput}
        onChange={(e) => {
          handleStateUpdate("afterDate", e);
        }}
      />

      <InputLabel id="shedule-label">Before</InputLabel>
      <input
        id="shedule-label"
        type="date"
        value={data?.beforeDate}
        class={styles.datePickerInput}
        onChange={(e) => {
          handleStateUpdate("beforeDate", e);
        }}
      />

      <InputLabel id="treatment-label">Treatments</InputLabel>
      <FormControl fullWidth>
        <Select
          labelId="treatment_id"
          id="treatment_select"
          value={data?.treatments ?? []}
          multiple
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          renderValue={renderValueForTreatment}
          onChange={(e) => {
            handleStateUpdate("treatments", e);
          }}
        >
          {treatments().map((treatment) => (
            <MenuItem value={treatment._id}>
              <Checkbox
                checked={data?.treatments?.indexOf(treatment._id) > -1}
              />
              <ListItemText primary={treatment.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ConsultItem;
