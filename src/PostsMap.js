const PostsMap = ({ data, 
                    user, 
                    deleted, 
                    handleClickDelete,
                    handleClickEdit, 
                    edit, 
                    setEdit,
                    title,
                    body,
                    setNewTitle,
                    setNewBody }) => {
    let dataToMap;                                                      //array sorted by user
    let key = 0;
 
    if (user == 'all') {                                          //array stays intact (status === 'all' and user === 'all')
        dataToMap = data;

    } else {
        dataToMap = data.filter(item => item.userId == user);

    }

    return ( 
        dataToMap.map(data => {
            key++;
            return (
                <div key={key}>
                    {data.title && !deleted.includes(data.title) && <div>
                        <div className="apart">
                            <button onClick={() => handleClickDelete(data)} className="delete">DELETE ITEM</button>
                            {edit !== data.title ? <h2>{title[data.id - 1]}</h2>
                                                 : <h2><textarea defaultValue={title[data.id - 1]}
                                                                 rows="3"
                                                                 onChange={e => {
                                                                    e.target.value && setNewTitle(e.target.value);
                                                                    !e.target.value && setNewTitle('-- untitled --');
                                                                    setNewBody(body[data.id - 1]);
                                                                }} /></h2>}                                         
                        </div>
                        <div>
                            <br/>
                            {edit !== data.body ? <p>{body[data.id - 1]}</p>
                                                 : <p><textarea defaultValue={body[data.id - 1]}
                                                                rows="4"
                                                                onChange={e => {
                                                                    e.target.value && setNewBody(e.target.value);
                                                                    !e.target.value && setNewBody('-- empty --');
                                                                    setNewTitle(title[data.id - 1]);
                                                                }} /></p>}
                            <br/>
                        </div>
                        <div className="apart">
                            <p>Nr: {data.id} </p>
                            <h3>User: {data.userId}</h3>
                            <button onClick={() => {
                                edit !== data.title ? setEdit(data.title)
                                                 : handleClickEdit(data)}}>Edit title</button>
                            <button onClick={() => {
                                edit !== data.body ? setEdit(data.body)
                                                 : handleClickEdit(data)}}>Edit post</button>
                        </div>
                        <br/><hr/><br/>
                    </div>}
                </div>
            );
        })
    );
}
 
export default PostsMap;