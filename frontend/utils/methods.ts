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

// Update window URL with module code
export const updateWindowUrl = (moduleCode: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set('moduleCode', moduleCode);
  window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
};
