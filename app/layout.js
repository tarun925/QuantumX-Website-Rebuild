import './style.css';
import TransitionLoader from './transition-loader';
export const metadata = { title: 'QuantumX — Growth, managed as one connected system', description: 'Strategy, creative, performance, technology, data and AI. Explore QuantumX work and capabilities.' };
export default function RootLayout({ children }) { return <html lang="en"><body><TransitionLoader/>{children}</body></html> }
