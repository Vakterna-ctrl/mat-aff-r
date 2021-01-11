import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form,FormControl, Button  } from 'react-bootstrap';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import SearchResults from './SearchResults';

function Header({cart}) {
  const [searchValue, updateSearchValue] = useState('')
  const [money, updateMoney] = useState(0)

  const search = (e) => {
    updateSearchValue(e.target.value)
  }
  useEffect(()=>{
    let totalmoney = 0;
    cart.forEach(item =>{
      totalmoney += item.price * item.quantity;
    })
    updateMoney(totalmoney)
  },[cart])

    return(
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">MatAffär</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <div className="search">
            <FormControl type="search" placeholder="Search" list="cars" className="mr-sm-2" onChange={search}/>
            {searchValue.length !== 0 ?
            <div className="Linksa">
            <SearchResults searchValue={searchValue} updateSearchValue={updateSearchValue}/>
            </div>
            : null}
            </div>
            <Link to="/cart/money/checkout"><Button variant="danger">{money} kr</Button></Link>
          </Form>
        </Navbar>
    )
}

export default Header;