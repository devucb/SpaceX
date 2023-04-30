import {ILaunch} from '../../services/services';

export interface PAllLaunches {
  launches: ILaunch[];
  totalDocs: number | null;
  setPage: (page: number) => void;
  reset: (query: PDateQuery | null) => void;
}

export interface PModal {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  queryObject: PDateQuery | null;
  setQueryObject: (query: PDateQuery | null) => void;
  reset: (query: PDateQuery | null) => void;
}

export interface PDateQuery {
  date_utc: {
    $gte: string;
    $lte: string;
  };
}
