import axios from "axios";
import { DEEPL_API_TOKEN } from "../../config/apiToken";
import { DEEPL_API_URL } from "../../config/apiUrl";

export const deeplTranslate = async (text: string): Promise<string> => {
  const { data } = await axios.post(
    DEEPL_API_URL,
    new URLSearchParams({ auth_key: DEEPL_API_TOKEN, text, target_lang: "KO" }),
  );
  return data.translations?.[0]?.text ?? "";
};
