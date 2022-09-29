import useFetch from "./useFetch";

const Home = () => {

    const { data, isPending, error } = useFetch('https://jsonplaceholder.typicode.com/todos/200');

    return (
        
        <div className="main">
            <h1>JSON Voorhees</h1>
            <p>This is <span className="highlight">JSON Voorhees </span>, my first react app, created to
             interact with <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a>. 
             Json placeholder is a free fake API website, that allows to practice sending HTTP requests.
              After making a call to Json placeholder, you receive dummy data, for example <a href="/">ToDos</a> or 
              <a href="/"> Comments</a>. <span className="highlight">JSON Voorhees </span>
            permits user to browse through that data, <a href="/">Search</a> for particular term, 
            <a href="Compare"> Compare </a> different sets of data,...</p>  
            <br/>
            { error && <h1>{ error }</h1>}
            { isPending && <h1>Loading...</h1> }
            {data && <h1>{data.title}</h1>}   

        </div>
    );
        
    
}
 
export default Home;