import {ILaunch} from '../../services/services';

export type RootStackParamList = {
  SplashPage: undefined;
  HomePage: undefined;
  SpaceDetailsPage: {launch: ILaunch};
};
