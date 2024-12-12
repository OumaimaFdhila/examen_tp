
import Navbar from "@/components/navbar";
import Providers from "@/providers/nextUI";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import SessionProv from "@/providers/sessionProvider";
import Footer from "@/components/footer";
import OnlineUsersProvider from "@/providers/onlineUserProvider";
import SupaBaseProvider from "@/providers/SupaBaseProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
            <Navbar/>
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
