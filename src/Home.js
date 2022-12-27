import SearchBar from "./SearchBar";

const Home = (props) => {

    const { album, setAlbum } = props;

    return (
        
        <div className="main">
            <h1>JSON Voorhees</h1>
            <p>This is <span className="highlight">JSON Voorhees </span>, is my first fully 
                independent react project, created to interact with <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder</a>, 
                an API that allows to practice handling HTTP requests. JSON Voorhees groups data from
                jsonplaceholder into todos, posts and photos. User can browse, edit and delete items, as well as
                search for data.
            </p>
            <br/>
            <SearchBar album={album} setAlbum={setAlbum}/>

        </div>
    );
        
    
}
 
export default Home;