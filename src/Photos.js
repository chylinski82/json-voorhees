import useFetch from "./useFetch";
import { useState } from "react";

const Photos = () => {
    const [album, setAlbum] = useState(1);
    const [hovered, setHovered] = useState(false);

    let url = `https://jsonplaceholder.typicode.com/albums/${album}/photos`;
    let key = 0;

    const { data, isPending, error } = useFetch(url);

    return ( 
        <div className="content">
            <div className="options">
                <form id="album-selection">
                    <label>Select album:  </label>
                    <input  type="number"
                            min="1"
                            max="100"
                            value={album}
                            onChange={(e) => setAlbum(Math.min(e.target.value, 100))} />
                </form>
            </div>
            <div id="headings" className="apart">
                { error && <h1>{ error }</h1> }
                { isPending && <h1>Loading...</h1> }
                {data && !isPending && <h2>Album { album }</h2>}
                {data && !isPending && hovered && <h3>Nr {hovered}</h3>}
            </div>
            <div className="photos">
                {data && !isPending && data.map(data => {
                    key++;
                    return (
                        <div className="photo" key={key}>
                            <p>Nr: { data.id }</p>    
                            <a href={ data.url } 
                               onMouseEnter={() => setHovered(data.id + ': ' + data.title)}
                               onMouseLeave={() => setHovered(false)}><img className="thumbimage" 
                                                                     src={ data.thumbnailUrl } /></a>                          
                        </div>
                    )
                })}
            </div>        
        </div>
        
    );
}
 
export default Photos;