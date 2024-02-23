import { getExams } from '@/actions/handleGet.action';
import { examColumns } from '@/tabs';
import { ExamTable } from '@/components/admin/exam-table';

const CoursesPage = async () => {
  const exams = await getExams();

  return <ExamTable columns={examColumns} rows={exams} type="exams" />;
};

export default CoursesPage;
