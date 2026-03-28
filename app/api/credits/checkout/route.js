export async function POST(request) {
  const { creditsPack } = await request.json();
  
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  
  // Map pack IDs to Price IDs
  const priceMap = {
    'credits_100': process.env.STRIPE_CREDITS_100_PRICE_ID,
    'credits_500': process.env.STRIPE_CREDITS_500_PRICE_ID,
  };

  const priceId = priceMap[creditsPack];

  if (!priceId) {
    return Response.json({ error: 'Invalid credits pack selected' }, { status: 400 });
  }

  if (!STRIPE_SECRET_KEY) {
    return Response.json({ 
      error: 'Stripe not configured. Please contact support.' 
    }, { status: 500 });
  }

  const stripe = require('stripe')(STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // One-time payment, not subscription
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits?canceled=true`,
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe credits error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}