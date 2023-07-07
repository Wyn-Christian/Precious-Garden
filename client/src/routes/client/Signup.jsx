import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import { MuiFileInput } from "mui-file-input";
import { enqueueSnackbar } from "notistack";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../../app/services/user";

function Signup() {
	const [file, setFile] = useState(null);
	const handleChange = (newFile) => {
		setFile(newFile);
	};

	const navigate = useNavigate();
	const [signUpUser, { isSuccess }] = useSignUpUserMutation();

	const formik = useFormik({
		initialValues: {
			username: "",
			first_name: "",
			last_name: "",
			address: "",
			phone: "",
			email: "",
			password: "",
			repassword: "",
			image: null,
		},
	});

	const onSubmit = async () => {
		if (formik.values.password === formik.values.repassword) {
			const new_user = new FormData();
			new_user.append("username", formik.values.username);
			new_user.append("name", formik.values.name);
			new_user.append("address", formik.values.address);
			new_user.append("phone", formik.values.phone);
			new_user.append("email", formik.values.email);
			new_user.append("password", formik.values.password);
			new_user.append("image", formik.values.image);

			await signUpUser(new_user)
				.unwrap()
				.then((res) => {
					console.log("Create Customer Successfully", res);
					enqueueSnackbar("Account created successfully!", {
						variant: "success",
					});

					navigate(`/login`);
				})
				.catch((err) => console.error(err));
		} else {
			enqueueSnackbar("Password don't match!", { variant: "error" });
		}
	};

	return (
		<Box
			sx={{
				minHeight: "70vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography
				variant="h2"
				textAlign="center"
				sx={{
					height: 100,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				SIGN-UP
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Paper
					sx={{ width: { xs: "100%", sm: 500, md: 700 } }}
					elevation={0}
				>
					<Box component="form">
						<Grid container spacing={2}>
							<Grid xs={12}>
								<Typography variant="h6" fontWeight="bold">
									PERSONAL INFO
								</Typography>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField label="Full Name" variant="filled" fullWidth />
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									variant="filled"
									fullWidth
									label="Username"
									name="username"
									autoComplete="off"
									value={formik.values.username}
									onChange={formik.handleChange}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<MuiFileInput
									fullWidth
									variant="filled"
									value={formik.values.image}
									onChange={(e) => formik.setFieldValue("image", e)}
									placeholder="Profile Image"
								/>
							</Grid>
							<Grid xs={12}>
								<TextField
									label="Current Address"
									variant="filled"
									multiline
									rows={3}
									fullWidth
									name="address"
									autoComplete="off"
									value={formik.values.address}
									onChange={formik.handleChange}
								/>
							</Grid>
							<Grid xs={12}>
								<Typography variant="h6" fontWeight="bold">
									PERSONAL ACCOUNT
								</Typography>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									variant="filled"
									fullWidth
									autoComplete="off"
									label="Email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									helperText="We'll never share your email to anyone"
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									label="Phone Number"
									variant="filled"
									fullWidth
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									variant="filled"
									fullWidth
									label="Password"
									type="password"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									autoComplete="off"
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									variant="filled"
									fullWidth
									label="Re-enter Password"
									type="password"
									name="repassword"
									value={formik.values.repassword}
									onChange={formik.handleChange}
									autoComplete="off"
								/>
							</Grid>
							<Grid xs={12} md={4}>
								<Button variant="contained" fullWidth onClick={onSubmit}>
									Create an account
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}

export default Signup;
