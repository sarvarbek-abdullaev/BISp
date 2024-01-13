import { Table } from '@/components/Table';
import { columns } from '@/tabs';

async function getStudents() {
  const res = await fetch('http://localhost:3000/student', {
    next: {
      revalidate: 30,
    },
  });
  return await res.json();
}

const StudentsPage = async () => {
  const students = await getStudents();
  return <Table rows={students} columns={columns} type="student" />;
};

export default StudentsPage;
