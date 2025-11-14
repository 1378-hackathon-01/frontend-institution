import { Button, Flex } from 'components';
import { WeekType } from 'common/const/schedule';

interface IProps {
  weekType: WeekType;
  onWeekTypeChange: (weekType: WeekType) => void;
}

function WeekToggle(props: IProps) {
  const { weekType, onWeekTypeChange } = props;

  return (
    <Flex gap={10} alignItems='center' className='week-toggle-k3m5'>
      <span>Неделя:</span>
      <Flex gap={5}>
        <Button
          onClick={() => onWeekTypeChange(WeekType.Even)}
          className={weekType === WeekType.Even ? 'active' : ''}
        >
          Четная
        </Button>
        <Button
          onClick={() => onWeekTypeChange(WeekType.Odd)}
          className={weekType === WeekType.Odd ? 'active' : ''}
        >
          Нечетная
        </Button>
      </Flex>
    </Flex>
  );
}

export default WeekToggle;