import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { register } from '../redux/action';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMessage, setErrMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;


    useEffect(() => {
        if (userInfo) {
            navigate('/profile');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (error) {
            setErrMessage(error);
        }
    }, [error]);

    const handleSubmit = () => {
        if (email === "" || password === "" || confirmPassword === "") {
            setErrMessage("Required fields");
        } else if (password !== confirmPassword) {
            setErrMessage("Passwords do not match");
        } else {
            dispatch(register(email, password));
        }
    };

    return (
        <>
            { loading && <Loader /> }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    {
                        errMessage && <ErrorMessage severity="error" setErrMessage={setErrMessage}>{errMessage}</ErrorMessage>
                    }
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                Already registered? 
                                <Link href="/login" variant="body2">
                                    Log In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Register;