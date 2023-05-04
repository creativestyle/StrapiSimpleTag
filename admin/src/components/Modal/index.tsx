import React from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Textarea
} from '@strapi/design-system';
import SimpleTagApiHandler from '../../api/simpletag';

interface DataInterface {
  id?: number;
  key?: string;
  value?: string;
}

interface ModalProps {
  data?: DataInterface;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  const [localData, setLocalData] = React.useState<Omit<DataInterface, 'id'>>({ key: data?.key, value: data?.value });

  const updateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData({ ...localData, key: e.target.value });
  };

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalData({ ...localData, value: e.target.value });
  };

  const saveData = async () => {
    if (data?.id) {
      await SimpleTagApiHandler.edit(data.id, localData);
    } else {
      await SimpleTagApiHandler.create(localData);
    }
    onClose();
  };

  return (
    <ModalLayout onClose={onClose}>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new tags
        </Typography>
      </ModalHeader>
      <ModalBody>
        <TextInput label="Key" name="key" value={localData.key} onChange={updateKey} required />
        <Textarea label="Value" name="value" value={localData.value} onChange={updateValue} hint="New line is delimter" required />
      </ModalBody>
      <ModalFooter
        startActions={<Button onClick={onClose} variant="tertiary">Cancel</Button>}
        endActions={<Button onClick={saveData}>Save</Button>}
      />
    </ModalLayout>
  );
};

export default Modal;