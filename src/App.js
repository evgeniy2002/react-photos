import React from 'react';
import { Collection } from './Collection';

import './index.scss';

const arr = ['Все', 'Горы', 'Море', 'Архитектура', 'Города'];

function App() {
  const [photos, setPhotos] = React.useState([]);
  const [category, setCategory] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetch('https://6301ec86c6dda4f287af4f71.mockapi.io/collections')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const categoryId = category ? `category=${category}` : '';

    fetch(
      `https://6301ec86c6dda4f287af4f71.mockapi.io/collections?page=${page}&limit=3&${categoryId}`,
    )
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .finally(() => setIsLoading(false));
  }, [category, page]);
  const onChangeCategory = (idx) => {
    setCategory(idx);
  };

  const onChangeSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {arr.map((item, index) => (
            <li
              key={item}
              className={category === index ? 'active' : ''}
              onClick={() => onChangeCategory(index)}>
              {item}
            </li>
          ))}
          {/* <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li> */}
        </ul>
        <input
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          photos
            .filter((el) => {
              return el.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((obj, idx) => <Collection key={idx} name={obj.name} images={[...obj.photos]} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, idx) => (
          <li className={page === idx + 1 ? 'active' : ''} onClick={() => setPage(idx + 1)}>
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
