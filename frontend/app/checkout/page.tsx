"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/redux/slices/ordersApiSlice";
import { Product } from "@/types/products";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    state: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [createOrder, { isLoading, isSuccess, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as Product[];
    setCartItems(storedItems);
    setTotal(storedItems.reduce((acc, item) => acc + item.price, 0));
  }, []);

  const handleConfirmOrder = async () => {
    // e.preventDefault();
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: 1, // Adjust quantity as needed
        price: item.price,
      }));
      console.log({
        items: orderItems,
        total,
        shippingAddress,
        paymentInfo,
      });
      const result = await createOrder({
        items: orderItems,
        total,
        shippingAddress,
        paymentInfo,
      });
      console.log("Order created:", result);
      router.push("/orders");
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div
                  className="flex justify-between text-sm mb-2"
                  key={item._id}
                >
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Address"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="City"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="State"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Postal Code"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Street"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Country"
                className="mb-2"
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Cardholder's Name"
                className="mb-2"
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardholderName: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Card Number"
                className="mb-2"
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Expiration Date"
                className="mb-2"
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    expirationDate: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="CVV"
                className="mb-2"
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cvv: e.target.value,
                  }))
                }
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleConfirmOrder}>
                Confirm Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="flex items-center justify-center h-16 border-t p-4">
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Contact Us
        </Link>
      </footer>
    </div>
  );
}
