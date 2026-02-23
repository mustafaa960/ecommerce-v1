"use server";

import { createClient } from "@/utils/supabase/server";
import { CartItem } from "@/lib/cart-context";

export async function placeOrder(
  customerData: { name: string; email: string; address: string },
  items: CartItem[],
  total: number,
  stripePaymentIntentId?: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return {
      success: false,
      error: "You must be logged in with a valid email to place an order.",
    };
  }

  try {
    // 1. Insert the main order record
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customerData.name,
        customer_email: user.email, // Force the authenticated user's email
        shipping_address: customerData.address,
        total_amount: total,
        stripe_payment_intent_id: stripePaymentIntentId,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert the order items
    const orderItemsToInsert = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_time: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsToInsert);

    if (itemsError) throw itemsError;

    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return { success: false, error: error.message };
  }
}
