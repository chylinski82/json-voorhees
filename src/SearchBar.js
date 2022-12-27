import React, { useState, useEffect } from 'react';

import useFetch from "./useFetch";
import FoundData from './FoundData';

const SearchBar = (props) => {
    const { album, setAlbum } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [postsToRender, setPostsToRender] = useState([]);
    const [toDosToRender, setToDosToRender] = useState([]);

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [dataPhotos, setDataPhotos] = useState([]);

    let urlPhotos = `https://jsonplaceholder.typicode.com/albums/${album}/photos`;
    let urlPosts = 'https://jsonplaceholder.typicode.com/posts';
    let urlToDos = 'https://jsonplaceholder.typicode.com/todos';

    const { data: dataPosts, isPending: isPendingPosts, error: errorPosts } = useFetch(urlPosts);
    const { data: dataToDos, isPending: isPendingToDos, error: errorToDos } = useFetch(urlToDos);

    useEffect(() => {
      //setData(data.concat(dataPosts, dataToDos));
      !isPendingPosts && !isPendingToDos && setIsPending(false);
      errorPosts && setError(errorPosts);
      !error && errorToDos && setError(errorToDos);
    }, [dataPosts, isPendingPosts, errorPosts, dataToDos, isPendingToDos, errorToDos, error])

    for (let i = 1; i <= 100; i++) {
      setAlbum(i)
      //const { data, isPending, error } = useFetch(urlPhotos)
    }

    //console.log(data, isPending, error);

    const onSearchTermChangeHandler = (e) => {
      setSearchTerm(e.target.value);
      setPostsToRender(dataPosts.filter(obj => obj.title.includes(searchTerm) || obj.body.includes(searchTerm)));
      setToDosToRender(dataToDos.filter(obj => obj.title.includes(searchTerm)));
      //console.log(postsToRender, 'posts', toDosToRender, 'todos');
      console.log('searchterm', searchTerm)
    }

    const onClearSearchTermHandler = () => {

    }
  
  return (
    <div>
      { error && <h1>{ error }</h1> }
      { isPending && <h1>Loading...</h1> }
      { !isPending && !error && <h2>Search term:</h2>}
      { !isPending && !error && <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
        placeholder="Your favorite lorem ipsum"
      />}
      {searchTerm.length > 0 && (
        <button
          onClick={onClearSearchTermHandler}
          type="button"
          id="search-clear-button"
        >Clear
        </button>
      )}
      <FoundData postsToRender={postsToRender}
                 toDosToRender={toDosToRender} />
    </div>
  );
};


export default SearchBar