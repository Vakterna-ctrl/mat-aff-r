import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import { Route, BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './Components/Home';
import Items from './Components/Items';
import Category from './Components/Category';
import Checkout from './Components/Checkout';
import {useState, useEffect} from 'react'

const client = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/ckjiexkgadjcu01wa50k3a2vp/master',
  cache: new InMemoryCache()
});

function App() {
  let [cart, setCart] = useState([])
  
  let localCart = localStorage.getItem("cart");

  const addItem = (item) => {
  
    let cartCopy = [...cart];
    
    let {name} = item;
    
    let existingItem = cartCopy.find(cartItem => cartItem.name === name);
    
    if (existingItem) {
        let index = cartCopy.findIndex(item => {
          return item.name === existingItem.name
      })
      cartCopy[index].quantity += 1;
        
    } else {
      item.quantity = 1;
      cartCopy.push(item)
    }
    
    setCart(cartCopy)
    
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)
    
  }

  const removeItem = (item) => {

    let cartCopy = [...cart]
    
    let index = cartCopy.findIndex(food => food.name === item.name)
    cartCopy[index].quantity -= 1;
    if(cartCopy[index].quantity === 0){
      cartCopy = [
        ...cartCopy.slice(0,index),
        ...cartCopy.slice(index+1)
      ]
    }
    setCart(cartCopy);
    
    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)
  }

  useEffect(() => {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart) setCart(localCart)
  }, [])

  return (
    <ApolloProvider client={client}>
    <div className="App">
        <Router>
        <Header cart={cart}/>
        <Route exact path="/"  render={()=> <Home cart={cart} addItem={addItem} removeItem={removeItem} />} />
        <Route exact path="/cart/money/checkout"  render={()=> <Checkout cart={cart} addItem={addItem} removeItem={removeItem}/>} />
        <Route exact path="/:category" render={()=> <Category cart={cart} addItem={addItem} removeItem={removeItem}/>}/>
        <Route exact path="/:category/:item" render={()=> <Items cart={cart} addItem={addItem} removeItem={removeItem}/>}/>
        </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
