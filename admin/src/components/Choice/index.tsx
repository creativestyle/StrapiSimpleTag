import React from "react";
import SimpleTagApiHandler from '../../api/simpletag';
import { Box, Select, Option, Loader } from '@strapi/design-system';

interface ChangeTargetInterface {
  target: {
    name: string;
    value: string;
    type: string;
  }
}

interface CustomFieldProps {
  description?: string | null;
  disabled: boolean;
  error: string;
  intlLabel: { id: string; defaultMessage: string; };
  name: string;
  onChange: (target: ChangeTargetInterface) => void;
  placeholder: string;
  required: boolean;
  value?: string;
  attribute: {
    customField: string;
    options: { [key: string]: any };
    type: string;
  }
}

const Choice: React.FC<CustomFieldProps> = ({ name, value, intlLabel, onChange, attribute, description, placeholder }) => {
  const [values, setValues] = React.useState<string | Array<string>>([]);
  const [options, setOptions] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const loadTags = async () => {
      const tag: any = await SimpleTagApiHandler.get(attribute.options.tagId);
      setOptions(tag.value.split('\n'));
    };

    loadTags();
  }, []);

  React.useEffect(() => {
    if (value) {
      if (attribute?.options?.multiple) {
        setValues(value.split(','));
      } else {
        setValues(value);
      }
    }
  }, [value]);

  const onSelectChange = (data: string | Array<string>) => {
    setValues(data);
    if (Array.isArray(data)) {
      onChange({ target: { name: name, type: attribute.type, value: data.join(',') } });
    } else {
      onChange({ target: { name: name, type: attribute.type, value: data } });
    }
  };


  return (
    <Box>
      {options &&
        <Select
          id={name}
          label={intlLabel.defaultMessage}
          placeholder={placeholder}
          onClear={() => setValues([])}
          value={values}
          onChange={onSelectChange}
          hint={description}
          multi={attribute?.options?.multiple || false}
          withTags={attribute?.options?.multiple || false}
        >
          {options.map((option, i) => (
            <Option key={`${name}_option_${i}`} value={option}>{option}</Option>
          ))}
        </Select>}
      {!options && <Loader>Loading data...</Loader>}
    </Box>
  );
};

export default Choice;
