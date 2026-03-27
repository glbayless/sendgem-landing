import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // For now, we'll log to console
    // Later: save to Supabase, send to email service, etc.
    console.log(`📧 New waitlist signup: ${email}`);
    
    // TODO: Save to Supabase
    // TODO: Send confirmation email
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}