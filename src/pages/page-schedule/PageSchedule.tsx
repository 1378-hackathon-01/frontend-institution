import { useState } from 'react';
import { Page, Flex, Box, Header, Input, Button, Message } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { WeekType } from 'common/const/schedule';
import { IScheduleLesson } from 'common/models/i-schedule-lesson';
import { IScheduleGroup } from 'common/models/i-schedule-group';
import { FacultySelector, GroupSelector, WeekToggle, ScheduleGrid, LessonModal } from './components';
import './style.scss';

function PageSchedule() {
  // Mock данные для факультетов
  const mockFaculties = [
    { id: '1', name: 'Факультет информатики' },
    { id: '2', name: 'Экономический факультет' },
    { id: '3', name: 'Юридический факультет' },
  ];

  // Mock данные для групп
  const mockGroups: IScheduleGroup[] = [
    { id: '1', name: 'ИВТ-101', facultyId: '1', facultyName: 'Факультет информатики' },
    { id: '2', name: 'ИВТ-102', facultyId: '1', facultyName: 'Факультет информатики' },
    { id: '3', name: 'ЭК-201', facultyId: '2', facultyName: 'Экономический факультет' },
    { id: '4', name: 'ЭК-202', facultyId: '2', facultyName: 'Экономический факультет' },
    { id: '5', name: 'ЮР-301', facultyId: '3', facultyName: 'Юридический факультет' },
  ];

  // Mock данные для занятий
  const mockLessons: IScheduleLesson[] = [
    {
      id: '1',
      dayOfWeek: 1,
      slotNumber: 1,
      weekType: 'even',
      subjectName: 'Математический анализ',
      teacherName: 'Иванов И.И.',
      room: '201',
    },
    {
      id: '2',
      dayOfWeek: 1,
      slotNumber: 2,
      weekType: 'even',
      subjectName: 'Программирование',
      teacherName: 'Петров П.П.',
      room: '305',
    },
    {
      id: '3',
      dayOfWeek: 2,
      slotNumber: 1,
      weekType: 'even',
      subjectName: 'Физика',
      teacherName: 'Сидоров С.С.',
      room: '102',
    },
  ];

  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [weekType, setWeekType] = useState<WeekType>(WeekType.Even);
  const [lessons, setLessons] = useState<IScheduleLesson[]>(mockLessons);
  const [academicYearStart, setAcademicYearStart] = useState('2024-09-01');
  const [academicYearEnd, setAcademicYearEnd] = useState('2025-06-30');

  const handleFacultyChange = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    setSelectedGroupId(null); // Сбросить выбранную группу при смене факультета
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    lesson?: IScheduleLesson;
    dayOfWeek?: number;
    slotNumber?: number;
  } | null>(null);

  const handleSlotClick = (dayOfWeek: number, slotNumber: number) => {
    if (!selectedGroupId) {
      alert('Выберите группу');
      return;
    }

    setModalData({ dayOfWeek, slotNumber });
    setIsModalOpen(true);
  };

  const handleLessonClick = (lesson: IScheduleLesson) => {
    setModalData({ lesson });
    setIsModalOpen(true);
  };

  const handleSaveLesson = (lessonData: Partial<IScheduleLesson>) => {
    if (modalData?.lesson) {
      // Редактирование существующего занятия
      setLessons((prev) =>
        prev.map((lesson) => (lesson.id === modalData.lesson!.id ? { ...lesson, ...lessonData } : lesson))
      );
    } else {
      // Создание нового занятия
      const newLesson: IScheduleLesson = {
        id: Date.now().toString(),
        dayOfWeek: lessonData.dayOfWeek!,
        slotNumber: lessonData.slotNumber!,
        weekType: weekType,
        subjectName: lessonData.subjectName!,
        teacherName: lessonData.teacherName,
        room: lessonData.room,
      };
      setLessons((prev) => [...prev, newLesson]);
    }
  };

  const handleMoveLesson = (lessonId: string, newDayOfWeek: number, newSlotNumber: number) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, dayOfWeek: newDayOfWeek, slotNumber: newSlotNumber } : lesson
      )
    );
  };

  const handleSave = () => {
    // В реальном приложении здесь будет отправка данных на сервер
    console.log('Saving schedule...', {
      groupId: selectedGroupId,
      academicYearStart,
      academicYearEnd,
      lessons,
    });
    alert('Расписание сохранено');
  };

  return (
    <Page title='Редактор расписаний'>
      <PageUser>
        <Flex
          direction='column'
          gap={20}
        >
          <Box
            padding={20}
            className='schedule-header-x5j8'
          >
            <Flex
              direction='column'
              gap={20}
            >
              <Header
                element='h1'
                size='bigger'
              >
                Редактор расписаний
              </Header>

              <Message
                type='warning'
                title='Функционал ограничен'
              >
                <p>Ограниченное время разработки веб-платформы не позволило довести до конца расписание занятие.</p>
                <p>
                  В данной версии платформы, вы можете оценить визуал и удобство работы с расписанием, но не изменить
                  его фактические данные.
                </p>
              </Message>

              <Flex
                gap={20}
                alignItems='flex-end'
              >
                <Input
                  type='date'
                  label='Начало учебного года:'
                  value={academicYearStart}
                  onChange={(text) => setAcademicYearStart(text)}
                />
                <Input
                  type='date'
                  label='Конец учебного года:'
                  value={academicYearEnd}
                  onChange={(text) => setAcademicYearEnd(text)}
                />
              </Flex>

              <FacultySelector
                faculties={mockFaculties}
                selectedFacultyId={selectedFacultyId}
                onFacultyChange={handleFacultyChange}
              />

              <GroupSelector
                groups={mockGroups}
                selectedGroupId={selectedGroupId}
                onGroupChange={setSelectedGroupId}
                selectedFacultyId={selectedFacultyId}
              />
            </Flex>
          </Box>

          {selectedGroupId && (
            <Box padding={20}>
              <Flex
                direction='column'
                gap={20}
              >
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <WeekToggle
                    weekType={weekType}
                    onWeekTypeChange={setWeekType}
                  />
                  <Button onClick={handleSave}>Сохранить</Button>
                </Flex>
                <ScheduleGrid
                  lessons={lessons}
                  weekType={weekType}
                  onSlotClick={handleSlotClick}
                  onLessonClick={handleLessonClick}
                  onMoveLesson={handleMoveLesson}
                />
              </Flex>
            </Box>
          )}

          <LessonModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setModalData(null);
            }}
            onSave={handleSaveLesson}
            initialData={modalData?.lesson}
            dayOfWeek={modalData?.dayOfWeek}
            slotNumber={modalData?.slotNumber}
          />

          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageSchedule;
