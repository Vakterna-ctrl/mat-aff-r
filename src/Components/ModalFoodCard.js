import { Modal, Button  } from 'react-bootstrap';
import {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './ModalFoodCard.css'

function ModalFoodCard({show, handleClose, stuff}) {
    const [modal, showModal] = useState(false)
    
    useEffect(()=>{
        showModal(show)
        console.log(stuff)
    },[show])

    return (
      <>  
        <Modal show={modal} onHide={handleClose}>
          <div className="Links">
          <Link to="/">home</Link>
          <Link to="/"></Link>

          </div>    
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  
export default ModalFoodCard;