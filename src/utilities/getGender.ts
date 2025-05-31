export const getGenderLabel = (gender: number): string => {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return "Unknown";
  }
};
