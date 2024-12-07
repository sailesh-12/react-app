import './App.css';
import Home from './Home';
import About from './About';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import Nav from './Nav';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';


const App = () => {
  

  return (
    <div className="App">
      <DataProvider>

        <Header />
        <Nav />
        <Routes> 
          {/* Home route */}
          <Route path="/" element={<Home  />} />

          {/* About route */}
          <Route path="/about" element={<About />} />

          {/* Posts-related routes */}
          <Route path="/post">
            <Route
              index
              element={
                <NewPost
                 
                />
              }
            />
            <Route
              path="edit/:id"
              element={
                <EditPost
                />
              }
            />
            <Route
              path=":id"
              element={
                <PostPage
                  
                />
              }
            />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </DataProvider>

    </div>
  );
};

export default App;
