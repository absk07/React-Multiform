import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { multiForm } from '../redux/action';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicDetailsForm from '../components/BasicDetailsForm';
import FileUploadForm from '../components/FileUploadForm';
import SurveyForm from '../components/SurveyForm';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const steps = ['Basic Details', 'File Upload', 'Survey'];

const MultiForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [basicDetailsFormData, setBasicDetailsFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        pin: '',
    });
    const [file, setFile] = useState([]);
    const [surveyFormData, setSurveyFormData] = useState({ ans1: '', ans2: '', ans3: '' });
    const [errMessage, setErrMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formData = useSelector(state => state.formData);
    const { loading, error } = formData;

    const handleBasicDetailsFormDataChange = (e) => {
        setBasicDetailsFormData({
            ...basicDetailsFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUploadChange = (file) => {
        const fileList = file;
        const filesArray = [...fileList];
        setFile(prevFiles => [...prevFiles, ...filesArray]);
    };

    const handleDeleteFile = (filename) => {
        setFile(prevFiles => prevFiles.filter((file) => file.name !== filename));
    };

    const handleSurveyFormData = (e) => {
        setSurveyFormData({
            ...surveyFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        if (basicDetailsFormData.firstname === "" || basicDetailsFormData.lastname === "" || basicDetailsFormData.phone === "" || basicDetailsFormData.address1 === "" || basicDetailsFormData.address2 === "" || basicDetailsFormData.city === "" || basicDetailsFormData.state === "" || basicDetailsFormData.country === "" || basicDetailsFormData.pin === "") {
            setErrMessage("Required fields");
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setErrMessage(null);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        if (error) {
            setErrMessage(error)
        } else {
            dispatch(multiForm(basicDetailsFormData.firstname, basicDetailsFormData.lastname, basicDetailsFormData.phone, basicDetailsFormData.address1, basicDetailsFormData.address2, basicDetailsFormData.city, basicDetailsFormData.state, basicDetailsFormData.country, basicDetailsFormData.pin, file, surveyFormData.ans1, surveyFormData.ans2, surveyFormData.ans3));
            navigate('/profile');
        }
    };

    const renderForm = () => {
        switch (activeStep) {
            case 0:
                return <BasicDetailsForm input={basicDetailsFormData} setInput={handleBasicDetailsFormDataChange} errMessage={errMessage} />;
            case 1:
                return <FileUploadForm file={file} handleChange={handleFileUploadChange} handleDelete={handleDeleteFile} />;
            case 2:
                return <SurveyForm input={surveyFormData} setInput={handleSurveyFormData} errMessage={errMessage} />;
            default:
                return null;
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        width: '100%',
                        marginTop: 8,
                    }}
                >
                    <Stepper sx={{ mt: 3, mb: 3 }} activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {
                        errMessage && <ErrorMessage severity="error" setErrMessage={setErrMessage}>{errMessage}</ErrorMessage>
                    }
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {renderForm()}
                            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 5 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                {
                                    activeStep === steps.length - 1 ?
                                    <Button variant="contained" color="success" onClick={handleFinish}>Finish</Button> :
                                    <Button variant="contained" onClick={handleNext}>Next</Button>
                                }
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default MultiForm;