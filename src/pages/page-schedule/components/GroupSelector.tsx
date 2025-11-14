import { Select } from 'components';
import { IScheduleGroup } from 'common/models/i-schedule-group';

interface IProps {
  groups: IScheduleGroup[];
  selectedGroupId: string | null;
  onGroupChange: (groupId: string) => void;
  selectedFacultyId: string | null;
}

function GroupSelector(props: IProps) {
  const { groups, selectedGroupId, onGroupChange, selectedFacultyId } = props;

  const filteredGroups = selectedFacultyId
    ? groups.filter((group) => group.facultyId === selectedFacultyId)
    : groups;

  return (
    <div className='group-selector-s7w9'>
      <Select
        label='Выбрать группу:'
        value={selectedGroupId || ''}
        onChange={(value) => onGroupChange(value)}
      >
        <option value='' disabled={!selectedFacultyId}>
          {selectedFacultyId ? '-- Выберите группу --' : '-- Сначала выберите факультет --'}
        </option>
        {filteredGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default GroupSelector;