import { ApiFaculties } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import { IInstitutionFacultyBrief } from 'common/models';
import { Box, Button, Flex, Header, Loader, Message } from 'components';
import { useEffect, useState } from 'react';
import { CardFaculty, ModalAddFaculty } from './components';

function CardFaculties() {
  const [faculties, setFaculties] = useState<IInstitutionFacultyBrief[] | null>(null);
  const [modalAddFaculty, setModalAddFaculty] = useState<boolean>(false);

  useEffect(() => {
    loadFaculties();
  }, []);

  const loadFaculties = async () =>
    await handleErrorAuth(
      async () =>
        await handleError(async () => {
          const faculties = await ApiFaculties.getInstance().getAll();

          setFaculties(faculties);
        })
    );

  const handleModalClose = () => {
    setFaculties(null);
    setModalAddFaculty(false);

    loadFaculties();
  };

  return (
    <Box padding={20}>
      {modalAddFaculty && <ModalAddFaculty onClose={handleModalClose} />}

      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список факультетов</Header>

        {faculties == null && (
          <Flex
            justifyContent='center'
            alignItems='center'
          >
            <Loader
              size='default'
              variant='line'
              color='01'
            />
          </Flex>
        )}

        {faculties != null && (
          <Flex
            direction='column'
            gap={10}
          >
            <Flex justifyContent='flex-end'>
              <Button onClick={() => setModalAddFaculty(true)}>Добавить факультет</Button>
            </Flex>

            {faculties.length === 0 && (
              <Message
                type='warning'
                title='Нет факультетов'
              >
                <p>Вы ещё не добавили ни одного факультета!</p>
              </Message>
            )}

            {faculties.length > 0 && (
              <Flex direction='column'>
                {faculties.map((x) => (
                  <CardFaculty
                    key={x.id}
                    faculty={x}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardFaculties;
