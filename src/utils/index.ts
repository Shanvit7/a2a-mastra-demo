/**
 * Format date as YYYY-MM-DD, offset days from today
 */
export const formatDateWithOffset = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};
