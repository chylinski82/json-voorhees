import useFetch from "./useFetch";
import { useState } from "react";
import DataMap from "./DataMap";

const ToDos = () => {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    const { data, isPending, error } = useFetch(url);

    const [toDoNumber, setToDoNumber] = useState(null);             // chosen data set
    const [allToDos, setAllToDos] = useState(true);                 // toggle to view all data sets
    const [status, setStatus] = useState('all');                    // sort by status  
    const [individualStatus, setIndividualStatus] = useState()     // to toggle status of individual data sets
    const [user, setUser] = useState('all');                        // sort by user
    const [enterPressed, setEnterPressed] = useState(false);        // variable to prevent auto submit after first submit, 
                                                                    // user required to press enter
    const [deleted, setDeleted] = useState([]);                     // deletes whole item, passed as prop to DataMap
                     
    const handleSubmit = (e) => {                                   // handles status choice
        e.preventDefault();
        setEnterPressed(true);
        setAllToDos(false);
        
    } 

    const handleClick = (e) => {                                    // back to all ToDos
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
                <button onClick={handleClick}>All ToDos</button>
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
                { data && !isPending && allToDos && <h1>All ToDos</h1> }                                            
                { data && !isPending && !allToDos && enterPressed && !deleted.includes(data[toDoNumber].title) && <h1 className="space">{data[toDoNumber].title}</h1> }
                { data && !isPending && !allToDos && enterPressed && deleted.includes(data[toDoNumber].title) && <h1 className="space"> Item deleted</h1> }

                {data && !isPending && allToDos && <DataMap status={status}
                                              setStatus={setStatus}
                                              data={data}
                                              user={user}
                                              deleted={deleted}
                                              setDeleted={setDeleted}
                                              individualStatus={individualStatus}
                                              setIndividualStatus={setIndividualStatus} />}

                {data && !allToDos && enterPressed && !deleted.includes(data[toDoNumber].title) &&
                <div>
                    <p className="apart">Nr: {data[toDoNumber].id} <span>Status: {!data[toDoNumber].completed && <span>Not </span>}completed</span></p>
                    <h2>User: {data[toDoNumber].userId}</h2>
                </div> 
                }

            </div>  
        </div>
        
    );
}
 
export default ToDos;