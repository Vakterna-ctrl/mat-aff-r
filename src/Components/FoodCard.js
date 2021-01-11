import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Modal, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function FoodCard({title, image ,item, getItem, stuff, price, addItem, removeItem, cart }) {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
    };

    const increment = () => {
        setCount(count + 1)
        addItem({
            name: item.name,
            price: item.price,
            image: image,
        })
    }
    const decrement = () => {
        setCount(count - 1)
        removeItem({
            name: item.name,
            price: item.price,
        })
    }

    const getValue = (e) => {
        setCount(e.target.value)
    }

    const showModal = () => {
        handleShow();
        getItem(item)
        console.log(item)
    }
    
    const defaultValue = () =>{
        if(cart){
            let currentIndex = cart.findIndex(food => food.name === item.name)
            if(currentIndex === -1){
                setCount(0)
            }else{
                setCount(cart[currentIndex].quantity)
            }
        }else{
            setCount(0)
        }
    }

    useEffect(()=>{
        defaultValue()
    },[cart])

    return( 
        <>  
        <Col md={3}>
        <Card className='mt-2'>
            <div className="imageCard">
            <Card.Img variant="top" src={image} onClick={showModal}/>
            <p className="priceCard">{item.price}kr</p>
            </div>
            <Card.Body>
              <Card.Title onClick={showModal}>{title}</Card.Title>
              <Container>
              <Row className="justify-content-md-between">
              <button type="button" disabled={count === 0 ? true : false} onClick={decrement} className="btn btn-secondary">-</button>
              <Col xs={6}>
              <Form.Control type="number" placeholder="0st" onChange={getValue} value={count}/>
              </Col>
              <button type="button" className="btn btn-secondary" onClick={increment}>+</button>
              </Row>
              </Container>
            </Card.Body>
        </Card>
        </Col>
        <Modal show={show} size="lg" onHide={handleClose}>
          <div className="representation">
          <div className="Links">
          <Link class="Link" to="/" onClick={handleClose}>home/</Link>
          <Link class="Link" to={`/${item.category.slug}`} onClick={handleClose}> {item.category.slug}/</Link>
          <Link class="Link" to={`/${item.category.slug}/${item.slug}`} onClick={handleClose}> {item.slug}</Link>
          </div>
          <h2>{title}</h2> 
          </div>     
          <div class="twoCards">
              <div className="imageCard">
                <img src={image}/>
                <p className="priceModalCard">{item.price}kr</p>
              </div>
              <div>
              <Container>
              <Row>
              <button type="button" disabled={count === 0 ? true : false} onClick={decrement} className="btn btn-secondary">-</button>
              <Col xs={6} className="0">
              <Form.Control type="number" placeholder="0st" onChange={getValue} value={count}/>
              </Col>
              <button type="button" className="btn btn-secondary" onClick={increment}>+</button>
              </Row>
              </Container>
              <h3 class="beskrivning">Beskrivning:</h3>
              <p>{item.description.text}</p>
              </div>
          </div>
        </Modal>
        </>
    )   
}

export default FoodCard;