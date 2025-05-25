import { PawPrint } from 'lucide-react';
import Link from 'next/link';

export default function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const textSize = size === 'large' ? 'text-3xl' : 'text-2xl';
  const iconSize = size === 'large' ? 'h-8 w-8' : 'h-7 w-7';

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <PawPrint className={`${iconSize} text-accent`} />
      <span className={`font-bold ${textSize} tracking-tight`}>
        Gadgets para mascotas
      </span>
    </Link>
  );
}
