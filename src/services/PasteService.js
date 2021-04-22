import DropboxService from "./DropboxService";

export default class SnippetService {

  static async save (service, body) {
    const api_paste_code = body.api_paste_code.trim();
    const  api_paste_name = body.api_paste_name.trim();
    if (service === 'dropbox') {
      let resp = await DropboxService.upload(api_paste_code, api_paste_name);
      return resp;
    }
    else {
      if (service === 'hastebin') {
        body = { data: api_paste_code };
      }
      const url = `https://haikel.pythonanywhere.com/api/${service}/save`;
      let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      let paste = await resp.text();
      return paste;
    }
  }

  static async raw (service, pasteURL) {
    try {
      const url = `http://haikel.pythonanywhere.com/api/${service}?paste_url=${pasteURL}`;
      let resp = await fetch(url);
      let txt = await resp.text();
      return txt;
    } catch (error) {
      return '';
    }
  }
}