// AI Email Generation API
export async function POST(request) {
  const { companyInfo, prospects, tone } = await request.json();
  
  // Using OpenRouter (we have a key already)
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
  
  const prompt = `You are an expert cold email copywriter. Generate a personalized email sequence for a company with the following info:

COMPANY INFO:
- Name: ${companyInfo.name}
- Industry: ${companyInfo.industry}
- Description: ${companyInfo.description}
- Tone: ${tone}

PROSPECT INFO:
${prospects.map(p => `- ${p.name || 'Prospect'} at ${p.company || 'their company'}: ${p.email}`).join('\n')}

Generate a sequence of 5-7 emails including:
1. Initial outreach email
2. Follow-up #1
3. Follow-up #2
4. Break-up / last attempt

Make each email:
- Highly personalized to the prospect
- Sound human-written, not AI-generated
- Include specific details about the prospect's company if available
- Have a clear call-to-action
- Keep emails short and conversational

Format the output as a JSON array with this structure:
[
  {
    "step": 1,
    "subject": "email subject line",
    "body": "full email body"
  }
]

Now generate the emails:`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: 'You are an expert cold email copywriter. Generate highly personalized, human-sounding emails that get replies.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      const content = data.choices[0].message.content;
      
      // Try to parse as JSON, otherwise return as text
      try {
        const emails = JSON.parse(content);
        return Response.json({ success: true, emails });
      } catch {
        return Response.json({ success: true, emails: [{ step: 1, subject: 'Generated', body: content }] });
      }
    } else {
      throw new Error('No response from AI');
    }
  } catch (error) {
    console.error('AI Generation error:', error);
    return Response.json({ 
      error: 'Failed to generate emails',
      details: error.message 
    }, { status: 500 });
  }
}