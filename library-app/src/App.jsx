import {Route, Routes} from 'react-router-dom';
import Library from './components/library/Library';
import AddContent from './components/addContent/AddContent';
import Catalog from './components/catalog/Catalog';
import Login from './components/userAcess/Login';

function App() {


  return (
    
     <Routes>
      <Route path='/' element={<Library />} />
      <Route path='/addContent' element={<AddContent />} />
      <Route path='/Catalog' element={<Catalog />} />
      <Route path='/Login' element={<Login />} />
     </Routes>
  )
}

export default App;
