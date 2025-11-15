import { IInstitutionGroupBrief } from 'common/models';
import { Box, Button, Flex, Header } from 'components';

interface IProps {
  facultyId: string;
  group: IInstitutionGroupBrief;
  onDeleteClick: () => void;
}

function CardGroup(props: IProps) {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Группа</Header>

        <div>
          <b>{props.group.abbreviation}</b> — {props.group.title}
        </div>

        <Flex>
          <Button onClick={props.onDeleteClick}>Удалить группу</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardGroup;
