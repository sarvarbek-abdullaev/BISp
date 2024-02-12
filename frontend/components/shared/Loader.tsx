import { Loader2 } from 'lucide-react';

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader2 size={64} speed={0.6} className="animate-spin text-gray-500" />
    </div>
  );
}
