const CustomScroll = {
  "&::-webkit-scrollbar-track": {
    transition: "all .3s",
    borderRadius: "sm",
  },
  "&::-webkit-scrollbar": {
    transition: "all .3s",
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    transition: "all .3s",
    borderRadius: "sm",
    background: "var(--joy-palette-background-level2)",
  },
};

export default CustomScroll;
