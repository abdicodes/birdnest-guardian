import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dateConverter from './assets/dateConverter';
import { distanceCal } from './assets/distanceCal';
import { useSelector } from 'react-redux';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Cards = ({ pilot }) => {
  const [expanded, setExpanded] = useState(false);

  const drones = useSelector((state) => state.reducer.drones);
  const drone = drones.find((e) => e.serialNumber === pilot.serialNumber);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!pilot | !drone) {
    return null;
  }

  if (!drone) return null;
  return (
    <Grid item xs={4}>
      <Card elevation={5} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {pilot.firstName.charAt(0)} {pilot.lastName.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${pilot.firstName} ${pilot.lastName}`}
          subheader={pilot.email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Violation detected at {dateConverter(pilot.time)} <br />
            at{' '}
            {Math.round(
              distanceCal(drone.positionX, drone.positionY, 250000, 250000) /
                1000
            )}{' '}
            meters away from nest.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Drone altitude: {Math.round(drone.altitude)} foot
            </Typography>
            <Typography paragraph>
              Pilot phone number: {pilot.phoneNumber}
            </Typography>
            <Typography paragraph>
              Drone license valid from: {dateConverter(pilot.createdDt)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
export default Cards;
