import React from 'react';
import {View} from 'react-native-ui-lib';
import {Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from './LoadingModal.style';
import {Modal as useModal} from '../../stores/ModalStore/Modal';
import Loading from '../../assets/lotties/LoadingLottie.json';
export const LoadingModal = (): JSX.Element => {
  const modalStore = useModal();

  return (
    <Modal animationType="fade" visible={modalStore.loadingModal} transparent>
      <View style={styles.mainContainer}>
        <LottieView
          style={styles.lottieContainer}
          loop={true}
          source={Loading}
          autoPlay
        />
      </View>
    </Modal>
  );
};
