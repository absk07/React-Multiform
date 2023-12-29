import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const question1 = [
    {
        value: 'Rupee',
        label: '₹'
    },
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    },
    {
      value: 'BTC',
      label: '฿'
    },
    {
      value: 'JPY',
      label: '¥'
    }
];

const question2 = [
    {
        age: '18-30'
    },
    {
        age: '31-45'
    },
    {
        age: '46-65'
    },
    {
        age: '65 above'
    }
];

const question3 = [
    {
        from: 'From friends'
    },
    {
        from: 'From family'
    },
    {
        from: 'From google ads'
    },
    {
        from: 'From Banners or hoardings'
    }
];

const SurveyForm = ({ input, setInput, errMessage }) => {
    return (
        <>
            <Box sx={{ mt: 1, mb: 1 }}>
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Please answer question 1" : ""}
                    id="ans1"
                    name="ans1"
                    margin="normal"
                    required
                    fullWidth
                    select
                    label="Which currency do you use?"
                    value={input.ans1}
                    onChange={setInput}
                >
                    {question1.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {`${option.label} - ${option.value}`}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Please answer question 2" : ""}
                    id="ans2"
                    name="ans2"
                    margin="normal"
                    required
                    fullWidth
                    select
                    label="What is your age?"
                    value={input.ans2}
                    onChange={setInput}
                >
                    {question2.map((option) => (
                        <MenuItem key={option.age} value={option.age}>
                            {option.age}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    error={errMessage ? true : false}
                    helperText={errMessage ? "Please answer question 3" : ""}
                    id="ans3"
                    name="ans3"
                    margin="normal"
                    required
                    fullWidth
                    select
                    label="Where did you get to know about us?"
                    value={input.ans3}
                    onChange={setInput}
                >
                    {question3.map((option) => (
                        <MenuItem key={option.from} value={option.from}>
                            {option.from}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </>
    );
}

export default SurveyForm;