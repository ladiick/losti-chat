import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import { setTypeDropZone, setVisibleDropZone } from "../../../../redux/slices/dragAndDropSlice";
import s from "./Home.module.scss";
import { identifyFileExtension } from "./helpers/identifyFileExtension.js";
import Navigation from '../Navigation/Navigation'
const Home = ({ children }) => {
  const dispatch = useDispatch();
  const chatActive = useSelector((state) => state.navigation.chat);
  const { isMedia } = useMatchMedia();

  const dragOver = useSelector((state) => state.dragAndDrop.dragOver);

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = dragOver ? "copy" : "none";

    const items = e.dataTransfer.items;

    dispatch(setTypeDropZone(identifyFileExtension(items)));

    dispatch(setVisibleDropZone(true));
  }, []);

  const onDragLeave = (e) => {
    e.preventDefault();
    if (e.screenX === 0 && e.screenY === 0) {
      dispatch(setVisibleDropZone(false));
    }
  };

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
  }, [dragOver]);

  if (isMedia) {
    return (
      <div className={s.wrapper}>
        <div className={s.container}>
          {!chatActive && <Navigation />}
          <div className={s.content}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Navigation />
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Home;
