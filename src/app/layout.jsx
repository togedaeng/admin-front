import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Modern admin dashboard built with Next.js and Tailwind CSS',
}

export default function RootLayout(props) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {props.children}
      </body>
    </html>
  )
} 