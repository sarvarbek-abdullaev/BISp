import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error('Unauthorized');

  const { id } = session.user;

  if (!id) throw new Error('Unauthorized');

  return { id };
};

export const ourFileRouter = {
  profileImage: f({
    image: {
      maxFileSize: '16MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((e) => {
      console.log(e);
    }),
  moduleFile: f(['pdf', 'image'])
    .middleware(() => handleAuth())
    .onUploadComplete((e) => {
      console.log(e);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
