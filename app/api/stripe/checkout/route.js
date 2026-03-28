export async function POST(request) {
  const { priceId, successUrl, cancelUrl } = await request.json();
  
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  // Map tier names to Price IDs from environment
  const priceMap = {
    'price_starter': process.env.STRIPE_STARTER_PRICE_ID,
    'price_growth': process.env.STRIPE_GROWTH_PRICE_ID,
    'price_pro': process.env.STRIPE_PRO_PRICE_ID,
    'price_agency': process.env.STRIPE_AGENCY_PRICE_ID,
  };

  const actualPriceId = priceMap[priceId];

  if (!STRIPE_SECRET_KEY || !actualPriceId) {
    console.error('Missing Stripe config:', { STRIPE_SECRET_KEY: !!STRIPE_SECRET_KEY, actualPriceId });
    return Response.json({ 
      error: 'Stripe not configured properly. Please contact support.' 
    }, { status: 500 });
  }

  const stripe = require('stripe')(STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: actualPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}