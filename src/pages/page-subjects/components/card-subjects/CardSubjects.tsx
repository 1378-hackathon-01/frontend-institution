import { IInstitutionSubjectBrief } from 'common/models';
import { Box, Button, Flex, Header, Message } from 'components';

interface IProps {
  subjects: IInstitutionSubjectBrief[];
  onDeleteClick: (subject: IInstitutionSubjectBrief) => void;
  onAddClick: () => void;
}

function CardSubjects(props: IProps) {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список учебных дисциплин</Header>

        <Flex justifyContent='flex-end'>
          <Button onClick={props.onAddClick}>Добавить</Button>
        </Flex>

        <Flex
          direction='column'
          gap={5}
        >
          {props.subjects.length === 0 && (
            <Message
              type='warning'
              title='Учебные дисциплины не найдены'
            >
              <p>Вы ещё не добавили ни одной учебной дисцплины!</p>
              <p>
                После добавления учебной дисциплины вы сможете привязать её к необходимым группам. <br />
                Благодаря этому вы сможете записывать информацию по конкретным дисциплинам для конкретной группы так,
                чтобы её могли просматривать только студенты, которых вы одобрили.
              </p>
            </Message>
          )}

          {props.subjects.map((x) => (
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

                <Flex justifyContent='flex-end'>
                  <Button
                    padding={5}
                    fontSize={0.9}
                    onClick={() => props.onDeleteClick(x)}
                  >
                    Удалить
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardSubjects;
