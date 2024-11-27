import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'


export const metadata = {
    title: 'Phansite',
    description: 'A NextJs Threads Application'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey="pk_test_bGVuaWVudC1mYWxjb24tMjkuY2xlcmsuYWNjb3VudHMuZGV2JA">
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    <div className="w-full flex justify-center items-center min-h-screen">

                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}