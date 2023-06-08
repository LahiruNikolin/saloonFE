import { createSignal, createEffect } from "solid-js";
import styles from "./manageBookings.module.css";
import ControlsContainer from "../../components/ManageBookings/ControlsContainer";
import BookingDisplayArea from "../../components/ManageBookings/BookingDisplayArea";
import appointment from "../../services/appointment";
import useFetcher from "../../hooks/useFetcher";

function ManageBookings() {
  const { requestInitiator } = useFetcher;
  const [appointments, setAppointments] = createSignal(null);
  const [viewingDate, setViewingDate] = createSignal(null);

  const handleDateChange = async (e, direct = false) => {
    setViewingDate(direct ? e : e.target.value);
  };

  const handleFetch = async (date) => {
    const response = await requestInitiator(() =>
      appointment.fetchByDate(date)
    );

    setAppointments(response.data);
  };

  const handleRefresh = () => viewingDate() && handleFetch(viewingDate());

  createEffect(() => {
    viewingDate() && handleFetch(viewingDate());
  });

  return (
    <div class={styles.mainContainer}>
      <ControlsContainer
        handleDateChange={handleDateChange}
        viewingDate={viewingDate}
      />
      <BookingDisplayArea
        appointments={appointments}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

export default ManageBookings;
