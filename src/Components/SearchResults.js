import {Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './Header.css';

const PRODUCTS = gql`
    query myQuery($slug: String!) { 
      categories(where: {name_contains: $slug}) {
        name
        slug
      }
      products(where: {name_contains: $slug}) {
          id
          slug
          name
          category{
              name 
              slug
        }
    }
    }
  `

function SearchResults({searchValue, updateSearchValue}) {
  
    const { loading, error, data} = useQuery(
        PRODUCTS, {
            variables: {slug: searchValue}
        }
      );
      
    const removeSearch = () =>{
        updateSearchValue('')
    }

    return(
        <>
        {loading === false ?
        data.categories.map((category, id) =>(
            <Link to={`/${category.slug}`} key={id} onClick={removeSearch}>{category.name}</Link>
        )) : null
        }
        {loading === false ?
        data.products.map(product =>(
            <Link key={product.id} to={`/${product.category.slug}/${product.slug}`} onClick={removeSearch}>{product.name}</Link>
        )) : null
        }
        </>
    )
}

export default SearchResults;
