import Header from "./components/Header";
import Footer from "./components/Footer";
import TableComponent from "./components/TableComponent";
import BankDetails from "./components/BankDetails";
import { Switch, Route, Redirect } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/home' component={() => <TableComponent />} />
        <Route path='/bank/:id' component={() => <BankDetails />} />
        <Redirect to='/home' />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
