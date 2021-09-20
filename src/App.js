import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import NavMenu from './components/NavMenu';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <NavMenu />
      <Cart />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/products/:handle' component={ProductPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
