import styles from "./summaryCard.module.css";
import { format } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@suid/material";

const SummaryCard = ({ data, onClick }) => {
  console.log("data", data);
  const openedDate = {
    char1: format(new Date(data?.createdAt), "do"),
    char2: format(new Date(data?.createdAt), "LLLL"),
    char3: format(new Date(data?.createdAt), "yyyy"),
  };
  return (
    <div class={styles.summaryCardContainer}>
      <Box sx={{ maxWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14, mb: 1.5 }}
              color="text.secondary"
              gutterBottom
            >
              {data.goal}
            </Typography>

            <CardMedia
              component="img"
              height="194"
              image="/assets/images/consultant_placeholder.jpg"
              alt="consultant placeholder iamge"
            />
            <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>
              {` Client: ${data.customer.firstName} ${data.customer.lastName}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body4">
              {`Started on ${openedDate.char2} ${openedDate.char1} of ${openedDate.char3}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                onClick(data._id);
              }}
            >
              Check In Detail
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default SummaryCard;
