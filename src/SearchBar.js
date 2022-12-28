import React, { useState, useEffect } from 'react';

import useFetch from "./useFetch";
import FoundData from './FoundData';

const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [postsToRender, setPostsToRender] = useState([]);
    const [toDosToRender, setToDosToRender] = useState([]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    let urlPosts = 'https://jsonplaceholder.typicode.com/posts';
    let urlToDos = 'https://jsonplaceholder.typicode.com/todos';

    const { data: dataPosts, isPending: isPendingPosts, error: errorPosts } = useFetch(urlPosts);
    const { data: dataToDos, isPending: isPendingToDos, error: errorToDos } = useFetch(urlToDos);

    useEffect(() => {
      !isPendingPosts && !isPendingToDos && setIsPending(false);
      errorPosts && setError(errorPosts);
      !error && errorToDos && setError(errorToDos);
    }, [dataPosts, isPendingPosts, errorPosts, dataToDos, isPendingToDos, errorToDos, error])

    const onSearchTermChangeHandler = (e) => {
      setSearchTerm(e.target.value);
      setPostsToRender(dataPosts.filter(obj => obj.title.includes(searchTerm) || obj.body.includes(searchTerm)));
      setToDosToRender(dataToDos.filter(obj => obj.title.includes(searchTerm)));
      //console.log(postsToRender, 'posts', toDosToRender, 'todos');
      console.log('searchterm', searchTerm)
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
      <FoundData postsToRender={postsToRender}
                 toDosToRender={toDosToRender} />
    </div>
  );
};


export default SearchBar