import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppContext } from '../../context/AppContext';
import { styles } from "./styles"
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../hooks/redux';
import { postSlice } from '../../store/reducers/PostSlice';

interface FormData {
  title: string;
  text: string;
  img: string;
}

const ModalAddPost: React.FC = () => {
  const { appParameters, changeAppParameters } = useAppContext();
  const { isOpenModal = false } = appParameters;
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useAppDispatch();

  const handleClose = () => {
    changeAppParameters({
      isOpenModal: false
    })
  }

  const handleChangeImg = (e: any) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setValue("img", URL.createObjectURL(e.target.files[0]));
  }

  const removeImg = () => {
    setSelectedImage('');
    setValue('img', '');
  }

  const onSubmit = (data: FormData) => {
    if (data.title && data.text) {
      const newPost = {
        ...data,
        id: Math.floor(Math.random() * 10000).toString()
      }
      dispatch(postSlice.actions.addNewPost(newPost));
      removeImg();
      handleClose();
      reset();

    } else {
      alert(" Fill in Title and Text fields ");
    }
  }

  return (
    <Modal
      open={isOpenModal}
      onClose={handleClose}
    >
      <Box sx={styles.container}>
        <Typography variant="h6" component="h2" align='center'>
          Create Post
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={styles.form}
        >
          <TextField
            {...register("title")}
            sx={styles.input}
            label="Title"
            variant="outlined"
          />

          <TextField
            {...register("text")}
            sx={styles.input}
            label="Text"
            variant="outlined"
          />

          <Input {...register("img")} onChange={handleChangeImg} type='file' sx={styles.input} />
          {selectedImage && (
            <Box sx={styles.imgBox}>
              <Box width={100} component='img' src={selectedImage}></Box>
              <IconButton size='small' onClick={removeImg}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={styles.buttonsBox}>
            <Button type='submit' variant='contained'>Create</Button>
            <Button variant="outlined" color="error">Cansel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalAddPost;