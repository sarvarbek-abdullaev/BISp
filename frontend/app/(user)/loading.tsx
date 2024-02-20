import LoadingSkeleton from '@/components/shared/Loader';

export default function Loading() {
  return (
    <div className="flex items-center h-screen">
      <LoadingSkeleton />
    </div>
  );
}
