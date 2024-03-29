export const findByIdAndReturnName = (data: object[], id: string) => {
  // @ts-ignore
  return data.find((item: any) => item.id === id)?.name;
};

export const createISODate = (day: number, startHour: number) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  dayOfWeek === 0 ? date.setDate(date.getDate() - 7) : date.setDate(date.getDate() - date.getDay());

  date.setDate(date.getDate() + day);
  date.setHours(startHour);
  date.setMinutes(0);
  return date.toISOString();
};
