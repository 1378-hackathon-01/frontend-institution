import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalContent, Input, Button, Flex } from 'components';
import { IScheduleLesson } from 'common/models/i-schedule-lesson';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: Partial<IScheduleLesson>) => void;
  initialData?: IScheduleLesson | null;
  dayOfWeek?: number;
  slotNumber?: number;
}

function LessonModal(props: IProps) {
  const { isOpen, onClose, onSave, initialData, dayOfWeek, slotNumber } = props;

  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [room, setRoom] = useState('');
  const [notes, setNotes] = useState('');

  // Обновляем поля при открытии модального окна с данными
  useEffect(() => {
    if (isOpen) {
      setSubjectName(initialData?.subjectName || '');
      setTeacherName(initialData?.teacherName || '');
      setRoom(initialData?.room || '');
      setNotes(initialData?.notes || '');
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    if (!subjectName.trim()) {
      alert('Введите название дисциплины');
      return;
    }

    onSave({
      ...initialData,
      subjectName: subjectName.trim(),
      teacherName: teacherName.trim() || undefined,
      room: room.trim() || undefined,
      notes: notes.trim() || undefined,
      dayOfWeek: dayOfWeek || initialData?.dayOfWeek,
      slotNumber: slotNumber || initialData?.slotNumber,
    });

    handleClose();
  };

  const handleClose = () => {
    setSubjectName('');
    setTeacherName('');
    setRoom('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={handleClose}>
      <ModalHeader
        header={initialData ? 'Редактировать занятие' : 'Создать занятие'}
        onClose={handleClose}
      />
      <ModalContent>
        <Flex direction='column' gap={10}>
          <Input
            type='text'
            label='Дисциплина *'
            value={subjectName}
            onChange={(text) => setSubjectName(text)}
            placeholder='Введите название дисциплины'
          />

          <Input
            type='text'
            label='Преподаватель'
            value={teacherName}
            onChange={(text) => setTeacherName(text)}
            placeholder='Введите ФИО преподавателя'
          />

          <Input
            type='text'
            label='Аудитория'
            value={room}
            onChange={(text) => setRoom(text)}
            placeholder='Введите номер аудитории'
          />

          <Input
            type='text'
            label='Заметки'
            value={notes}
            onChange={(text) => setNotes(text)}
            placeholder='Дополнительная информация'
          />

          <Flex gap={10} justifyContent='flex-end'>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default LessonModal;