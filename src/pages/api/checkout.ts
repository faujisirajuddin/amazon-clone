import { StoreProduct } from "@/type";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [items, email] = req.body;
  const modifiedItem = items.map((item: StoreProduct) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));
  const session = await stripe.checkout.session.create({
    payment_method_types:["card"],
    shipping_address_collection:{
        allowed_countries:["BD",]
    }
  })
}
