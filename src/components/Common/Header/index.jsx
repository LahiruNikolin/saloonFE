import { createSignal } from "solid-js";
import styles from "./header.module.css";
import MenuIcon from "@suid/icons-material/Menu";
import LogoutIcon from "@suid/icons-material/Logout";
import { A } from "@solidjs/router";
import { format } from "date-fns";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Drawer,
  Divider,
} from "@suid/material";

import Chip from "@suid/material/Chip";

import CalendarMonthIcon from "@suid/icons-material/CalendarMonth";

const drawerWidth = 240;
const navItems = [
  { name: "Consultancy Area", path: "/manage-consultancy" },
  { name: "Customer Area", path: "/customer" },
  { name: "Appointments Area", path: "/manage-bookings" },
  { name: "New Appointment", path: "/create-appointment" },
  { name: "New Employee", path: "/add-employee" },
  { name: "New Treatment", path: "/new-treatment" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = createSignal(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemClick = (link) => {
    document.querySelector(`a[href='${link}']`).click();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TRACY
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            // onClick={(event) => {
            //   console.log("here handleItemClick");
            //   handleItemClick(item.path);
            // }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <div class={styles.navItem}>
                <A href={item.path}>
                  <ListItemText primary={item.name} />
                </A>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const SideList = () => {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen()}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    );
  };

  return (
    <div className={styles.headerContainer}>
      <CssBaseline />
      <AppBar
        position="static"
        onClick={() => {
          console.log(" menu getting clicked");
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="overline" component="div" sx={{ flexGrow: 1 }}>
            {format(new Date(), "yyyy-MM-dd")}
          </Typography>
          {/* <Typography variant="overline" component="div" sx={{ flexGrow: 1 }}>
            <Chip
              sx={{ color: "#fff" }}
              variant="outlined"
              icon={<CalendarMonthIcon />}
              label={format(new Date(), "yyyy-MM-dd")}
            />
          </Typography> */}
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Appointments made easy
          </Typography>
          <Button color="inherit" endIcon={<LogoutIcon />}></Button>
        </Toolbar>
      </AppBar>
      <SideList />
    </div>
  );
}

export default Header;
