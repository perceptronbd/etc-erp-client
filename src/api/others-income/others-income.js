import { Style, logs } from "../../utils/logs";
import { trycatch } from "../../utils/trycatch";
import { noAuthURL } from "../instances";

export const addOthersIncomeApi = async (data) => {
  logs("API Call: ", [], Style.api);
  logs("Data: addOthersIncomeApi", [data], Style.code);

  const [registerRes, registerErr] = await trycatch(noAuthURL().post("/add-income", data));

  if (registerErr) {
    logs("Error: addOthersIncomeApi", [registerErr.response], Style.danger);
    return registerErr.response;
  }

  logs("Success: addOthersIncomeApi", [registerRes], Style.success);

  return registerRes;
};
