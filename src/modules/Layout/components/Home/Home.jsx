import { Box } from "@mui/joy";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTypeDropZone, setVisibleDropZone } from "../../../../redux/slices/dragAndDropSlice";
import { identifyFileExtension } from "./helpers/identifyFileExtension.js";
const Home = ({ children }) => {
  const dispatch = useDispatch();

  const dragOver = useSelector((state) => state.dragAndDrop.dragOver);

  const onDragStart = useCallback(
    (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = dragOver ? "copy" : "none";

      const items = e.dataTransfer.items;

      dispatch(setTypeDropZone(identifyFileExtension(items)));

      dispatch(setVisibleDropZone(true));
    },
    [dispatch, dragOver],
  );

  const onDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      if (e.screenX === 0 && e.screenY === 0) {
        dispatch(setVisibleDropZone(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener("dragstart", onDragStart);
    window.addEventListener("dragover", onDragStart);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", () => !!dragOver);

    return () => {
      window.addEventListener("dragstart", onDragStart);
      window.addEventListener("dragover", onDragStart);
      window.removeEventListener("dragleave", onDragLeave);
      window.addEventListener("drop", () => !!dragOver);
    };
  }, [dragOver, onDragLeave, onDragStart]);


  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "100%",

        "@media (max-width: 768px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Home;
