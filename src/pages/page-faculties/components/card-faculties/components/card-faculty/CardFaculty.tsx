import { RoutingUrls } from 'common/const';
import { IInstitutionFacultyFull } from 'common/models';
import { Box, Button, Flex, Header } from 'components';

interface IProps {
  faculty: IInstitutionFacultyFull;
}

function CardFaculty(props: IProps) {
  return (
    <Box
      padding={10}
      shadow='inside'
      variant='darker'
    >
      <Flex
        direction='column'
        gap={10}
      >
        <div>
          <b>{props.faculty.abbreviation}</b> — {props.faculty.title}
        </div>

        <Button
          padding={5}
          fontSize={0.9}
          href={RoutingUrls.Faculty.replace(':facultyId', props.faculty.id)}
        >
          Перейти
        </Button>
      </Flex>
    </Box>
  );
}

export default CardFaculty;
