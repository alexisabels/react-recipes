import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <Homepage />
      </div>
    </>
  );
}

export default App;
