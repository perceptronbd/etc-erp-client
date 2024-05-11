import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { noAuthURL } from "../instances";

export const addExpensesApi = async (data) => {
  logs("API Call: ", [], Style.api);
  logs("Data: addExpensesApi", [data], Style.code);

  const [registerRes, registerErr] = await trycatch(noAuthURL().post("/add-expense", data));

  if (registerErr) {
    logs("Error: addExpensesApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: addExpensesApi", [registerRes], Style.success);

  return registerRes;
};
