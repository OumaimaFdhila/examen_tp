
import Navbar from "@/components/navbar";
import Providers from "@/providers/nextUI";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import SessionProv from "@/providers/sessionProvider";
import Footer from "@/components/footer";
import OnlineUsersProvider from "@/providers/onlineUserProvider";
import SupaBaseProvider from "@/providers/SupaBaseProvider";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "FaceAuth",
  icons:"/logo.png"
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <SessionProv>
            <SupaBaseProvider>
            <OnlineUsersProvider>
            <Navbar session={session}/>
            {children}
            <Footer />
            </OnlineUsersProvider>
            </SupaBaseProvider>
          </SessionProv>
        </Providers>
      </body>
    </html>
  );
}
