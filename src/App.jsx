import Dashboard from "./components/CNAPP-Dashboard/Dashboard";
import Nav from "./components/Navbar/Nav" ;
import Opdb from "./components/Operational-Dashb/Opdb";

const App = () => {
  return (
    <div>
      <Nav/>
      <Dashboard/>
      <Opdb/>
    </div>
  );
}

export default App;
