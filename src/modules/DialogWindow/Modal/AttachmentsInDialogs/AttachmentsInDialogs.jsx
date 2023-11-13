// import { Dialog, Tab } from "@headlessui/react";
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useSearchParams } from "react-router-dom";
// // import { setOpenFromDialog } from "../../../redux/slices/navigationSlice";
// import s from "./AttachmentsInDialogs.module.scss";

// import { modalsSelectors, setAttachmentsModal } from "../../../../redux/slices/modalsSlice";
// import CloseButton from "../../../components/ui/CloseButton/CloseButton";
// import { variantsAnimationModal } from "../../../utils/variantsAnimationModal";
// import OutputImage from "./OutputImage";

// const AttachmentsInDialogs = () => {
//   const { isOpenAttachmentsModal } = useSelector((state) => modalsSelectors(state));
//   const dispatch = useDispatch();

//   // const [tabItems] = useState([
//   //   {
//   //     title: "Фотографии",
//   //     type: "photo",
//   //     onClick: () =>
//   //       setSearchParams({
//   //         dialogs: searchParams.get("dialogs"),
//   //         history: `${searchParams.get("dialogs")}_photo`,
//   //       }),
//   //   },
//   //   {
//   //     title: "Файлы",
//   //     type: "file",
//   //     onClick: () =>
//   //       setSearchParams({
//   //         dialogs: searchParams.get("dialogs"),
//   //         history: `${searchParams.get("dialogs")}_file`,
//   //       }),
//   //   },
//   // ]);

//   const closeFunc = () => {
//     dispatch(setAttachmentsModal(false));
//   };

//   return (
//     <AnimatePresence>
//       {isOpenAttachmentsModal && (
//         <Dialog as="div" initialFocus={false} open={isOpenAttachmentsModal} onClose={closeFunc}>
//           <motion.div
//             initial={"hidden"}
//             animate={"visible"}
//             exit={"exit"}
//             variants={variantsAnimationModal}
//             className={"dialog__overlay"}
//           >
//             <Dialog.Panel className={s.wrapper__content}>
//               <Tab.Group>
//                 <Tab.List className={s.header}>
//                   <div>
//                     {tabItems?.map((item) => (
//                       <Tab
//                         key={item.title}
//                         onClick={item.onClick}
//                         className={
//                           searchParams?.get("history")?.includes(item?.type)
//                             ? s.tab__selected
//                             : s.tab
//                         }
//                       >
//                         {/* <Text style={{ cursor: "pointer" }}>{item.title}</Text> */}
//                       </Tab>
//                     ))}
//                   </div>
//                   <CloseButton onClick={() => closeFunc()} />
//                 </Tab.List>
//                 <Tab.Panels className={s.wrapper__panel}>
//                   <Tab.Panel>
//                     <OutputImage />
//                     <Outlet />
//                   </Tab.Panel>
//                   <Tab.Panel>Content 2</Tab.Panel>
//                 </Tab.Panels>
//               </Tab.Group>
//             </Dialog.Panel>
//           </motion.div>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AttachmentsInDialogs;
