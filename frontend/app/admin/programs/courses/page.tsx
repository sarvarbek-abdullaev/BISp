import { getCourses } from '@/actions/handleGet.action';
import { Table } from '@/components/admin/Table';
import { courseColumns } from '@/tabs';

const CoursesPage = async () => {
  const courses = await getCourses();

  return <Table columns={courseColumns} rows={courses} type="courses" />;
};

export default CoursesPage;
