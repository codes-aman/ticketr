"use server";

import { auth } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { stripe } from "@/lib/stripe";

if(!process.env.NEXT_PUBLIC_CONVEX_URL) {

    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer() {

    const{userId} = await auth();

    if(!userId) {
        throw new Error("User is not authenticated");
    }

    // check if user already has a connect account
    const existingStripeConnectAccount = await convex.query(
        api.users.getUsersStripeConnectId,
        {
           userId, 
        }
    );

    if(existingStripeConnectAccount) {
        return{account: existingStripeConnectAccount};
}



  // Create new connect account
  const account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

    // Update user with stripe connect account
    await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
        userId,
        stripeConnectId: account.id,
    });
}
