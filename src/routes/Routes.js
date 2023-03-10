import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from '../pages/login';
import Products from '../pages/Products'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound';
import {ProtectedRoute} from '../components/ProtectedRoute'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/e-commerce/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route element={<ProtectedRoute/> }> */}
        <Route path='/products' element={<Products />} />
        {/* </Route> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
