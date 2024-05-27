import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function PropertyCard2(props) {
  // console.log(props.property);
  const myProperty = props.property;
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={myProperty.image}
        title="House for sale"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {myProperty.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {myProperty.address}
        </Typography>
      </CardContent>
      <CardActions>
        {props.action==="delete"  && (
          <Button size="small" onClick={() => props.handleDelete(myProperty._id)}>
            Delete Property
          </Button>
        )}
        {props.action==="update"  && (
          <Button onClick={()=>{
            navigate(`/dashboard/seller/update-properties/${myProperty._id}`);
            }}
           size="small"
           >
            Update Property
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
