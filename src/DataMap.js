import { useEffect } from "react";

const DataMap = ({ data, status, deleted, setDeleted, user, individualStatus, setIndividualStatus }) => {

    const handleClick = (data) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
            method: 'DELETE',
        }).then(() => {
            setDeleted(deleted.concat(data.title));
        })
        
    }

    const completed = data.filter(data => data.completed);        //narrows down data to status completed
    const notCompleted = data.filter(data => !data.completed);    //narrows down data to status completed
    let filterUser;                                                     //array sorted by status        
    let dataToMap;                                                      //array sorted by status and user
    let key = 0;
 
    if(status === 'completed') {
        filterUser = completed;

    } else if(status === 'not completed') {
        filterUser = notCompleted;

    } else {
        filterUser = data;                                        //array stays intact (status === 'all')
        
    }

    if (user == 'all') {                                          //array stays intact (status === 'all' and user === 'all')
        dataToMap = filterUser;

    } else {
        dataToMap = filterUser.filter(data => data.userId == user);

    }

    return (
        dataToMap.map(data => {
            key++;
            return (
                <div key={key}>
                    {!deleted.includes(data.title) && <div>
                        <div className="apart">
                            <button onClick={() => handleClick(data)} id="delete-todo">DELETE ITEM</button><h2>{data.title}</h2>
                        </div>
                        <p className="apart">
                            Nr: {data.id} <span>Status: {!data.completed && <span>Not </span>}completed</span>
                        </p>
                        <div className="apart">
                            <h3>User: {data.userId}</h3>
                            <button onClick={() => {
                                fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
                                    method: 'PUT',
                                    body: JSON.stringify({ completed: !data.completed }),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                      },
                                }).then(res => res.json())
                                  .then(json => {
                                    console.log(json);
                                    data.completed = json.completed;
                                  });
                            }}>Toggle status</button>
                        </div>
                        <br/><hr/><br/>
                    </div>}
                </div>
            );
        })
    );
   
}
 
export default DataMap;