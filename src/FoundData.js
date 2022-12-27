import React from 'react'

const FoundData = (props) => {
    const { postsToRender, toDosToRender } = props;

    let key = 0;

    return (
        <>
            {postsToRender.length > 0 && <h2>Posts</h2>}
            {postsToRender.map(obj => {
                key++;
                return(
                    <div key={key}>
                        <br/>
                        <h3>{ obj.title }</h3>
                        {obj.body && 
                            <>
                                <br/><p>{ obj.body }</p>
                            </>}
                        <br/>
                        User ID: { obj.userId }
                        <br/><br/>
                        item ID: { obj.id }                  
                        <br/><br/><hr/>     
                    </div>
                )
            })}
            <br/><br/>
            {toDosToRender.length > 0 && <h2>ToDos</h2>}
            {toDosToRender.map(obj => {
                key++;
                return(
                    <div key={key}>
                        <br/>
                        <h3>{ obj.title }</h3>
                        {obj.body && 
                            <>
                                <br/><p>{ obj.body }</p>
                            </>}
                        <br/>
                        User ID: { obj.userId }
                        <br/><br/>
                        item ID: { obj.id }                  
                        <br/><br/><hr/>     
                    </div>
                )
            })}
        </>
        
    )
}

export default FoundData