import { useQuery, gql } from '@apollo/client';
import { Container, Row, } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import { useState } from 'react';
import FoodCard from './FoodCard';

const PRODUCTS = gql`
query MyQuery($slug: String!) {
    products(where: {slug: $slug}) {
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
`

function Items({addItem, removeItem, cart}) {
    const [stuff, getItem] = useState(null);

    let {category, item} = useParams()

    const { loading, error, data} = useQuery(
        PRODUCTS, {
            variables: {slug: item}
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(   
    <div>
        <Container>
        <Row>
        {data.products.map( item => (
        <FoodCard image={item.images[0].url} cart={cart} getItem={getItem} addItem={addItem} removeItem={removeItem} stuff={stuff} price={item.price} item={item} title={item.name} key={item.id} />
        ))}
        </Row>
        </Container>
    </div>
    )
            
}

export default Items;