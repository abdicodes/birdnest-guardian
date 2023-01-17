import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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
  if (!pilot) {
    return null;
  }

  // drones.forEach((e) => {
  //   console.log(e.serialNumber, ' ', card.pilotId);
  // });

  if (drone)
    return (
      <div
        style={{
          margin: '20px',
          justifyContent: 'space-evenly',
          display: 'flex',
          flex: '1',
          alignContent: 'space-evenly',
        }}
      >
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
              {/* at {droneDistance} meters away from nest. */}
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
              {/* <Typography paragraph>
                Chevrolet is also known for its commitment to safety, providing
                advanced features like lane departure warning and front crash
                prevention. (Discard any mussels that don&apos;t open.)
              </Typography> */}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
};
export default Cards;
