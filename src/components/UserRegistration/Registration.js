import React, { Component } from 'react';
import '../../css/Registration.css';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import Logo from '../../asserts/Logo.png';
import { userRegistration } from '../../service/UserService/UserServices';
import Styles from '../../css/snackbar.module.css';
import { withStyles } from '@material-ui/core';

import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import { withRouter } from 'react-router';
import { Container, Typography, AppBar, Toolbar, Grid } from '@material-ui/core';

const useStyles = (theme) => ({
	title: {
		display: 'none',
		paddingLeft: '0.5%',
		fontSize: '140%',
		overflow: 'visible',
		marginTop: '5px',
		marginLeft: '15px',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	bookIcon: {
		fontSize: '36px',
		[theme.breakpoints.up('sm')]: {
			fontSize: '36px',
		},
	},
	cartIcon: {
		color: 'white',
		marginLeft: '0%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: '10%',
		},
	},
	searchbox: {
		marginLeft: '-30%',
	},
	appBar: {
		padding: '0 10%',
		backgroundColor: '#A03037',
		position: 'fixed',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	gridDiv: {
		width: 'auto',
		flexWrap: 'noWrap',
		alignItems: 'center',
    },
    
    booktittle :{
        cursor:'pointer',
     },
});

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			emailId: '',
			password: '',
			mobileNumber: '',
			roleType: '',
			errors: {},
			isActive: false,
		};
	}

	handleSubmit = () => {
		const { fullName, emailId, mobileNumber, password, roleType } = this.state;
		// alert(
		// 	`Welcome ${fullName} ${emailId} password: ${password} mobileNumber: ${mobileNumber} roleType: ${roleType}`
		// );
	};

	axios = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(0, object.target.maxLength);
		}
	};

	validateForm = () => {
		let errors = {};
		let formIsValid = true;

		if (!RegExp('^[a-zA-Z]+ [a-zA-Z]+$').test(this.state.fullName)) {
			errors['fullName'] = '*Enter the Valid full name';
			formIsValid = false;
		}
		if (!this.state.fullName) {
			errors['fullName'] = '*FullName name can not be empty';
			formIsValid = false;
		}

		if (
			!RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\. [A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$').test(
				this.state.emailId
			)
		) {
			errors['emailId'] = '*Enter valid pattern e-mail id';
			formIsValid = false;
		}
		if (!this.state.emailId) {
			errors['emailId'] = '*E-mail id can not be empty';
			formIsValid = false;
		}
		if (!RegExp('^[6-9][0-9]{9}$').test(this.state.mobileNumber)) {
			errors['mobileNumber'] = '*Enter valid pattern Phone number';
		}
		if (!this.state.mobileNumber) {
			errors['mobileNumber'] = '*Phone number can not be empty';
			formIsValid = false;
		}

		if (!RegExp('((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!*]).{8,20})').test(this.state.password)) {
			errors['password'] = '*Enter the valid pattern password';
			formIsValid = false;
		}
		if (!this.state.password) {
			errors['password'] = '*Password can not be empty';
			formIsValid = false;
		}

		this.setState({
			errors: errors,
		});

		return formIsValid;
	};

	openSnackBar = async (prop) => {
		await this.setState({ status: prop });
		this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 3000);
		});
	};

	registrationForm = () => {
		if (this.validateForm()) {
			let user = {};
			user.fullName = this.state.fullName;
			user.emailId = this.state.emailId;
			user.password = this.state.password;
			user.mobileNumber = this.state.mobileNumber;
			user.roleType = this.state.roleType;
			console.log(user);

			userRegistration(user)
				.then((response) => {
					localStorage.setItem('RoleType', user.roleType);

					this.openSnackBar('User registered successfully');

					this.props.history.push('/login');
				})
				.catch((error) => {
					console.log('Error', error.response);
					// alert('User registration failed');
					this.openSnackBar('User registration failed');
				});
		}
	};

	// render() {
	// 	const { emailId, password, fullName, mobileNumber } = this.state;
	// 	const enabled = fullName.length > 0 && emailId.length > 0 && mobileNumber.length > 0 && password.length > 0;
	// 	return (
	render() {
		const { classes } = this.props;
		const { emailId, password, fullName, mobileNumber } = this.state;
		const enabled = fullName.length > 0 && emailId.length > 0 && mobileNumber.length > 0 && password.length > 0;
		return (
			<div>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar className={classes.toolbar}>
						<Grid container className={classes.gridDiv}>
							<MenuBookIcon className={classes.bookIcon} />
							<Typography className={classes.title} value="1" variant="h6" noWrap>
							   
						        	<span   className={classes.booktittle}
											href="BookStore"
											onClick={() => this.props.history.push('/')}
											style={{ color: 'white' }}>
											BookStore
										</span>
							</Typography>
						</Grid>
					</Toolbar>
				</AppBar>
				<form onSubmit={this.handleSubmit}>
					<Card className="registercard">
						<CardContent>
							<div className="backgroundregister">
								<div className="userregister">
									<div className="middle">
										<img src={Logo} width="35%" height="35%" alt="hello" />
									</div>{' '}
									<div className="useronlinebookstore">
										<h1 style={{ color: '#A03037', textAlign: 'center', marginLeft: '-16%' }}>
											SignUp{' '}
										</h1>{' '}
									</div>{' '}
									<div className="main" style={{ flexDirection: 'row' }}>
										<div>
											<div className="userfullName">
												<TextField
													required
													margin="dense"
													size="large"
													name="fullName"
													variant="outlined"
													id="outlined"
													label="Full name"
													style={{ width: '100%' }}
													textAlign="center"
													color="secondary"
													onChange={this.axios}
													error={this.state.errors.fullName}
													helperText={this.state.errors.fullName}
													InputProps={{
														endAdornment: (
															<InputAdornment
																position="end"
																color="secondary"
																sytle={{ width: '10px' }}>
																<PermIdentityIcon />
															</InputAdornment>
														),
													}}
												/>{' '}
											</div>{' '}
											<div className="useremailId1">
												<TextField
													required
													margin="dense"
													color="secondary"
													size="small"
													name="emailId"
													variant="outlined"
													id="outlined"
													label="E-mail"
													style={{ width: '100%' }}
													onChange={this.axios}
													error={this.state.errors.emailId}
													helperText={this.state.errors.emailId}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end" sytle={{ width: '10px' }}>
																<MailOutlineIcon />
															</InputAdornment>
														),
													}}
												/>{' '}
											</div>{' '}
											<div className="mobileNumber">
												<TextField
													required
													margin="dense"
													color="secondary"
													name="mobileNumber"
													variant="outlined"
													size="small"
													id="outlined"
													onInput={this.maxLengthCheck}
													type="number"
													label="mobile Number"
													inputProps={{ maxLength: '10' }}
													style={{ width: '100%' }}
													fullWidth
													required
													autoComplete="off"
													onChange={this.axios}
													error={this.state.errors.mobileNumber}
													helperText={this.state.errors.mobileNumber}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<PhoneIcon />
															</InputAdornment>
														),
													}}
												/>{' '}
											</div>{' '}
											<div className="userpassword">
												<TextField
													required
													margin="dense"
													color="secondary"
													size="small"
													name="password"
													variant="outlined"
													id="standard-adornment-password"
													type={this.state.showPassword ? 'text' : 'password'}
													label="Password"
													style={{ width: '100%' }}
													onChange={this.axios}
													error={this.state.errors.password}
													helperText={this.state.errors.password}
													InputProps={{
														endAdornment: (
															<InputAdornment position=" end ">
																<IconButton
																	onClick={() =>
																		this.setState({
																			showPassword: !this.state.showPassword,
																		})
																	}
																	edge="end">
																	{' '}
																	{this.state.showPassword ? (
																		<Visibility />
																	) : (
																		<VisibilityOff />
																	)}{' '}
																</IconButton>{' '}
															</InputAdornment>
														),
													}}
												/>{' '}
											</div>{' '}
											<br />
											<div className="radiobuttons">
												<input
													type="radio"
													value="ADMIN"
													name="roleType"
													onChange={this.axios}
												/>
												ADMIN{' '}
												<input
													type="radio"
													value="SELLER"
													name="roleType"
													onChange={this.axios}
												/>
												SELLER{' '}
												<input
													type="radio"
													value="user"
													name="roleType"
													onChange={this.axios}
												/>
												USER{' '}
											</div>{' '}
											<br />
											<div className="userbutton">
												<Button
													margin="dense"
													size="small"
													variant="contained"
													// onClick={() => this.props.history.push ('/')}
													onClick={this.registrationForm}
													style={{
														width: '100%',
														backgroundColor: '#A03037',
														color: 'white',
													}}
													disabled={!enabled}>
													Sign Up{' '}
												</Button>{' '}
											</div>{' '}
										</div>{' '}
									</div>{' '}
								</div>{' '}
							</div>{' '}
						</CardContent>{' '}
					</Card>{' '}
					<div className={this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar}>
						{' '}
						{this.state.status}{' '}
					</div>{' '}
				</form>
			</div>
		);
	}
}

export default withRouter(withStyles(useStyles)(Registration));
{
	/* );
	}
}

export default Registration; */
}
