import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { BsCamera } from "react-icons/bs";
import { TbFiles } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Text from "../../../../components/ui/Text/Text";
import { setDragOver, setVisibleDropZone } from "../../../../redux/slices/dragAndDropSlice";
import { onChangeFileDialog } from "../../../../redux/slices/messageSlice";
import s from "./DragAndDropFileUpload.module.scss";

const DragAndDropFileUpload = ({ children, style }) => {
  const visibleDragAndDrop = useSelector((state) => state.dragAndDrop.visibleDropZone);
  const typeDropZone = useSelector((state) => state.dragAndDrop.typeDropZone);

  const dragOver = useSelector((state) => state.dragAndDrop.dragOver);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const dragStartHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setDragOver(true));
    dispatch(setVisibleDropZone(true));
  }, []);

  const dragLeaveHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDragOver(false));
  }, []);

  const onDropHandler = useCallback((file) => {
    dispatch(setVisibleDropZone(false));
    dispatch(setDragOver(false));
    dispatch(
      onChangeFileDialog({
        id: searchParams.get("dialogs"),
        file,
      }),
    );
  }, []);

  return (
    <>
      <Dropzone
        multiple={true}
        maxFiles={10}
        noClick={true}
        noKeyboard={true}
        onDrop={onDropHandler}
        onDragOver={dragStartHandler}
        onDragEnter={dragStartHandler}
        onDragLeave={dragLeaveHandler}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={s.content__drop} style={style}>
            <input {...getInputProps()} />
            <div
              className={s.overlay__drop}
              style={visibleDragAndDrop ? { display: "flex" } : { display: "none" }}
            >
              <div
                className={s.over__drop}
                style={
                  dragOver
                    ? {
                        background: "var(--background--content--secondary--hover)",
                        border: "solid",
                      }
                    : {}
                }
              >
                {typeDropZone === "image" ? (
                  <BsCamera size={106} />
                ) : (
                  <TbFiles size={106} strokeWidth={0.5} />
                )}

                <Text
                  style={{
                    marginTop: 10,
                    color: "var(--text--secondary)",
                  }}
                >
                  {typeDropZone === "image"
                    ? "Перетащите сюда фотографии, чтобы прикрепить их к сообщению"
                    : "Перетащите сюда документы, чтобы прикрепить их к сообщению"}
                </Text>
              </div>
            </div>
            {children}
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default DragAndDropFileUpload;
