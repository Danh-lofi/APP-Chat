const FormatDate = (birthDate) => {
  // Format date
  const birthDateFormat = new Date(birthDate);
  const year = birthDateFormat.getFullYear();
  const date =
    birthDateFormat.getDate() < 10
      ? "0" + birthDateFormat.getDate()
      : birthDateFormat.getDate();
  const month =
    birthDateFormat.getMonth() + 1 < 10
      ? "0" + (birthDateFormat.getMonth() + 1)
      : birthDateFormat.getMonth() + 1;
  //
  return `${date}-${month}-${year}`;
};
export default FormatDate;
