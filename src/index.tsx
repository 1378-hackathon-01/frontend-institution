import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RecoilRoot } from 'recoil';
import { RoutingUrls } from 'common/const';
import { PageAuth, PageError, PageFaculties, PageFaculty, PageMain } from 'pages';
import './index.scss';

const router = createBrowserRouter([
  {
    path: RoutingUrls.Auth,
    element: <PageAuth />,
  },
  {
    path: RoutingUrls.Main,
    element: <PageMain />,
  },
  {
    path: RoutingUrls.Error,
    element: <PageError />,
  },
  {
    path: RoutingUrls.Faculties,
    element: <PageFaculties />,
  },
  {
    path: RoutingUrls.Faculty,
    element: <PageFaculty />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
