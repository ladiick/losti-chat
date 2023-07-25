
// для bottom menu
export const styleText = (isMobile) => {
  return {
    textAlign: "left",
    flexGrow: 1,
    paddingLeft: !isMobile ? 10 : 0,
    fontSize: isMobile && 10,
    cursor: "pointer",
  };
};
