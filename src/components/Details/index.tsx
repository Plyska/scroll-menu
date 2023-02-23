import React, { useMemo, useState, useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useAppContext } from "../../context/AppContext";
import { Post, DataForEditPost } from "../../types/Post";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { postSlice } from "../../store/reducers/PostSlice";

const Details: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector((state) => state.postReducer);
    const { appParameters } = useAppContext();
    const { selectedPostId = "" } = appParameters.params;
    const selectedPost: Post = useMemo(
        () => posts.filter((post) => post.id === selectedPostId)[0],
        [posts, selectedPostId]
    );
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState<string>(selectedPost?.title || '');

    const handleEdit = () => {
        setIsEditMode((prev) => !prev);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value)
    }

    const saveChanges = () => {
        const dataForEditPost: DataForEditPost = {
            title: titleValue,
            id: selectedPostId
        }
        dispatch(postSlice.actions.postEdit(dataForEditPost));
        setIsEditMode(false);
    }

    useEffect(() => {
        setIsEditMode(false);
        setTitleValue(selectedPost?.title);
    }, [selectedPostId, selectedPost])

    return (
        <Box sx={styles.container}>
            {selectedPost && (
                <Box>
                    {isEditMode ? (
                        <Box sx={styles.inputContainer}>
                            <TextField
                                inputProps={{ style: styles.inputParams }}
                                sx={styles.input}
                                label="Title"
                                variant="standard"
                                value={titleValue}
                                onChange={handleTitleChange}
                                autoFocus
                                error={!titleValue}
                                helperText={!titleValue ? "Field cannot be empty" : ''}
                            />
                            <Button disabled={!titleValue} sx={styles.button} variant="contained" onClick={saveChanges}>
                                <Typography>Save</Typography>
                            </Button>
                        </Box>
                    ) : (
                        <Typography sx={styles.title} onClick={handleEdit} variant="h3">
                            {selectedPost.title}
                        </Typography>
                    )}

                    <Box sx={styles.img} component="img" src={selectedPost.img}></Box> {/* Uploaded img is not displayed. Usually, the img is uploaded on server and server returns url to this photo */}
                    <Typography sx={styles.text} variant="h5">
                        {selectedPost.text}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Details;
