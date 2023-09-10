export function calculateAge(birthDate: any) {
  const currentDate = new Date();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  // Check if the birthdate hasn't occurred yet this year.
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  // If ageMonths is negative, adjust for previous month.
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(currentYear, currentMonth, 0).getDate();
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}
