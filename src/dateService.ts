export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = String(date.getFullYear()).slice(2, 4);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate());
  const hour = String(date.getHours());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return ` ${day}.${month}.${year} // ${hour}:${minutes} `;
};
