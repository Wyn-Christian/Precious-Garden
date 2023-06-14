// Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// MUI Component
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

// Custom Component
import AdminTitle from "../../../components/AdminTitle";

// Mui icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import YardIcon from "@mui/icons-material/Yard";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import PetsIcon from "@mui/icons-material/Pets";

function ProductUpdate() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
      price: 0,
      stocks: 10,
      category: "plant",
      type: "Indoor",
      height: 11,
      pot_diameter: 9,
      light_requirements: 3,
      humidity_needs: 3,
      watering_needs: 3,
      repotting: 3,
      pet_friendly: 3,
      add_ons_soil: null,
      add_ons_pot: null,
    },
  });

  return (
    <Box>
      <AdminTitle title="Update Product" />
      <Box component="form" sx={{ mb: 5 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Paper elevation={4}>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                BASIC INFO
              </Typography>
              <Divider />
              <Box sx={{ px: 2, pt: 2 }}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Box>

              <Box sx={{ px: 2, pt: 2 }}>
                <MuiFileInput
                  value={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e)}
                  placeholder="Insert an Image"
                />
              </Box>
              <Box sx={{ px: 2, py: 2 }}>
                <TextField
                  label="Desription"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box sx={{ px: 2, py: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="category-input">
                    Category (read-only)
                  </InputLabel>
                  <Select
                    labelId="category-input"
                    label="Category (read-only)"
                    name="category"
                    value={formik.values.category}
                    readOnly
                  >
                    {["Plant", "Pot", "Soil", "Tool"].map((name) => (
                      <MenuItem key={name} value={name.toLowerCase()}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>

          <Grid xs={12} md={6}>
            <Paper elevation={4}>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                ECONOMIC INFO
              </Typography>
              <Divider />

              <Box sx={{ px: 2, pt: 2 }}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ px: 2, py: 2 }}>
                <TextField
                  label="Current Stocks"
                  name="stocks"
                  type="number"
                  value={formik.values.stocks}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Box>
            </Paper>
          </Grid>

          {formik.values.category === "plant" && (
            <Grid xs={12} md={6}>
              <Paper elevation={4}>
                <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                  PLANT TYPE
                </Typography>
                <Divider />

                <Box sx={{ px: 2, py: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="type-input">Type</InputLabel>
                    <Select
                      labelId="type-input"
                      label="Type"
                      name="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      {["Indoor", "Outdoor"].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </Grid>
          )}

          {formik.values.category === "plant" && (
            <Grid xs={12} md={6}>
              <Paper elevation={4} sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                  ADD ONS
                </Typography>
                <Divider />

                <Box sx={{ px: 2, pt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="add-ons-soil-input">Soil</InputLabel>
                    <Select
                      labelId="add-ons-soil-input"
                      label="Soil"
                      name="add_ons_soil"
                      value={formik.values.add_ons_soil}
                      onChange={formik.handleChange}
                    >
                      {["Indoor", "Outdoor"].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ px: 2, py: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="add-ons-pot-input">Pot</InputLabel>
                    <Select
                      labelId="add-ons-pot-input"
                      label="Pot"
                      name="add_ons_pot"
                      value={formik.values.add_ons_pot}
                      onChange={formik.handleChange}
                    >
                      {["Indoor", "Outdoor"].map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </Grid>
          )}

          {formik.values.category === "plant" && (
            <Grid xs={12} md={6}>
              <Paper elevation={4}>
                <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                  PLANT SIZE
                </Typography>
                <Divider />

                <Box sx={{ px: 2, pt: 2 }}>
                  <TextField
                    label="Height (inch)"
                    name="height"
                    type="number"
                    value={formik.values.height}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ px: 2, py: 2 }}>
                  <TextField
                    label="Pot Diameter (inch)"
                    name="pot_diameter"
                    type="number"
                    value={formik.values.pot_diameter}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Box>
              </Paper>
            </Grid>
          )}

          {formik.values.category === "plant" && (
            <Grid xs={12} md={6}>
              <Paper elevation={4}>
                <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                  PLANT SPECS
                </Typography>
                <Divider />
                <Box sx={{ px: 2, pt: 2 }}>
                  <Typography component="legend">
                    Light Requirements
                  </Typography>
                  <Rating
                    name="light_requirements"
                    value={formik.values.light_requirements}
                    onChange={formik.handleChange}
                    icon={<LightModeIcon fontSize="inherit" />}
                    emptyIcon={
                      <LightModeOutlinedIcon fontSize="inherit" />
                    }
                    size="large"
                  />
                </Box>
                <Box sx={{ px: 2, pt: 2 }}>
                  <Typography component="legend">
                    Humidity Needs
                  </Typography>
                  <Rating
                    name="humidity_needs"
                    value={formik.values.humidity_needs}
                    onChange={formik.handleChange}
                    icon={<LocalDrinkIcon fontSize="inherit" />}
                    emptyIcon={
                      <LocalDrinkOutlinedIcon fontSize="inherit" />
                    }
                    size="large"
                  />
                </Box>
                <Box sx={{ px: 2, pt: 2 }}>
                  <Typography component="legend">
                    Watering Needs
                  </Typography>
                  <Rating
                    name="watering_needs"
                    value={formik.values.watering_needs}
                    onChange={formik.handleChange}
                    icon={<WaterDropIcon fontSize="inherit" />}
                    emptyIcon={
                      <WaterDropOutlinedIcon fontSize="inherit" />
                    }
                    size="large"
                  />
                </Box>
                <Box sx={{ px: 2, pt: 2 }}>
                  <Typography component="legend">Repotting</Typography>
                  <Rating
                    name="repotting"
                    value={formik.values.repotting}
                    onChange={formik.handleChange}
                    icon={<YardIcon fontSize="inherit" />}
                    emptyIcon={<YardOutlinedIcon fontSize="inherit" />}
                    size="large"
                  />
                </Box>
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography component="legend">Pet Friendly</Typography>
                  <Rating
                    name="pet_friendly"
                    value={formik.values.pet_friendly}
                    onChange={formik.handleChange}
                    icon={<PetsIcon fontSize="inherit" />}
                    emptyIcon={<PetsOutlinedIcon fontSize="inherit" />}
                    size="large"
                  />
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductUpdate;
