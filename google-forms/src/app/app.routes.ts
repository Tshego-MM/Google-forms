import { Route } from '@angular/router';
import HomePage from '@/pages/home/home.component';
import BuilderPage from '@/pages/builder/builder.component';
import SurveyPage from '@/pages/survey/survey.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'builder',
    component: BuilderPage,
  },
  {
    path: 'survey',
    component: SurveyPage,
  },
];
