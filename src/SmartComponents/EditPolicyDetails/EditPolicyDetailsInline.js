import React, { useState } from 'react';
import {
  Button,
  FormGroup,
  Text,
  TextArea,
  TextInput,
} from '@patternfly/react-core';
import propTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { useOnSavePolicyDetails } from '../EditPolicy/hooks';

const EditPolicyDetailsInline = ({
  text,
  variant,
  policyData,
  buttonId,
  setCloseHook,
}) => {
  const copiedData = policyData;
  const [inputText, setInputText] = useState(text);
  const handleTextUpdate = (newText, e) => {
    setInputText(newText);
    setDirty(!!e.target.value);
  };
  const handleCloseEdit = () => {
    setCloseHook(false);
  };
  //marking page as dirty if user didn't save changes and tries to navigate away
  const [dirty, setDirty] = useState(false);
  const constructData =
    buttonId === 'businessObjective'
      ? { ...copiedData, [buttonId]: { title: inputText } }
      : {
          ...copiedData,
          [buttonId]: inputText,
        };

  const [isSaving, onSave] = useOnSavePolicyDetails(
    policyData,
    constructData,
    handleCloseEdit,
    policyData.id
  );

  return (
    <FormGroup
      className="pf-c-inline-edit pf-m-inline-editable"
      id="single-editable-example"
    >
      <Text
        className="pf-c-inline-edit__value"
        id="single-editable --pf-global--spacer--xs"
      >
        {text}
      </Text>
      <div className="pf-c-inline-edit__action pf-m-enable-editable">
        <Button
          className="pf-c-button pf-m-plain"
          type="button"
          id="edit-button"
          aria-label="Edit"
          aria-labelledby="single-editable-example-edit-button single-editable"
        />
      </div>
      <div className="pf-c-inline-edit__group">
        {variant === 'business' ? (
          <TextInput
            className="pf-c-form-control pf-u-w-33-on-lg"
            type="text"
            value={inputText}
            aria-label="Editable text input"
            onChange={handleTextUpdate}
            id="policydetails-input"
          />
        ) : variant === 'threshold' ? (
          <div>
            <TextInput
              className="pf-c-form-control pf-u-w-100-on-lg"
              type="text"
              value={inputText}
              aria-label="Editable text input"
              onChange={handleTextUpdate}
            />
            <Text>A value of 95% or higher is recommended</Text>
          </div>
        ) : (
          <TextArea
            resizeOrientation="vertical"
            className="pf-c-form-control pf-u-w-33-on-lg"
            aria-label="Editable textarea"
            defaultValue={inputText}
            onChange={handleTextUpdate}
          />
        )}
        <div className="pf-c-inline-edit__group pf-m-action-group pf-m-icon-group">
          <div className="pf-c-inline-edit__action pf-m-valid">
            <Button
              className="pf-c-button pf-m-plain"
              type="button"
              aria-label="Save edits"
              isLoading={isSaving}
              onClick={onSave}
              style={{ 'margin-left': '5px' }}
            >
              <i className="fas fa-check" aria-hidden="true"></i>
            </Button>
          </div>
          <div className="pf-c-inline-edit__action">
            <Button
              className="pf-c-button pf-m-plain"
              type="button"
              aria-label="Cancel edits"
              onClick={handleCloseEdit}
              style={{ 'margin-left': '5px' }}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
      </div>
      <Prompt
        when={dirty}
        message="You have unsaved changes on this page. Are you sure you want to leave?"
      />
    </FormGroup>
  );
};

EditPolicyDetailsInline.propTypes = {
  text: propTypes.string,
  variant: propTypes.string,
  policyData: propTypes.obj,
  buttonId: propTypes.string,
  handleCloseEdit: propTypes.func,
  setCloseHook: propTypes.hook,
};

export default EditPolicyDetailsInline;
