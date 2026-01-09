import Header from "../Components/Header";
import AddForm from "../Components/AddForm";
import SavedItems from "../Components/SavedItems";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const Home = () => {
  const[todos,setTodos]=useState([])
  return (
    <div className="container mx-auto bg-gray-300 min-h-screen">
      <ToastContainer />
       <Header todos={todos} />
      <SavedItems setTodos={setTodos} />
      <AddForm />
   
    </div>
  );
};

export default Home;
