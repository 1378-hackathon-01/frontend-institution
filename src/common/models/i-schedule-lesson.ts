export interface IScheduleLesson {
  id: string;
  dayOfWeek: number; // 1-6
  slotNumber: number; // 1-6
  weekType: 'even' | 'odd';
  subjectName: string;
  teacherName?: string;
  room?: string;
  notes?: string;
}