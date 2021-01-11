import { ListGroup, Form } from 'react-bootstrap';
import List from './List'
import './Home.css'
import {useState, useEffect} from 'react'
import { gql, useMutation } from '@apollo/client';
import StripeCheckout from 'react-stripe-checkout';

const ADD_TODO = gql`
mutation MyMutation($name: String!, $email: String!, $adress: String!, $city: String!, $country: String!, $cart: [OrderItemCreateInput!], $money: Int!) {
  createOrder(data: {name: $name, email: $email, total: $money,
    address: {create: {name: $name, address1: $adress, city: $city, country: $country}},
    orderItems: {create: $cart}}){
    name
  }
}
`;


function Checkout({cart, addItem, removeItem}) {
  const [money, updateMoney] = useState(0)
  const [info, updateInfo] = useState({
    name: '',
    email: '',
    phone: null,
    adress: '',
    city: '',
    country: '',
    zip: null,
  })

  const [order, { data }] = useMutation(ADD_TODO);


  useEffect(()=>{
    let totalmoney = 0;
    cart.forEach(item =>{
      totalmoney += item.price * item.quantity;
    })
    updateMoney(totalmoney)
  },[cart])

  const changeHandler = (e) => {
    updateInfo({...info, [e.target.name]: e.target.value})
  }  

  const sendToServer = () =>{
    let newCart = cart.map(item => {
      delete item.image
      return item
    })
    console.log(money)
    order({ variables: 
      { name: info.name, email: info.email, adress: info.adress, city: info.city, country: info.country,
        cart: cart, money: money } });
        console.log(newCart)
  }

  return (
  <>
  <ListGroup>
      {cart.map(item => (
        <List item={item} addItem={addItem} removeItem={removeItem}/>
      ))}
  </ListGroup>
    <Form className="col-4">
    <Form.Group controlId="formBasicPassword">
        <Form.Label>Namn</Form.Label>
        <Form.Control type="text" name="name" onChange={changeHandler} placeholder="Name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" name="name" onChange={changeHandler} placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Telefonnummer</Form.Label>
        <Form.Control type="text" name="phone" onChange={changeHandler} placeholder="Telefonnummer" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Adress</Form.Label>
        <Form.Control type="text" name="adress" onChange={changeHandler} placeholder="Adress" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Stad</Form.Label>
        <Form.Control type="text" name="city" onChange={changeHandler} placeholder="Stad" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Land</Form.Label>
        <Form.Control type="text" name="country" onChange={changeHandler} placeholder="Land" />
      </Form.Group>
      
      <Form.Group controlId="formBasicPassword">
        <Form.Label>PostNummer</Form.Label>
        <Form.Control type="text" name="zip" onChange={changeHandler} placeholder="PostNummer" />
      </Form.Group>
  
  </Form>
  <StripeCheckout
    stripeKey="pk_test_51I8MB8BUNFQ8EAdjE3aTqfgwKKi279qqwX8GzcPInpSCvISfevCzOpXCVKpCFVkaPfqwVFofFcP7K0Sw6ccOhH1E00Y8fqgu9M"
    amount={money*100}
    name="food"
    currency="SEK"
    opened={sendToServer}
  >
  </StripeCheckout>
    </>
  );
}

export default Checkout;
