import "./styles.css"
import StepsHeader from "./StepsHeader"
import ProducsList from "./ProductsList"
import { useEffect, useState } from "react";
import { OrderLocationData, Product } from "./types";
import { fetchProducts } from "../api";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import HomeFooter from "../Footer";
import { CheckIsSelected } from "./helpers";

function Orders() {

    const [products, SetProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    }, 0)
    
    useEffect(() => {
        fetchProducts()
        .then(response => SetProducts(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = CheckIsSelected(selectedProducts, product)
      
        if (isAlreadySelected) {
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } else {
          setSelectedProducts(previous => [...previous, product]);
        }
    }

    return (
        <>
            <div className="orders-container">
                <StepsHeader/>
                <ProducsList 
                    products={products} 
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary 
                    amount={selectedProducts.length} 
                    totalPrice={totalPrice}
                />
            </div>
            <HomeFooter/>
        </>
    )
}

export default Orders;