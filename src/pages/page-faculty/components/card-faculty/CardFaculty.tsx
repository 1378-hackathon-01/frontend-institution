import { IInstitutionFacultyFull } from 'common/models';
import { Box, Button, Flex } from 'components';
import { ModalDeleteFaculty } from './component';
import { useState } from 'react';

interface IProps {
  faculty: IInstitutionFacultyFull;
}

function CardFaculty(props: IProps) {
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  return (
    <Box padding={20}>
      {modalDelete && (
        <ModalDeleteFaculty
          faculty={props.faculty}
          onClose={() => setModalDelete(false)}
        />
      )}

      <Flex
        direction='column'
        gap={20}
      >
        <div>
          <b>{props.faculty.abbreviation}</b> — {props.faculty.title}
        </div>

        <Flex justifyContent='flex-end'>
          <Button onClick={() => setModalDelete(true)}>Удалить</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardFaculty;
