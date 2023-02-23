import React from "react";
import { styles } from "./styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../../context/AppContext";

const CustomButton: React.FC = () => {
    const { changeAppParameters } = useAppContext();

    const handleClick = () => {
        changeAppParameters({
            isOpenModal: true
        })
    }

    return (
        <Button
            onClick={handleClick}
            size="medium"
            color="success"
            variant="outlined"
            sx={styles.button}
            startIcon={<PostAddIcon sx={styles.icon} />}
        >
            <Typography variant="h6">Add Post</Typography>
        </Button>
    );
};

export default CustomButton;
