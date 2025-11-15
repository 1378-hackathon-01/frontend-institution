import * as bi from 'react-bootstrap-icons';
import { IInstitutionSubjectBrief } from 'common/models';
import { Box, Button, Flex, Header, Message, Select } from 'components';
import { useState } from 'react';
import { Link } from 'react-router';
import { RoutingUrls } from 'common/const';

interface IProps {
  subjects: IInstitutionSubjectBrief[];
  groupSubjects: IInstitutionSubjectBrief[];
  onAddClick: (subject: IInstitutionSubjectBrief) => void;
  onEditClick: (subject: IInstitutionSubjectBrief) => void;
  onRemoveClick: (subject: IInstitutionSubjectBrief) => void;
}

function CardSubjects(props: IProps) {
  const [selectSubjectId, setSelectSubjectId] = useState<string>(props.subjects.length > 0 ? props.subjects[0].id : '');

  const isAddButtonEnabled =
    selectSubjectId.length > 0 && props.groupSubjects.find((x) => x.id == selectSubjectId) == null;

  const handleAddClick = () => {
    const subject = props.subjects.find((x) => x.id == selectSubjectId);

    if (subject != null) {
      props.onAddClick(subject);
    }
  };

  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список учебных дисциплин</Header>

        {props.subjects.length > 0 && (
          <Flex
            direction='column'
            gap={20}
          >
            <Flex
              gap={5}
              alignItems='flex-end'
            >
              <Select
                icon={<bi.Leaf />}
                label='Выберите дисциплину для добавления группе'
                value={selectSubjectId}
                onChange={setSelectSubjectId}
              >
                {props.subjects.map((x) => (
                  <option
                    key={x.id}
                    value={x.id}
                  >
                    {x.abbreviation} — {x.title}
                  </option>
                ))}
              </Select>
              <Button
                disabled={!isAddButtonEnabled}
                onClick={handleAddClick}
              >
                Добавить
              </Button>
            </Flex>

            <Flex
              direction='column'
              gap={5}
            >
              {props.groupSubjects.length === 0 && (
                <Message
                  type='warning'
                  title='Нет дисциплин'
                >
                  <p>Вы ещё не назначиили этой группе ни одну дисциплину, за которой смогут следить студенты</p>
                </Message>
              )}

              {props.groupSubjects.map((x) => (
                <Box
                  key={x.id}
                  padding={10}
                  variant='darker'
                  shadow='inside'
                >
                  <Flex
                    direction='column'
                    gap={5}
                  >
                    <div>
                      <b>{x.abbreviation}</b> — {x.title}
                    </div>

                    <Flex
                      gap={10}
                      justifyContent='flex-end'
                    >
                      <Button
                        onClick={() => props.onEditClick(x)}
                        fontSize={0.9}
                        padding={5}
                      >
                        Изменить содержимое
                      </Button>
                      <Button
                        onClick={() => props.onRemoveClick(x)}
                        fontSize={0.9}
                        padding={5}
                      >
                        Открепить от группы
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Flex>
        )}

        {props.subjects.length === 0 && (
          <Message
            type='error'
            title='Нет учебных дисциплин'
          >
            <p>У вас нет возможности привязать учебную дисциплину к группе, потому что список дисциплин пуст!</p>
            <p>
              Для создания десциплины перейдите на{' '}
              <Link to={RoutingUrls.Subjects}>страницу управления дисциплинами</Link> образовательного учреждения.
            </p>
          </Message>
        )}
      </Flex>
    </Box>
  );
}

export default CardSubjects;
