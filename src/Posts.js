import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import PostsMap from "./PostsMap";

const Posts = () => {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    const { data, isPending, error } = useFetch(url);

    const [postNumber, setPostNumber] = useState(null);             // chosen data set
    const [allPosts, setAllPosts] = useState(true);                 // toggle to view all data sets
    const [user, setUser] = useState('all');                        // sort by user
    const [enterPressed, setEnterPressed] = useState(false);        // variable to prevent auto submit after first submit, 
                                                                    // user required to press enter
    const [deleted, setDeleted] = useState([]);                     // deletes whole item, passed as prop to PostsMap
    const [edit, setEdit] = useState();                             // copies content to update      
    const [newTitle, setNewTitle] = useState();                     // sets new title as user types,                                                                    // when 'edit' set to undefined, this will be moved to 'title' array
    const [newBody, setNewBody] = useState();                       // sets new title as user types, 
                                                                    // when 'edit' set to undefined, this will be moved to 'body' array 
      
    const [title,setTitle] = useState([]);                          // array of all titles                                                                
    useEffect(() => {
        data && setTitle(data.map(item => item.title));
    }, [data]);
    
    const [body, setBody] = useState([]);                           // array of all bodies/ content
    useEffect(() => {
        data && setBody(data.map(item => item.body));
    }, [data]);

    const handleClickDelete = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
            method: 'DELETE',
        }).then(() => {
            setDeleted(deleted.concat(data.title));
        })   
    }

    const handleClickEdit = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                title: setTitle(prev => [...prev, title[data.id - 1] = newTitle]),
                body: setBody(prev => [...prev, body[data.id - 1] = newBody])
             }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        });
        setEdit();
    }

    const handleSubmit = (e) => {                                   // handles status choice
        e.preventDefault();
        setEnterPressed(true);
        setAllPosts(false);
        
    } 

    const handleClickAllPosts = (e) => {                                    // back to all ToDos
        e.preventDefault();
        setAllPosts(true);

    }

    return ( 
        <div className="content">
            <div className="options">
                <form onSubmit={handleSubmit}>
                    <label>Post nr: </label>
                    <input type="number"
                        min="1" 
                        max="100"
                        onChange={(e) => {
                            setPostNumber(Number(e.target.value) - Number(1));
                            setEnterPressed(false);
                        }}/>
                </form>             
                <button onClick={handleClickAllPosts}>All Posts</button>
                <form>
                    <label>User: </label>                               
                    <select onChange={(e) => setUser(e.target.value)}>          
                        <option value="all">All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </form>
            </div>
            <div className="main">
                { error && <h1>{ error }</h1> }
                { isPending && <h1>Loading...</h1> }
                { data && !isPending && allPosts && <h1>All Posts</h1> }
                { data && !isPending && !allPosts && enterPressed && !deleted.includes(data[postNumber].title) && <h1 className="space">{data[postNumber].title}</h1> }
                { data && !isPending && !allPosts && enterPressed && deleted.includes(data[postNumber].title) && <h1 className="space"> Item deleted</h1> }

                {data && !isPending && allPosts && <PostsMap data={data}
                                                             user={user}
                                                             deleted={deleted}
                                                             handleClickDelete={handleClickDelete}
                                                             handleClickEdit={handleClickEdit}
                                                             edit={edit}
                                                             setEdit={setEdit}
                                                             title={title}
                                                             body={body}
                                                             setNewBody={setNewBody}
                                                             setNewTitle={setNewTitle} />}

                {data && !allPosts && enterPressed && !deleted.includes(data[postNumber].title) &&
                    <div>
                        <br/><br/>
                        <p>{ data[postNumber].body}</p>  
                        <br/><br/>
                        <div className="apart">
                            <button onClick={() => handleClickDelete(data[postNumber])}>DELETE ITEM</button>
                            <h3>Nr: {data[postNumber].id}</h3>                   
                            <h2>User: {data[postNumber].userId}</h2>
                        </div>                             
                    </div> 
                }
            </div>
        </div>
    );
}
 
export default Posts;