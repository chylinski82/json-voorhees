const DataMap = ({ data, 
                   status, 
                   deleted, 
                   handleClickDelete, 
                   user, 
                   handleClickStatus, 
                   edit, 
                   setEdit,
                   title,
                   setNewTitle,
                   handleClickEdit }) => {
                          
    let filterUser;                                                     //array sorted by status        
    let dataToMap;                                                      //array sorted by status and user
    let key = 0;
 
    

    if(status === 'completed') {                                        //narrows down data to status completed
        filterUser = data.filter(data => data.completed);      

    } else if(status === 'not completed') {
        filterUser = data.filter(data => !data.completed);

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
                    {data.title && !deleted.includes(data.title) && <div>
                        <div className="apart">
                            <button onClick={() => handleClickDelete(data)} className="delete">DELETE ITEM</button>
                            {edit !== data.id ? <h2>{title[data.id - 1]}</h2>
                                              : <h2><textarea defaultValue={title[data.id - 1]}
                                                              onChange={e => {
                                                                e.target.value && setNewTitle(e.target.value);
                                                                !e.target.value && setNewTitle('-- untitled --');
                                                              }} /></h2>}                                         
                        </div>
                        <p className="apart">
                            Nr: {data.id} <span>Status: {!data.completed && <span>Not </span>}completed</span>
                        </p>
                        <div className="apart">
                            <h3>User: {data.userId}</h3>
                            <button onClick={() => {
                                edit !== data.id ? setEdit(data.id)
                                                 : handleClickEdit(data)}}>Edit content</button>
                            <button onClick={() => handleClickStatus(data)}>Toggle status</button>
                        </div>
                        <br/><hr/><br/>
                    </div>}
                </div>
            );
        })
    );
   
}
 
export default DataMap;