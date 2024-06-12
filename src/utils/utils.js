export function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(3).replace(/\.0+$/, "") + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(3).replace(/\.0+$/, "") + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(3).replace(/\.0+$/, "") + "K";
  }
  return num.toString();
}

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    border: "none",
    boxShadow: "none", // Removes the focus border
    backgroundColor: "var(--header)",
    width: "100%",
    height: "60px",
    fontSize: "1.4em",
    fontFamily: '"Lexend", sans-serif',
    display: "flex",
    alignItems: "center", // Center the text vertically
    justifyContent: "center", // Center the text horizontally
    "&:hover": {
      border: "none",
      boxShadow: "none",
      backgroundColor: "var(--header)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--header)", // Background color for the menu (options list)
    border: "none", // Remove border from the menu
    boxShadow: "none", // Remove shadow from the menu
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text)", // Text color for the selected input
  }),
  option: (provided, state) => ({
    ...provided,
    color: "var(--text)", // Text color
    backgroundColor: "var(--header)",
    border: "none",
    fontFamily: '"Lexend", sans-serif',
    fontSize: "1.4em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center", // Center the text vertically
    "&:hover": {
      backgroundColor: "var(--header)", // Change background color on hover
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--text)",
    "&:hover": {
      color: "var(--text)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Removes the separator between indicators
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text)", // Text color for the placeholder
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "var(--text)",
    "&:hover": {
      color: "var(--text)",
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
};

import { toast } from "react-toastify";

export const errorMsgs = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "error",
    theme: "dark",
  });
export const successMsg = (e) =>
  toast(e, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: "success",
    theme: "dark",
  });
