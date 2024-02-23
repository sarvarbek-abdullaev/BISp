import { getStudentAttendances } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const id = session.user.id;

  const attendances = await getStudentAttendances(id);

  return (
    <div>
      <h1>Attendance</h1>
      {!attendances.length ? (
        <p>No attendances</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance: any) => {
              return (
                <tr key={attendance.id}>
                  <td>{attendance.time}</td>
                  <td>{attendance.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;
