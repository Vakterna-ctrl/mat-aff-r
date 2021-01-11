import { useQuery, gql } from '@apollo/client';
import { Container, Row, } from 'react-bootstrap';
import FoodCard from './FoodCard';
import { useState } from 'react';
import {useParams} from 'react-router-dom';


const PRODUCTS = gql`
query myQuery($slug: String!) { 
    category(where: {slug: $slug}){ 
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
function Category({addItem, removeItem, cart}) {
    const [stuff, getItem] = useState(null);

    let {category, item} = useParams()

    const { loading, error, data} = useQuery(
        PRODUCTS, {
            variables: {slug: category}
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return(   
    <div>
        <Container>
        <Row>
        {data.category.products.map( item => (
        <FoodCard image={item.images[0].url} cart={cart} getItem={getItem} addItem={addItem} removeItem={removeItem} stuff={stuff} item={item} price={item.price} title={item.name} key={item.id} />
        ))}
        </Row>
        </Container>
    </div>
    )
            
}

export default Category;