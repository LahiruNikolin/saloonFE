import { createSignal } from "solid-js";
import CloseIcon from "@suid/icons-material/Close";
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
  ListItemIcon,
  ListItemSecondaryAction,
  Box,
  Avatar,
} from "@suid/material";

import {
  Person,
  Email,
  Phone,
  Tour,
  Pageview,
  Visibility,
} from "@suid/icons-material";

const Transition = function Transition(props) {
  return <Slide direction="up" {...props} />;
};

const SingleCustomerView = ({ open, handleClose }) => {
  const [selectedCustomer, setSelectedCustomer] = createSignal({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 35,
    phoneNumber: "555-1234",
    email: "john.doe@example.com",
    appointments: [
      { id: 1, date: "2022-02-15", description: "Facial" },
      { id: 2, date: "2021-12-23", description: "Body therapy" },
    ],
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open()}
        onClose={handleClose}
        sx={{ maxWidth: 600 }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
              }}
              variant="h6"
              component="div"
            >
              Customer Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", justifyContent: "center", paddingY: 4 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 130, height: 130 }}
          />
        </Box>

        <Box>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={`Dinith`} secondary="Name" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary={`Dinith@gmail.com`}
                secondary="Email Address"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary={`072324234`} secondary="Phone Number" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Tour />
              </ListItemIcon>
              <ListItemText primary={`11`} secondary="No of Appointments" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary={`16th March 2023`} secondary="Last Seen" />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />
          <Box sx={{ paddingInline: 2 }}>
            <Typography variant="h5">Previous Appointments</Typography>
            <List>
              {selectedCustomer().appointments.map((appointment) => (
                <ListItem key={appointment.id}>
                  <ListItemText
                    primary={appointment.date}
                    secondary={appointment.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Pageview sx={{ width: 40, height: 40 }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};
export default SingleCustomerView;
