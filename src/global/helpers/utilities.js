import { confirmDialog } from "primereact/confirmdialog";

export const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const getSubdomain = () => {
  return "";
};

export const Confirm = ({
  message = "",
  acceptClassName = "bg-primary",
  acceptIcon = "pi pi-check",
  icon = "pi pi-exclamation-triangle",
  header = "Xác nhận",
  rejectIcon = "pi pi-times",
  acceptLabel = "Có",
  rejectLabel = "Không",
  ...options
}) => {
  confirmDialog({
    message,
    acceptClassName,
    acceptIcon,
    icon,
    header,
    rejectIcon,
    acceptLabel,
    rejectLabel,
    ...options,
  });
};
export const validateCardNumber = (cardnumber) =>
  cardnumber.length === 12 || cardnumber.length === 9;

export const validateEmail = (mail) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);

export const isISODate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
};
export const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

export function saveFile(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}
