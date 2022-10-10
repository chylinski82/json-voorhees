import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import DataMap from "./DataMap";

const ToDos = () => {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    const { data, isPending, error } = useFetch(url);

    const [toDoNumber, setToDoNumber] = useState(null);             // chosen data set
    const [allToDos, setAllToDos] = useState(true);                 // toggle to view all data sets
    const [status, setStatus] = useState('all');                    // sort by status  
    const [user, setUser] = useState('all');                        // sort by user
    const [enterPressed, setEnterPressed] = useState(false);        // variable to prevent auto submit after first submit, 
                                                                    // user required to press enter
    const [deleted, setDeleted] = useState([]);                     // deletes whole item, passed as prop to DataMap
    const [toDosData, setToDosData] = useState([]);                 // copies all data
    const [edit, setEdit] = useState();                             // marks id number of data set to update content
    const [title, setTitle] = useState([]);                         // array of all titles/content
    const [newTitle, setNewTitle] = useState();                     // sets new title as user types, 
                                                                    // when 'edit' set to undefined, this will be moved to 'title' array
    useEffect(() => {
        data && setToDosData(data);
    }, [data]);

    useEffect(() => {
        data && setTitle(data.map(item => item.title));
    }, [data]);

    const handleClickStatus = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: !data.completed }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        }).then(res => res.json())
            .then(json => {
                //!json.completed ? setCompleted(completed.filter(item => item.id !== data.id))
                //                : setCompleted(completed.concat(data).sort(({id:a},{id:b}) => a-b));
                setToDosData(prev => [...prev, toDosData[data.id - 1].completed = json.completed]);               
            });

    }

    const handleClickDelete = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'DELETE',
        }).then(() => {
            setDeleted(deleted.concat(data.title));
        })   
    }

    const handleClickEdit = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: setTitle(prev => [...prev, title[data.id - 1] = newTitle]) }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        });
        setToDosData(prev => [...prev, toDosData[data.id - 1].title = newTitle]);
        setEdit();
    }

    const handleSubmit = (e) => {                                   // handles status choice
        e.preventDefault();
        setEnterPressed(true);
        setAllToDos(false);
        
    } 

    const handleClickAllTodos = (e) => {                                    // back to all ToDos
        e.preventDefault();
        setAllToDos(true);

    }
 
    return (
        <div className="content">
            <div className="options">
                <form onSubmit={handleSubmit}>
                    <label>ToDo nr: </label>
                    <input type="number"
                        min="1" 
                        max="200"
                        onChange={(e) => {
                            setToDoNumber(Number(e.target.value) - Number(1));
                            setEnterPressed(false);
                        }}/>
                </form>             
                <button onClick={handleClickAllTodos}>All ToDos</button>
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
                <form>
                    <label>Status </label>
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="not completed">Not completed</option>
                    </select>
                </form>
            </div>
                       
            <div className="main">
                { error && <h1>{ error }</h1> }
                { isPending && <h1>Loading...</h1> }
                { toDosData && !isPending && allToDos && <h1>All ToDos</h1> }                                            
                { toDosData && !isPending && !allToDos && enterPressed && !deleted.includes(toDosData[toDoNumber].title) && <h1 className="space">{toDosData[toDoNumber].title}</h1> }
                { toDosData && !isPending && !allToDos && enterPressed && deleted.includes(toDosData[toDoNumber].title) && <h1 className="space"> Item deleted</h1> }

                {toDosData && !isPending && allToDos && <DataMap status={status}                                            
                                                                 data={toDosData}                                      
                                                                 user={user}
                                                                 deleted={deleted}                                        
                                                                 handleClickStatus={handleClickStatus}
                                                                 handleClickDelete={handleClickDelete}
                                                                 handleClickEdit={handleClickEdit}
                                                                 edit={edit}
                                                                 setEdit={setEdit}
                                                                 title={title}
                                                                 setNewTitle={setNewTitle}                                            
                                                                  />}

                {toDosData && !allToDos && enterPressed && !deleted.includes(toDosData[toDoNumber].title) &&
                <div>
                    <p className="apart">Nr: {toDosData[toDoNumber].id} <span>Status: {!toDosData[toDoNumber].completed && <span>Not </span>}completed</span></p>
                    <div className="apart">
                        <button onClick={() => handleClickDelete(toDosData[toDoNumber])}>DELETE ITEM</button>
                        <button onClick={() => handleClickStatus(toDosData[toDoNumber])}>Toggle status</button>
                    </div>
                    <h2>User: {toDosData[toDoNumber].userId}</h2>
                </div> 
                }

            </div>  
        </div>
        
    );
}
 
export default ToDos;