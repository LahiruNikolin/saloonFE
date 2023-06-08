import styles from "./App.module.css";
import Layout from "./components/Layout";

//pages
import ManageBookings from "./pages/ManageBookings";
import CreateAppointment from "./pages/createAppointment";
import AddEmployee from "./pages/addEmployee";
import Consultancy from "./pages/consultancy";
import Home from "./pages/home";
import NewTreatment from "./pages/newTreatment";
import Customer from "./pages/customer";

import { ThemeProvider } from "@suid/material/styles";
import primaryTheme from "./config/primaryTheme";
import { Routes, Route } from "@solidjs/router";

function App() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <div class={styles.App}>
        <header class={styles.header}></header>
        <Layout>
          <Routes>
            <Route path="/home" component={Home} />
            <Route path="/manage-bookings" component={ManageBookings} />
            <Route path="/create-appointment" component={CreateAppointment} />
            <Route path="/add-employee" component={AddEmployee} />
            <Route path="/manage-consultancy" component={Consultancy} />
            <Route path="/new-treatment" component={NewTreatment} />
            <Route path="/customer" component={Customer} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
