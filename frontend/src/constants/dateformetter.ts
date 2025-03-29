export const formateDateTime = (timeStamp: string | undefined) => {
  if (!timeStamp) timeStamp = Date.now().toLocaleString();
  const date = new Date(timeStamp);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
};

export const formateDate = (timeStamp: string | undefined) => {
  if (!timeStamp) timeStamp = Date.now().toLocaleString();
  const date = new Date(timeStamp);

  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};
