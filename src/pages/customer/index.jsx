import { createEffect, createSignal } from "solid-js";

import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
} from "@suid/material";

import { Delete } from "@suid/icons-material";
import ZoomInIcon from "@suid/icons-material/ZoomIn";

import SingleCustomerView from "../../components/Customer/SingleCustomerView";
import CreateCustomer from "../../components/Customer/CreateCustomer";

import CUSTOMER_SERVICE from "../../services/customer";
import useFetcher from "../../hooks/useFetcher";

const Customer = () => {
  const { requestInitiator } = useFetcher;
  const [open, setOpen] = createSignal(false);
  const [customers, setCustomers] = createSignal([]);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [criteria, setCriteria] = createSignal(null);

  const [createPageAcive, setCreatePageActive] = createSignal(false);

  const handleDelete = (customerId) => {
    // Handle delete customer logic
  };

  const handleViewSpecificUser = () => {
    setOpen(!open());
  };

  const [alignment, setAlignment] = createSignal("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSetCustomers = (response) => {
    setCustomers(
      response.data.map((customer) => ({
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        age: customer.age,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      }))
    );
  };

  const handleGetAllCustomers = async () => {
    console.log("handleGetAllCustomers: called");
    const response = await requestInitiator(() => CUSTOMER_SERVICE.fetchAll());
    if (response?.data) {
      handleSetCustomers(response);
    }
  };

  const handleSearch = async () => {
    if (!criteria() || !searchQuery()) return;
    const response = await requestInitiator(() =>
      CUSTOMER_SERVICE.search({
        search: searchQuery(),
        criteria: criteria(),
      })
    );

    if (response?.data) {
      handleSetCustomers(response);
    }
  };

  const shouldSearchDisable = () => !(searchQuery() && criteria());

  const handleActivateCreate = () => setCreatePageActive(!createPageAcive());

  const renderCustomerArea = () => {
    if (createPageAcive())
      return <CreateCustomer onBack={handleActivateCreate} />;

    return (
      <>
        <div style={{ padding: "17px 20px 0px 20px" }}>Customer Area</div>
        <Box sx={{ pt: 5 }}>
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <TextField
                label="Search customers"
                variant="outlined"
                size="large"
                value={searchQuery()}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ToggleButtonGroup
                color="secondary"
                value={criteria()}
                exclusive
                onChange={(e) => {
                  setCriteria(e.target.value);
                }}
                aria-label="Platform"
              >
                <ToggleButton value="name">Name</ToggleButton>
                <ToggleButton value="phoneNo">Phone no</ToggleButton>
                <ToggleButton value="email">Email</ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant="contained"
                onClick={handleSearch}
                size="large"
                disabled={shouldSearchDisable()}
              >
                Search
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers().map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.firstName}</TableCell>
                      <TableCell>{customer.lastName}</TableCell>
                      <TableCell>{customer.age}</TableCell>
                      <TableCell>{customer.phoneNumber}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleViewSpecificUser(customer.id)}
                        >
                          <ZoomInIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(customer.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button variant="contained" onClick={handleActivateCreate}>
                Create a New Customer
              </Button>
            </Box>
          </Container>
          <SingleCustomerView
            open={open}
            handleClose={handleViewSpecificUser}
          />
        </Box>
      </>
    );
  };

  createEffect(() => {
    handleGetAllCustomers();
  });

  createEffect(() => {
    if (searchQuery() === "") handleGetAllCustomers();
  });

  return (
    <div style={{ padding: "20px 60px 40px 60px" }}>{renderCustomerArea()}</div>
  );
};

export default Customer;
