export function applyFilters(data, filters) {
  return data.filter(item => {
    const roleMatch = !filters.role || filters.role === "ALL" || item.role === filters.role;
    const statusMatch = !filters.status || filters.status === "ALL" || item.status === filters.status;
    const genderMatch = !filters.gender || filters.gender === "ALL" || item.gender === filters.gender;
    console.log(item.role, item.status, item.gender)

    return roleMatch && statusMatch && genderMatch;
  });
}
