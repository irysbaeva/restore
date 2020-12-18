export default class BookstoreService {
  data = [
    {
      id: 1,
      title: "Production-Ready Microservices",
      author: "Susan J.Fowler",
      price: 32,
      coverImage:
        "https://media.wired.com/photos/5be4cd03db23f3775e466767/125:94/w_2375,h_1786,c_limit/books-521812297.jpg",
    },
    {
      id: 2,
      title: "Release it!",
      author: "Michael T.Nygard",
      price: 45,
      coverImage:
        "https://media.wired.com/photos/5be4cd03db23f3775e466767/125:94/w_2375,h_1786,c_limit/books-521812297.jpg",
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
        reject(new Error('Someettt bad'))
      }, 700);
    });
  }
}
