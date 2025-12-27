import Header from "../Components/Header";
import AddForm from "../Components/AddForm";
import SavedItems from "../Components/SavedItems";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="container mx-auto bg-gray-300 min-h-screen">
      <ToastContainer />
      <Header />
      <AddForm />
      <SavedItems />
    </div>
  );
};

export default Home;
