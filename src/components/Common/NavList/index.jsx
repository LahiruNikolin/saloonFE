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

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function NavList() {
  const handleDrawerToggle = () => {
    console.log("getting clickerd");
  //  setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        variant="temporary"
        open={false}
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
    </div>
  );
}

export default NavList;
