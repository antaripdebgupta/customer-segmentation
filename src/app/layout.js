import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import '../styles/globals.css';

export const metadata = {
  title: 'ClusterCart',
  description:
    'ClusterCart is an AI-powered customer segmentation platform for e-commerce. Upload data, analyze purchase behavior, and explore interactive dashboards with actionable insights.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="custom-scrollbar dark:bg-dark-900 dark:text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
