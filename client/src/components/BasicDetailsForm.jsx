import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BasicDetailsForm = ({ input, setInput, errMessage }) => {
    const userLogin = useSelector(state => state.userLogin);

    return (
        <>
            <Box sx={{ mt: 1, mb: 1 }}>
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Firstname is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="Firstname"
                    name="firstname"
                    autoFocus
                    value={input.firstname}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Lastname is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="lastname"
                    label="Lastname"
                    id="lastname"
                    value={input.lastname}
                    onChange={setInput}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    id="email"
                    disabled
                    value={userLogin.userInfo.email}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Phone number is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    id="phone"
                    value={input.phone}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Address is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="address1"
                    label="Address 1"
                    id="address1"
                    value={input.address1}
                    onChange={setInput}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address2"
                    label="Address 2"
                    id="address2"
                    value={input.address2}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "City is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="city"
                    label="City"
                    id="city"
                    value={input.city}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "State is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="state"
                    label="State"
                    id="state"
                    value={input.state}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Country is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    id="country"
                    value={input.country}
                    onChange={setInput}
                />
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "PIN code is required" : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="pin"
                    label="PIN Code"
                    id="pin"
                    value={input.pin}
                    onChange={setInput}
                />
            </Box>
        </>
    );
}

export default BasicDetailsForm;