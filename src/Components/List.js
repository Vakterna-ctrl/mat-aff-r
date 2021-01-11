import { ListGroup, Button  } from 'react-bootstrap';
import './Home.css'
function List({item, addItem, removeItem}) {
  return (
  <>
   <ListGroup.Item className="center">{item.name} 
   <img width="100" height="100" src={item.image}/>
   <div className="controller">
   <Button variant="primary" onClick={()=> removeItem({name: item.name})}>-</Button>{' '}
   <p className="text" >{item.quantity}</p>
   <Button variant="primary" onClick={()=> addItem({name: item.name})}>+</Button>{' '}
   </div>
   <p className="price">{item.price} kr</p>
   </ListGroup.Item>
  </>
  );
}

export default List;
