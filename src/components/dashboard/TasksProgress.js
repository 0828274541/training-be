import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const TasksProgress = (props) => (
  <Card
    sx={{ height: '100%', backgroundColor: 'table.background' }}
    {...props}
  >
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
            TASKS PROGRESS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'orange[600]',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;
