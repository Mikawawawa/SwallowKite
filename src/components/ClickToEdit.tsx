import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  InputBase,
  ClickAwayListener,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Input } from "@mui/joy";
import { Cancel } from "@mui/icons-material";

export const EditableText: React.FC<{
  value: string;
  onChange: (newName: string) => void;
}> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(value);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    onChange(editedName);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedName(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      {isEditing ? (
        <ClickAwayListener onClickAway={handleCancelEditing}>
          <>
            <Input
              size={"sm"}
              value={editedName}
              onChange={handleChange}
              onBlur={handleFinishEditing}
              autoFocus
            />
            <IconButton onClick={handleFinishEditing} size="small">
              <Cancel />
            </IconButton>
          </>
        </ClickAwayListener>
      ) : (
        <>
          <Typography onClick={handleStartEditing} sx={{ cursor: "pointer" }}>
            {value}
          </Typography>
        </>
      )}
    </Stack>
  );
};
