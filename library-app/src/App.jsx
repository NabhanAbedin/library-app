import {Route, Routes} from 'react-router-dom';
import Library from './components/library/Library';
import AddContent from './components/addContent/AddContent';
import Catalog from './components/catalog/Catalog';
import Login from './components/userAcess/Login';
import CreateAccount from './components/userAcess/CreateAccount';
import MyCollection from './components/mycollection/MyCollection';

function App() {


  return (
    
     <Routes>
      <Route path='/' element={<Library />} />
      <Route path='/addContent' element={<AddContent />} />
      <Route path='/Catalog' element={<Catalog />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/CreateAccount' element={<CreateAccount />} />
      <Route path='/MyCollection' element={<MyCollection />} />
     </Routes>
  )
}

export default App;
