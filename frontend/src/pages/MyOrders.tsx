import OrderTabs from "@/components/orders/OrderTabs";
import OrderCard from "@/components/orders/OrderCard"; 
import { useEffect, useState } from "react";
import {Order} from "../types/orders"
import axiosInstance from "@/api/axiosConfig";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyOrders(){
    const [orders,setOrders]=useState<Order[]>([]);
    const [isLoading, setIsLoading]=useState<boolean>(true);
    const [isActive, setIsActive]=useState(true);

    const handleChange=(value:boolean)=>{
        setIsActive(value);
    }

    useEffect(()=>{
        const fetchOrders=async ()=>{
        setIsLoading(true);
        try{
            const response=await axiosInstance.get(`api/Orders/isActive=${isActive}`);
            setOrders(response.data);
        }
        catch(error){
            if(axios.isAxiosError(error)){
                const backendMessage=error?.response?.data?.message;
                toast.error(backendMessage);
            }
            else{
                toast.error("Sorry, Orders' Loading Failed, Try Again!")
            }
        }
        finally{
            setIsLoading(false);
        }
    };
    fetchOrders();
    },[isActive]);
    return(
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4" style={{marginTop:"100px"}}>
            <h2 style={{color:"#E65F10",fontWeight:"bold",fontSize:"18px" }}>Orders</h2>
            <h4 style={{color:"#070707", fontWeight:"bold", fontSize:"30px",}}>My Orders</h4>
            <OrderTabs isActive={isActive} onTabChange={handleChange}/>
            <div className="flex flex-col gap-4">
        {isLoading ? (
                <p className="text-center text-gray-500 mt-40 font-bold">Loading orders...</p>
                ) : orders.length === 0 ? (
                <p className="text-center text-gray-500 mt-40 font-bold">You Have Not Made Any Orders Yet</p>
                ) : (
                orders.map((item) => (
                    <OrderCard 
                    key={item.orderId}
                    orderId={item.orderId}
                    pizzaCount={item.pizzaCount}
                    createdAt={item.createdAt}
                    totalPrice={item.totalPrice}
                    status={item.status}
                    />
                ))
                )}
            </div>
        </div>
    )

}