import AddForm from "./Components/AddForm"
import Header from "./Components/Header"
import SavedItems from "./Components/SavedItems"
import Search from "./Components/Search"

function App(){
  return (
  <div className="container mx-auto">
    <Header/>
    <Search/>
    <AddForm/>
    <SavedItems/>
  </div>
  )
}

export default App