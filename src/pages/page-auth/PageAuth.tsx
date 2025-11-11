import { useState } from 'react';
import { ApiError, ApiErrorCode } from '@1378-hackathon-01/frontend-api-client';
import { Box, Flex, Header, Logo, Page } from 'components';
import { handleError } from 'common/handlers';
import { AuthService } from 'common/services';
import { RoutingUrls } from 'common/const';
import { ApiAuth } from 'common/api';
import { StageDefault, StageInvalid, StageLoading } from './components';
import './style.scss';

type Stage = 'default' | 'loading' | 'invalid';

function PageAuth() {
  const [stage, setStage] = useState<Stage>('default');

  const handleLoginClick = async (login: string, password: string) =>
    handleError(async () => {
      setStage('loading');

      try {
        const response = await ApiAuth.getInstance().login(login, password);
        AuthService.getInstance().set(response.token);
        window.location.assign(RoutingUrls.Main);
      } catch (e) {
        if (e instanceof ApiError && e.code === ApiErrorCode.Unauthorized) {
          setStage('invalid');
        } else {
          throw e;
        }
      }
    });

  return (
    <Page title='Авторизация'>
      <Flex
        justifyContent='center'
        className='auth-page-wmqq'
      >
        <Flex
          direction='column'
          gap={40}
        >
          <div className='fliller-nnad' />

          <Flex
            direction='column'
            alignItems='center'
            gap={5}
          >
            <Logo size={{ height: 2 }} />
            <Header
              element='h1'
              size='bigger'
            >
              Учебное заведение
            </Header>
          </Flex>

          <Box
            padding={20}
            className='auth-box-ydix'
          >
            <Flex
              direction='column'
              gap={20}
            >
              <Header
                element='h2'
                align='center'
              >
                Авторизация
              </Header>

              {stage === 'default' && <StageDefault onEnterClick={handleLoginClick} />}
              {stage === 'loading' && <StageLoading />}
              {stage === 'invalid' && <StageInvalid onBackClick={() => setStage('default')} />}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Page>
  );
}

export default PageAuth;
