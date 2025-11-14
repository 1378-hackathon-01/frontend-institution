import { IInstitutionStudentApproveFull } from 'common/models';
import { Box, Button, Flex, Header, Message } from 'components';

interface IProps {
  students: IInstitutionStudentApproveFull[];
  onDeleteClick: (request: IInstitutionStudentApproveFull) => void;
}

function CardStudentsApproves(props: IProps) {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Одобренные заявки</Header>

        {props.students.length === 0 && (
          <Message
            type='warning'
            title='Заявок нет'
          >
            <p>Вы ещё не одобрили ни одной заявки!</p>
          </Message>
        )}

        {props.students.length > 0 && (
          <Flex
            direction='column'
            gap={5}
          >
            {props.students.map((x) => (
              <Box
                key={x.id}
                shadow='inside'
                padding={10}
                variant='darker'
              >
                <Flex
                  direction='column'
                  gap={10}
                >
                  <div>
                    {x.fullName != null && <span>{x.fullName}</span>}{' '}
                    {x.fullName == null && <i>Имя не установлено...</i>}
                  </div>

                  <Flex
                    justifyContent='flex-end'
                    gap={5}
                  >
                    <Button
                      onClick={() => props.onDeleteClick(x)}
                      fontSize={0.9}
                      padding={5}
                    >
                      Удалить
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardStudentsApproves;
