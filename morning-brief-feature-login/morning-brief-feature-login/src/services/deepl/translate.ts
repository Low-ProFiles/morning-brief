import axios from 'axios';
import { DEEPL_API_TOKEN } from '../../config/apiToken'
import { DEEPL_API_URL } from '../../config/apiUrl';

export const deeplTranslate =  async (text: string) => {
  const res = await axios.post(
    DEEPL_API_URL,
    new URLSearchParams({
      auth_key: DEEPL_API_TOKEN,
      text,
      target_lang: 'KO',
    })
  );
  return res.data.translations[0].text;
}
