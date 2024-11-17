export const API_KEY = "AIzaSyBz3kpR59eDjcNGwubXH9ht3In8qbUdRk4";

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};