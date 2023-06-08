import { createEffect, createSignal } from "solid-js";
import SummaryCard from "../SummaryCard";
import SingleConsultancy from "../SingleConsultancy";
import DetailedConsultancy from "../DetailedConsultancy";
import { Box } from "@suid/material";
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
  Chip,
  Stack,
} from "@suid/material";
import { Fab } from "@suid/material";
import FavoriteIcon from "@suid/icons-material/Favorite";
import PendingIcon from "@suid/icons-material/Pending";
import TaskAltIcon from "@suid/icons-material/TaskAlt";
import styles from "./cardContainer.module.css";
import useFetcher from "../../../hooks/useFetcher";

import CONSULTANCY_SERVICE from "../../../services/consultancy";

const customStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: "15px",
  padding: "0 18px",
  maxWidth: "900px",
  margin: "auto",
};

const CardContainer = () => {
  const [open, setOpen] = createSignal(false);
  const [testFlag, setTestFlag] = createSignal(false);
  const [packages, setPackages] = createSignal([]);

  const [selectedPackage, setSelectedPackage] = createSignal(null);

  const { requestInitiator } = useFetcher;

  const handleOpen = (id) => {
    setSelectedPackage(packages().find((item) => item._id === id));
    //setOpen(true);
  };

  const handleBack = (id) => {
    setSelectedPackage(null);
   
  };

  const handleClose = () => {
    // setOpen(false);
  };

  const handleClick = (id) => {
    setOpen((prevState) => !prevState);
    setSelectedPackage(packages().find((item) => item._id === id));
  };

  const handleClickTest = (clicked) => {
    setTestFlag(clicked);
  };

  const handleFetch = async () => {
    const response = await requestInitiator(() =>
      CONSULTANCY_SERVICE.fetchAll()
    );
    setPackages(response.data);
  };

  createEffect(() => {
    handleFetch();
  });

  createEffect(() => {
    if (selectedPackage()) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  createSignal(() => {
    console.log("oope", open());
  });

  const renderContent = () => {
    if (selectedPackage())
      return <DetailedConsultancy data={selectedPackage} onBack={handleBack}/>;
    return (
      <div>
        <Box sx={customStyles}>
          {packages().map((data) => (
            <SummaryCard data={data} onClick={handleOpen} />
          ))}
        </Box>
      </div>
    );
    {
      /* <SingleConsultancy
    testFlag={testFlag}
    open={open}
    onClose={handleClose}
    onClick={handleClickTest}
    data={selectedPackage}
  /> */
    }
  };
  return <div style={{ padding: "20px" }}>{renderContent()}</div>;
};

export default CardContainer;
