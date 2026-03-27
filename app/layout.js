import './globals.css';

export const metadata = {
  title: 'SendGem - AI-Powered Cold Email Platform',
  description: 'Upload your prospect list. SendGem AI writes hyper-personalized cold email sequences that sound human-written.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}