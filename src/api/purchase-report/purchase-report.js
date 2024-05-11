import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { authFileURL, authURL } from "../instances";

export const getAllPurchaseReportApi = async () => {
  logs("API Call: getAllPurchaseReports", [], Style.api);
  const storedUser = sessionStorage.getItem("user");
  const token = JSON.parse(storedUser).token;

  const [registerRes, registerErr] = await trycatch(authURL(token).get("/getallPurchaseReport"));

  if (registerErr) {
    logs("Error: getallPurchaseReport", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: getallPurchaseReport", [registerRes], Style.success);

  return registerRes;
};
