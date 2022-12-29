import React, { useState, useEffect } from 'react';

import useFetch from "./useFetch";
import FoundData from './FoundData';

const SearchBar = (props) => {
    const { album, setAlbum } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [postsToRender, setPostsToRender] = useState([]);
    const [toDosToRender, setToDosToRender] = useState([]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [photosData, setPhotosData] = useState([]);

    const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
    const urlToDos = 'https://jsonplaceholder.typicode.com/todos';
    const urlPhotos = `https://jsonplaceholder.typicode.com/albums/${album}/photos`;

    const { data: dataPosts, isPending: isPendingPosts, error: errorPosts } = useFetch(urlPosts);
    const { data: dataToDos, isPending: isPendingToDos, error: errorToDos } = useFetch(urlToDos);

    /*const getPhotosData = async () => {
      const urls = [];
      for (let i = 1; i <= 100; i++) {
        setAlbum(i);
        urls.push(urlPhotos);
      }
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        console.log('promise data', data);
        await setPhotosData(prev => [...prev, data]).then(() => {
          console.log('photosdata', photosData);
        });
      } catch (error) {
        // There was an error.
        console.error(error);
      }
    }  
    
    useEffect(() => {
      getPhotosData();
      //console.log('photosdata', photosData);
    }, []);*/

    useEffect(() => {
      !isPendingPosts && !isPendingToDos && setIsPending(false);
      errorPosts && setError(errorPosts);
      !error && errorToDos && setError(errorToDos);
    }, [dataPosts, isPendingPosts, errorPosts, dataToDos, isPendingToDos, errorToDos, error])


    useEffect(() => {
      setPostsToRender(dataPosts.filter(obj => obj.title.includes(searchTerm) || obj.body.includes(searchTerm)));
      setToDosToRender(dataToDos.filter(obj => obj.title.includes(searchTerm)));
      console.log('searchterm', searchTerm)
    }, [searchTerm]);

  
  return (
    <div>
      { error && <h1>{ error }</h1> }
      { isPending && <h1>Loading...</h1> }
      { !isPending && !error && <h2>Search term:</h2>}
      { !isPending && !error && <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Your favorite lorem ipsum"
      />}
      <FoundData postsToRender={postsToRender}
                 toDosToRender={toDosToRender} />
    </div>
  );
};


export default SearchBar