import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { FileUploader } from "react-drag-drop-files";
import '../assets/file.css';

const fileTypes = ["JPG", "PNG", "PDF"];

const FileUploadForm = ({ file, handleChange, handleDelete }) => {
    return (
        <>
            <Box sx={{
                mt: 5,
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                {
                    file.length > 0 ? (
                        <Grid item xs={12} md={6}>
                            <List>
                                {file.map((f, idx) => (
                                    <ListItem
                                        key={f.name}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete"  onClick={() => handleDelete(f.name)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={f.name}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    ) : (
                        <p>No files uploaded yet</p>
                    )
                }
            </Box>
        </>
    );
}

export default FileUploadForm;