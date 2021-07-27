import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const TotalProfit = (props) => (
  <Card {...props} sx={{ height: '100%', backgroundColor: 'table.background' }}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="text.white"
            gutterBottom
            variant="h6"
          >
            TOTAL PROFIT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            $23,200
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
