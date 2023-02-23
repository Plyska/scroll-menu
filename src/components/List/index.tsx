import React, { MouseEvent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { styles } from "./styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../../context/AppContext";
import Typography from '@mui/material/Typography';

const List: React.FC = () => {
    const { posts } = useAppSelector((state) => state.postReducer);
    const { appParameters, changeAppParameters } = useAppContext();
    const { selectedPostId = '' } = appParameters.params;

    const handleClickItem = (e: MouseEvent) => {
        changeAppParameters({
            params: {
                selectedPostId: (e.target as Element).id
            }
        })
    };

    return (
        <Box sx={styles.container}>
            {posts.map((post) => (
                <MenuItem
                    id={post.id}
                    onClick={handleClickItem}
                    selected={post.id === selectedPostId}
                    key={post.id}
                    sx={styles.card}
                >
                    <Typography sx={styles.title} variant="h4" align="center">{post.title}</Typography>
                </MenuItem>
            ))}
        </Box>
    );
};

export default List;
