export default class BookstoreService {
  key = "AIzaSyAsI4OnR5KGzEeeld_AsrtlkromLtOod6A";
  _apiBase = `https://www.googleapis.com/books/v1/volumes`;
  getBooks = async (word, category, startIndex, order) => {
    const subject = category === "all" ? "" : `subject:${category}`;
    const res = await fetch(
      `${this._apiBase}/?q=${word}+${subject}&startIndex=${startIndex}&maxResults=30&orderBy=${order}&key=${this.key}`
    );
    if (!res.ok) {
      throw new Error(`Could not fetch  recieved ${res.status}`);
    }
    const body = await res.json();

    return body.items;
  };
}
