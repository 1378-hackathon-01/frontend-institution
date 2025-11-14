import { RoutingUrls } from 'common/const';
import { IInstitutionGroupBrief } from 'common/models';
import { Box, Button, Flex, Header, Message } from 'components';

interface IProps {
  facultyId: string;
  groups: IInstitutionGroupBrief[];
  onCreateClick: () => void;
}

function CardGroups(props: IProps) {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список групп</Header>

        <Flex justifyContent='flex-end'>
          <Button onClick={props.onCreateClick}>Создать группу</Button>
        </Flex>

        {props.groups.length === 0 && (
          <Message
            type='warning'
            title='Нет групп'
          >
            <p>Нет ни одной группы</p>
          </Message>
        )}

        {props.groups.length > 0 && (
          <Flex
            direction='column'
            gap={5}
          >
            {props.groups.map((x) => (
              <Box
                key={x.id}
                padding={10}
                shadow='inside'
                variant='darker'
              >
                <Flex
                  direction='column'
                  gap={5}
                >
                  <div>
                    <b>{x.abbreviation}</b> — {x.title}
                  </div>

                  <Button
                    href={RoutingUrls.Group.replaceAll(':facultyId', props.facultyId).replaceAll(':groupId', x.id)}
                    fontSize={0.9}
                    padding={5}
                  >
                    Перейти
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardGroups;
