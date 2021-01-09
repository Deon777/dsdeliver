import "./styles.css"
import StepsHeader from "./StepsHeader"
import ProducsList from "./ProductsList"
import { useEffect, useState } from "react";
import { OrderLocationData, Product } from "./types";
import { fetchProducts } from "../api";
import OrderLocation from "./OrderLocation";

function Orders() {

    const [products, SetProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    
    useEffect(() => {
        fetchProducts()
        .then(response => SetProducts(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="orders-container">
            <StepsHeader/>
            <ProducsList products={products} />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
        </div>
    )
}

export default Orders;