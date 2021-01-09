import "./styles.css"
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { OrderLocationData, Product } from "./types";
import { fetchProducts, saveOrder } from "../api";
import { CheckIsSelected } from "./helpers";
import StepsHeader from "./StepsHeader"
import ProducsList from "./ProductsList"
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import HomeFooter from "../Footer";


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
        .catch(error => toast.warning('Erro ao listar produtos'));
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

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
            ...orderLocation!,
            products: productsIds
        }
      
        saveOrder(payload).then((response) => {
            toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
            setSelectedProducts([]);
        })
        .catch(() => {
            toast.warning('Erro ao enviar pedido');
        })
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
                    onSubmit={handleSubmit}
                />
                
            </div>
            <HomeFooter/>
        </>
    )
}

export default Orders;