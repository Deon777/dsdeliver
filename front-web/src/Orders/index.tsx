import "./styles.css"
import StepsHeader from "./StepsHeader"
import ProducsList from "./ProductsList"
import { useEffect, useState } from "react";
import { Product } from "./types";
import { fetchProducts } from "../api";

function Orders() {

    const [products, SetProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        fetchProducts()
        .then(response => SetProducts(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="orders-container">
            <StepsHeader/>
            <ProducsList products={products} />
        </div>
    )
}

export default Orders;