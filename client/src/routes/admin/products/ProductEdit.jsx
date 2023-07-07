// Libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

// MUI Component
import Grid from "@mui/material/Unstable_Grid2";
import {
	Box,
	Button,
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
import {
	useGetProductQuery,
	useUpdatePlantProductMutation,
	useUpdateProductMutation,
} from "../../../app/services/product";
import LoadingProgress from "../../../components/LoadingProgress";
import { enqueueSnackbar } from "notistack";

function ProductUpdate() {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		data: product = {},
		isLoading,
		isSuccess,
	} = useGetProductQuery(id);
	const [updatePlantProduct] = useUpdatePlantProductMutation();
	const [updateProduct] = useUpdateProductMutation();

	const formik = useFormik({
		initialValues: {
			name: product.name,
			description: product.description,
			image: null,
			price: product.price,
			stocks: product.stocks,
			category: product.category,
			type: product.type,
			height: product?.height,
			pot_diameter: product?.pot_diameter,
			light_requirements: product?.light_requirements,
			humidity_needs: product?.humidity_needs,
			watering_needs: product?.watering_needs,
			repotting: product?.repotting,
			pet_friendly: product?.pet_friendly,
			add_ons_soil: null,
			add_ons_pot: null,
		},
	});

	useEffect(() => {
		formik.setValues({
			name: product.name,
			description: product.description,
			image: null,
			price: product.price,
			stocks: product.stocks,
			category: product?.category,
			type: product.type,
			height: product?.height,
			pot_diameter: product?.pot_diameter,
			light_requirements: product?.light_requirements,
			humidity_needs: product?.humidity_needs,
			watering_needs: product?.watering_needs,
			repotting: product?.repotting,
			pet_friendly: product?.pet_friendly,
			add_ons_soil: null,
			add_ons_pot: null,
		});
	}, [product]);

	const onSubmit = async () => {
		console.log(formik.values);
		if (
			formik.values.name !== product.name ||
			formik.values.description !== product.description ||
			formik.values.stocks !== product.stocks ||
			formik.values.price !== product.price ||
			formik.values.type !== product.type ||
			formik.values.image !== null ||
			formik.values.type !== product.type ||
			formik.values.height !== product.height ||
			formik.values.pot_diameter !== product.pot_diameter ||
			formik.values.light_requirements !== product.light_requirements ||
			formik.values.humidity_needs !== product.humidity_needs ||
			formik.values.watering_needs !== product.watering_needs ||
			formik.values.repotting !== product.repotting ||
			formik.values.pet_friendly !== product.pet_friendly
		) {
			const product = new FormData();

			product.append("name", formik.values.name);
			product.append("description", formik.values.description);
			product.append("price", formik.values.price);
			product.append("stocks", formik.values.stocks);
			product.append("type", formik.values.type);
			product.append("height", formik.values.height);
			product.append("pot_diameter", formik.values.pot_diameter);
			product.append(
				"light_requirements",
				Number(formik.values.light_requirements)
			);
			product.append(
				"humidity_needs",
				Number(formik.values.humidity_needs)
			);
			product.append(
				"watering_needs",
				Number(formik.values.watering_needs)
			);
			product.append("repotting", Number(formik.values.repotting));
			product.append("pet_friendly", Number(formik.values.pet_friendly));

			console.log(product);

			if (formik.values.image !== null)
				product.append("image", formik.values.image);

			const new_data = { id, product };
			console.log({ new_data });

			if (formik.values.category !== "Plant") {
				await updateProduct(new_data).unwrap();
				enqueueSnackbar("Update Product Successfully!", {
					variant: "success",
				});
			} else {
				await updatePlantProduct(new_data).unwrap();
				enqueueSnackbar("Update Plant Product Successfully!", {
					variant: "success",
				});
			}
			navigate(`/admin/products/${id}`);
		}
	};

	let content;
	if (isLoading) {
		content = <LoadingProgress />;
	} else if (isSuccess) {
		content = (
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
										placeholder={product?.img_name}
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
											value={product ? product.category : "Plant"}
											readOnly
										>
											{["Plant", "Pot", "Soil", "Tool"].map((name) => (
												<MenuItem key={name} value={name}>
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

						{formik.values.category === "Plant" && (
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
												value={
													formik.values.type
														? formik.values.type
														: "Indoor"
												}
												onChange={formik.handleChange}
											>
												{["Indoor", "Outdoor", "Indoor and Outdoor"].map(
													(type) => (
														<MenuItem key={type} value={type}>
															{type}
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
									</Box>
								</Paper>
							</Grid>
						)}

						{/* {formik.values.category === "Plant" && (
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
            )} */}

						{formik.values.category === "Plant" && (
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

						{formik.values.category === "Plant" && (
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
											onChange={(e, newValue) =>
												formik.setFieldValue(
													"light_requirements",
													newValue
												)
											}
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
										<Typography component="legend">
											Pet Friendly
										</Typography>
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
						<Grid xs={12}>
							<Button
								variant="contained"
								sx={{ width: { xs: "100%", md: 200 } }}
								onClick={onSubmit}
							>
								Update Product
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	}

	return <Box>{content}</Box>;
}

export default ProductUpdate;
