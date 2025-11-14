import { useState } from 'react';
import { SCHEDULE_SLOTS, WEEKDAYS, WeekType } from 'common/const/schedule';
import { IScheduleLesson } from 'common/models/i-schedule-lesson';
import { Box, Flex } from 'components';

interface IProps {
  lessons: IScheduleLesson[];
  weekType: WeekType;
  onSlotClick: (dayOfWeek: number, slotNumber: number) => void;
  onLessonClick: (lesson: IScheduleLesson) => void;
  onMoveLesson: (lessonId: string, newDayOfWeek: number, newSlotNumber: number) => void;
}

function ScheduleGrid(props: IProps) {
  const { lessons, weekType, onSlotClick, onLessonClick, onMoveLesson } = props;
  const [draggedLesson, setDraggedLesson] = useState<IScheduleLesson | null>(null);

  const getLessonForSlot = (dayOfWeek: number, slotNumber: number): IScheduleLesson | undefined => {
    return lessons.find(
      (lesson) =>
        lesson.dayOfWeek === dayOfWeek &&
        lesson.slotNumber === slotNumber &&
        lesson.weekType === weekType
    );
  };

  const handleDragStart = (lesson: IScheduleLesson) => {
    setDraggedLesson(lesson);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dayOfWeek: number, slotNumber: number) => {
    if (draggedLesson) {
      // Проверяем, что ячейка пустая (нет занятия в этом слоте)
      const existingLesson = getLessonForSlot(dayOfWeek, slotNumber);
      if (!existingLesson) {
        onMoveLesson(draggedLesson.id, dayOfWeek, slotNumber);
      }
      setDraggedLesson(null);
    }
  };

  return (
    <div className='schedule-grid-p9k2'>
      <table>
        <thead>
          <tr>
            <th className='time-column'>Время</th>
            {WEEKDAYS.map((day) => (
              <th key={day.id}>{day.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SCHEDULE_SLOTS.map((slot) => (
            <tr key={slot.number}>
              <td className='time-column'>
                <div className='time-info'>
                  <div className='slot-number'>{slot.number} пара</div>
                  <div className='slot-time'>
                    {slot.start} - {slot.end}
                  </div>
                </div>
              </td>
              {WEEKDAYS.map((day) => {
                const lesson = getLessonForSlot(day.id, slot.number);
                return (
                  <td
                    key={day.id}
                    className={`schedule-cell ${lesson ? 'has-lesson' : 'empty'}`}
                    onClick={() => !lesson && onSlotClick(day.id, slot.number)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(day.id, slot.number)}
                  >
                    {lesson ? (
                      <div
                        className='lesson-card'
                        draggable
                        onDragStart={() => handleDragStart(lesson)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onLessonClick(lesson);
                        }}
                      >
                        <div className='lesson-subject'>{lesson.subjectName}</div>
                        {lesson.teacherName && (
                          <div className='lesson-teacher'>{lesson.teacherName}</div>
                        )}
                        {lesson.room && <div className='lesson-room'>Ауд. {lesson.room}</div>}
                      </div>
                    ) : (
                      <div className='empty-slot'>+</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleGrid;