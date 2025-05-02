export const getTemperatureColor = (
  temp: number,
  unit: "celsius" | "fahrenheit"
) => {
  const coldTemp = unit === "celsius" ? -10 : 14;
  const coolTemp = unit === "celsius" ? 10 : 50;
  const mildTemp = unit === "celsius" ? 20 : 68;
  const warmTemp = unit === "celsius" ? 30 : 86;

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
