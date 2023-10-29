export const borderRadiusImage = ({ length, index }) => {
  if (length === 1) {
    return "12px 12px 0 0";
  }
  if (length === 2) {
    return index === 0 ? "12px 0 0 0" : index === 1 ? "0 12px 0 0" : "";
  }
  if (length > 2) {
    return index === 0 ? "12px 0 0 0" : index === 1 ? "0 12px 0 0" : index > 2 ? "0" : "";
  }
};
