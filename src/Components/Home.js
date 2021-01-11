import { useQuery, gql } from '@apollo/client';
import { Container, Row, } from 'react-bootstrap';
import FoodCard from './FoodCard';
import { useState } from 'react';

const PRODUCTS = gql`
query myQuery($slug: String!) { 
    collection(where: {slug: $slug}){ 
        products{
            id
            name
            description{text}
            price
            category{
                name
                slug
            }
            images{url}
            kg
            slug
          }
} 
}
`
const erbjudanden = "/"
function Home({addItem, removeItem, cart}) {
    const [stuff, getItem] = useState(null);

    const { loading, error, data} = useQuery(
        PRODUCTS, {
            variables: {slug: erbjudanden}
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return(   
    <div>
        <Container>
        <Row>
        {data.collection.products.map( item => (
        <FoodCard image={item.images[0].url} cart={cart} addItem={addItem} removeItem={removeItem} getItem={getItem} price={item.price} stuff={stuff} item={item} title={item.name} key={item.id} />
        ))}
        </Row>
        </Container>
    </div>
    )
            
}

export default Home;