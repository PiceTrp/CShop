import { useState } from "react";
import { Button, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

const Input = styled("input")({
  display: "none",
});
function UploadButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton aria-label="upload picture" component="span">
          <CropOriginalIcon sx={{ fontSize: 150 }} />
        </IconButton>
      </label>
    </Stack>
  );
}

function SelectVariants() {
  const [Category, setCategory] = useState("");

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <FormControl variant="standard" sx={{ m: 0, minWidth: 200, mt: "10px" }}>
      <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={Category}
        onChange={categoryChange}
        label="Category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function AddProduct({
  product = false,
  setProduct = () => {},
  title = "",
  description = "",
}) {
  const ProductAdd = () => setProduct(true);
  const ProduceClose = () => setProduct(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Dialog open={product} onClose={ProduceClose}>
      <DialogTitle
        sx={{
          alignSelf: "center",
          fontStyle: "normal",
          fontSize: "36px",
          lineHeight: "54px",
          color: "#FD6637",
        }}
      >
        ADD NEW PRODUCT
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <TextField
              required
              id="standard-required"
              placeholder="Title"
              variant="standard"
            />
            <Box>
              <SelectVariants />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="Price"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <TextField
                required
                id="standard-required"
                placeholder="Quantity"
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <UploadButtons />
            <Box sx = {{display : "flex",marginLeft : "30px" , fontSize : "10px" , flexDirection : "column"}}>
              <Box >Cutest Cactus Ever</Box>
              <Box >100000000 Bath</Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={ProduceClose}>Cancel</Button>
        <Button onClick={ProduceClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
