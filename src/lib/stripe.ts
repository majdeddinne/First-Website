import { products, ProductId } from '../stripe-config';
import { supabase } from './supabase';

export async function createCheckoutSession(productId: ProductId) {
  const product = products[productId];
  
  if (!product) {
    throw new Error(`Invalid product ID: ${productId}`);
  }

  const { data: { session_url }, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      price_id: product.priceId,
      mode: product.mode,
      success_url: `${window.location.origin}/checkout/success`,
      cancel_url: `${window.location.origin}/checkout/cancel`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return session_url;
}

export async function getActiveSubscription() {
  const { data: subscription, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return subscription;
}

export async function getOrderHistory() {
  const { data: orders, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return orders;
}