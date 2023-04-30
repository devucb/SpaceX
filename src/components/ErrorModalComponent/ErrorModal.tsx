import React from 'react';
import {View} from 'react-native-ui-lib';
import {styles} from './ErrorModal.style';
import {Modal, Pressable, Text} from 'react-native';
import {Modal as useModal} from '../../stores/ModalStore/Modal';
export const ErrorModal = () => {
  const modal = useModal();
  return (
    <Modal animationType="fade" visible={modal.errorModal} transparent>
      <View style={styles.mainContainer}>
        <View style={styles.tooltip}>
          <Text style={styles.serviceErrorTitle}>Service Error</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => modal.setErrorModal(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
