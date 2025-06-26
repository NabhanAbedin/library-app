import {Route, Routes} from 'react-router-dom';
import Library from './components/library/Library';
import AddContent from './components/addContent/AddContent';
import Catalog from './catalog/Catalog';

function App() {


  return (
    
     <Routes>
      <Route path='/' element={<Library />} />
      <Route path='/addContent' element={<AddContent />} />
      <Route path='/Catalog' element={<Catalog />} />
     </Routes>
  )
}

export default App;
