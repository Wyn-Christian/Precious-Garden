import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useLoginUserMutation } from "../../app/services/user";
import { setUser } from "../../features/userSlice";

function Login() {
	const [loginUser, { data }] = useLoginUserMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async () => await loginUser(formik.values);
	useEffect(() => {
		if (data) {
			if (data.id) {
				dispatch(setUser(data));
				enqueueSnackbar("Login Successfully", { variant: "success" });
				navigate("/");
			} else {
				enqueueSnackbar("Wrong input email or password", {
					variant: "warning",
					preventDuplicate: true,
				});

				console.log(data.error);
			}
		}
	}, [data]);

	return (
		<Box
			sx={{
				height: "70vh",
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
				LOGIN
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					// height: "100%",
					width: "100%",
				}}
			>
				<Paper sx={{ width: { xs: "100%", sm: 400 } }} elevation={0}>
					<Box component="form">
						<Stack spacing={3}>
							<TextField
								label="Email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								variant="filled"
								fullWidth
							/>
							<TextField
								label="Password"
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								variant="filled"
								fullWidth
							/>
							<Button variant="contained" onClick={onSubmit}>
								Login
							</Button>
						</Stack>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}

export default Login;
