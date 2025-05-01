export const getTemperatureColor = (temp: number) => {
  const coldTemp = -10;
  const coolTemp = 10;
  const mildTemp = 20;
  const warmTemp = 30;

  if (temp <= coldTemp) {
    return "from-blue-900 to-blue-800";
  } else if (temp <= coolTemp) {
    return "from-blue-600 to-blue-500";
  } else if (temp <= mildTemp) {
    return "from-teal-400 to-green-500";
  } else if (temp <= warmTemp) {
    return "from-yellow-400 to-orange-500";
  } else {
    return "from-orange-600 to-red-600";
  }
};
