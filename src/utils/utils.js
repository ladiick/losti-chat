export const helperMessage = (currentObj, preObj) => {
  const currentItem = new Date(currentObj?.time);
  const preItem = new Date(preObj?.time);

  if (
    currentItem.getHours() === preItem.getHours() &&
    Math.abs(currentItem.getMinutes() - preItem.getMinutes()) < 5 &&
    currentObj?.sender?.pk === preObj?.sender?.pk
  ) {
    return true;
  }
  return false;
};
