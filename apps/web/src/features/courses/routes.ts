import { Route, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from '../../routes/root';

import { CourseDetails } from './pages/details';
import { CoursesExplorer } from './pages/explorer';

const coursesRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'courses',
});

export const coursesIndexRoute = new Route({
  getParentRoute: () => coursesRootRoute,
  path: '/',
  component: CoursesExplorer,
});

export const coursesDetailsRoute = new Route({
  getParentRoute: () => coursesRootRoute,
  path: '/$courseId',
  component: CourseDetails,
});

export const coursesChapterRoute = new Route({
  getParentRoute: () => coursesRootRoute,
  path: '/$courseId/$partIndex/$chapterIndex',
  component: lazyRouteComponent(
    () => import('./pages/chapter'),
    'CourseChapter',
  ),
});

export const coursesRoutes = coursesRootRoute.addChildren([
  coursesIndexRoute,
  coursesDetailsRoute,
  coursesChapterRoute,
]);
