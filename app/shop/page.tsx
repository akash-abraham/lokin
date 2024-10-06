"use client"; // Ensure this is at the top of your file

import { useState, useEffect } from "react";
import { Coins, Tag, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy Pomodoro-related data
const coupons = [
  { id: 1, name: "Spotify premium", description: "Listen to your favourite song without hassle", price: 50 },
  { id: 2, name: "Linkedin premium", description: "Take your professional journey to next level", price: 25 },
  { id: 3, name: "Zomato premium", description: "Enjoy a tasty treat", price: 75 },
  { id: 4, name: "Audible", description: "Listen to your favourite audio books", price: 100 },
  { id: 5, name: "1 month gym membership", description: "Physical health for good mental health", price: 150 },
];

type ToastType = {
  message: string;
  type: 'success' | 'error';
};

export default function Component() {
  const [userCoins, setUserCoins] = useState(500);
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handlePurchase = (couponId: number, price: number) => {
    if (userCoins >= price) {
      setUserCoins(userCoins - price);
      showToast("Coupon Purchased! The coupon has been added to your account.", 'success');
    } else {
      showToast("Insufficient Coins. You don't have enough coins to purchase this coupon.", 'error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <button onClick={() => setToast(null)} className="float-right ml-2">
            <X className="h-4 w-4" />
          </button>
          {toast.message}
        </div>
      )}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Pomodoro Store</h1>
        <div className="flex items-center justify-center text-lg">
          <Coins className="mr-2 h-5 w-5" />
          <span>Your Balance: {userCoins} coins</span>
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                {coupon.name}
              </CardTitle>
              <CardDescription>{coupon.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold text-primary">{coupon.price} coins</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handlePurchase(coupon.id, coupon.price)}
                disabled={userCoins < coupon.price}
              >
                {userCoins >= coupon.price ? "Purchase Coupon" : "Not Enough Coins"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center">
          <AlertCircle className="mr-2 h-4 w-4" />
          Coupons are for demonstration purposes only and do not represent real offers.
        </p>
      </footer>
    </div>
  );
}
