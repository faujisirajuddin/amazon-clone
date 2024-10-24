import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "../home/FormattedPrice";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "@/type";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const CartPayment = () => {
  const { productData } = useSelector(
    (state: StateProps) => state.productReducer
  );
  const userInfo = useSelector(
    (state: StateProps) => state.userReducer.userInfo
  );
  console.log(userInfo);
  const [totaAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amount = 0;
    productData.map((item: StoreProduct) => {
      amount += item.price * item.quantity;
      return;
    });
    setTotalAmount(amount);
  }, [productData]);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const handleChekout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ items: productData, email: userInfo.email }),
    });
    const checkoutSession = await response.json();

    // Redirecting user/customer to stripe checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span
          className="bg-green-600 rounded-full p-1 h-6 w-6 
                text-sm text-white flex items-center justify-center mt-1"
        >
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details...
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold ">
        Total :{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totaAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleChekout}
            className="w-full h-10 text-sm font-semibold bg-amazon_blue 
                text-white hover:bg-amazon_yellow hover:text-black rounded-lg cursor-pointer"
          >
            Proceed to Buy
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="w-full h-10 text-sm font-semibold bg-amazon_blue 
                bg-opacity-50 text-white rounded-lg cursor-not-allowed"
          >
            Proceed to Buy
          </button>
          <p
            className="text-xs mt-1 text-red-500 font-semibold
                 animate-bounce"
          >
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
