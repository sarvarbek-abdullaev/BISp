export interface Course {
  id?: string;
  code: string;
  name: string;
  description: string;
  modules?: Module[];
}

export interface Module {
  id?: string;
  code: string;
  name: string;
  description: string;
  courseId?: string;
  course?: Course;
  teacherId?: string;
}

export interface Tab {
  path: string;
  name: string;
  key?: string;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}
