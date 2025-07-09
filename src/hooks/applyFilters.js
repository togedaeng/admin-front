export function applyFilters(data, filterState) {
  return data.filter(item => {
    return Object.entries(filterState).every(([key, selectedValue]) => {
      if (!selectedValue || selectedValue.length === 0) return true;
      return selectedValue.includes(item[key]);
    });
  });
}