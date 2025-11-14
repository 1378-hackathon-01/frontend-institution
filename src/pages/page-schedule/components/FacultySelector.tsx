import { Select } from 'components';

interface IFaculty {
  id: string;
  name: string;
}

interface IProps {
  faculties: IFaculty[];
  selectedFacultyId: string | null;
  onFacultyChange: (facultyId: string) => void;
}

function FacultySelector(props: IProps) {
  const { faculties, selectedFacultyId, onFacultyChange } = props;

  return (
    <div className='faculty-selector-m2n7'>
      <Select
        label='Выбрать факультет:'
        value={selectedFacultyId || ''}
        onChange={(value) => onFacultyChange(value)}
      >
        <option value=''>-- Выберите факультет --</option>
        {faculties.map((faculty) => (
          <option key={faculty.id} value={faculty.id}>
            {faculty.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default FacultySelector;