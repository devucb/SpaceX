import {Modal} from '../stores/ModalStore/Modal';
import axios from 'axios';

export interface ILaunch {
  links: {
    patch: {
      small: null;
      large: null;
    };
    flickr: {
      small: [];
      original: [];
    };
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  rocket: string;
  success: boolean | null;
  details: string | string[] | null;
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  id: string;
}

export const getQueryLaunches = (body: {
  query: any;
  options: {
    page: number;
    limit: 10;
  };
}): Promise<{docs: ILaunch[]; totalDocs: number}> => {
  return new Promise<{docs: ILaunch[]; totalDocs: number}>(
    (resolve, reject) => {
      Modal.setState({loadingModal: true});
      const url = 'https://api.spacexdata.com/v4/launches/query';
      axios
        .post(url, body)
        .then(resp => {
          Modal.setState({loadingModal: false});

          resolve(resp.data);
        })
        .catch(err => {
          Modal.setState({loadingModal: false});
          setTimeout(() => {
            Modal.setState({errorModal: true});
          }, 500);
          reject(err.response?.data);
        });
    },
  );
};
export const getUpcomingLaunches = (): Promise<ILaunch[]> => {
  return new Promise<ILaunch[]>((resolve, reject) => {
    Modal.setState({loadingModal: true});
    const url = 'https://api.spacexdata.com/v4/launches/upcoming';
    axios
      .get(url)
      .then(resp => {
        Modal.setState({loadingModal: false});
        resolve(resp.data);
      })
      .catch(err => {
        Modal.setState({loadingModal: false});
        setTimeout(() => {
          Modal.setState({errorModal: true});
        }, 500);
        reject(err.response?.data);
      });
  });
};
