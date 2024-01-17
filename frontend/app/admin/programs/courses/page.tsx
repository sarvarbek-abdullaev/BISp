import { getCourses } from '@/utils/backend-route';
import { Table } from '@/components/Table';
import { courseColumns } from '@/tabs';

const CoursesPage = async () => {
  const courses = await getCourses();

  return <Table columns={courseColumns} rows={courses} type="courses" />;
};

export default CoursesPage;
