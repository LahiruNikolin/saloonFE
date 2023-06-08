import styles from "./consultancy.module.css";
import { createSignal } from "solid-js";
import CardContainer from "../../components/Consultancy/CardContainer";
import CreateConsultancy from "../../components/Consultancy/CreateConsultancy";
import { Fab } from "@suid/material";
import AddIcon from "@suid/icons-material/Add";

const Consultancy = () => {
  const [createActive, setCreateActive] = createSignal(false);
  const handleCreate = () => {
    setCreateActive(!createActive());
  };

  const renderConsultancyContent = () => {
    if (createActive()) return <CreateConsultancy onBack={handleCreate} />;

    return (
      <>
        <CardContainer />
        <div class={styles.fbAddContainer}>
          <Fab color="primary" aria-label="add" onClick={handleCreate}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  };
  return (
    <div class={styles.consultancyContainer}>{renderConsultancyContent()}</div>
  );
};

export default Consultancy;
