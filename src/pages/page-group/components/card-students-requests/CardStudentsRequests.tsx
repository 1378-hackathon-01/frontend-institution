import { IInstitutionStudentRequestFull } from 'common/models';
import { Box, Button, Flex, Header, Message } from 'components';

interface IProps {
  students: IInstitutionStudentRequestFull[];
  onApproveClick: (request: IInstitutionStudentRequestFull) => void;
  onDeclineClick: (request: IInstitutionStudentRequestFull) => void;
}

function CardStudentsRequests(props: IProps) {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Ожидающие заявки</Header>

        {props.students.length === 0 && (
          <Message
            type='success'
            title='Заявок нет'
          >
            <p>Нет заявок на присоединение к группе!</p>
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
                      onClick={() => props.onDeclineClick(x)}
                      fontSize={0.9}
                      padding={5}
                    >
                      Отклонить
                    </Button>
                    <Button
                      onClick={() => props.onApproveClick(x)}
                      fontSize={0.9}
                      padding={5}
                    >
                      Одобрить
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

export default CardStudentsRequests;
