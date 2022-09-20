import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { fixedPercentage } from 'Utilities/TextHelper';
import {
  PolicyBusinessObjectiveTooltip,
  PolicyThresholdTooltip,
} from 'PresentationalComponents';
import {
  Card,
  CardHeader,
  CardBody,
  TextContent,
  TextVariants,
  Text,
  Button,
} from '@patternfly/react-core';
import Truncate from '@redhat-cloud-services/frontend-components/Truncate';
import linkifyHtml from 'linkifyjs/html';
import EditPolicyDetailsInline from '../../SmartComponents/EditPolicyDetails/EditPolicyDetailsInline';

const PolicyDetailsDescription = ({ policy }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleToggle = (e) => {
    setIsEditOpen(!isEditOpen);
    setInlineId(e.target.id);
  };
  const [inlineId, setInlineId] = useState();
  const useInputFocus = useRef();
  useEffect(() => {
    if (isEditOpen && useInputFocus && useInputFocus.current) {
      useInputFocus.current.focus();
    }
  }, [isEditOpen]);
  const thresholdText = `${fixedPercentage(
    policy.complianceThreshold,
    1
  )} of rules must be
  passed for a system to be labeled "Compliant"`;
  const businessText =
    (policy.businessObjective && policy.businessObjective.title) || '-';
  const descriptionText = linkifyHtml(policy.description || '');

  return (
    <Card ouiaId="PolicyDetailsCard">
      <CardHeader>
        <Text style={{ fontSize: 20 }}>
          <b>Policy details</b>
        </Text>
      </CardHeader>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.h5}>
            Compliance threshold (%)
            <Button
              onClick={handleToggle}
              variant="plain"
              style={{ 'margin-left': '5px' }}
            >
              <i
                className="fas fa-pencil-alt"
                aria-hidden="true"
                id="complianceThreshold"
              />
            </Button>
            <PolicyThresholdTooltip />
          </Text>
          {isEditOpen && inlineId === 'complianceThreshold' ? (
            <EditPolicyDetailsInline
              text={policy.complianceThreshold}
              variant="threshold"
              policyData={policy}
              buttonId={inlineId}
              setCloseHook={setIsEditOpen}
            />
          ) : (
            <Text className="threshold-tooltip" component={TextVariants.p}>
              {thresholdText}
            </Text>
          )}
          <Text component={TextVariants.h5}>
            Business objective
            <Button
              onClick={handleToggle}
              variant="plain"
              style={{ 'margin-left': '5px' }}
            >
              <i
                className="fas fa-pencil-alt"
                aria-hidden="true"
                id="businessObjective"
              />
            </Button>
            <PolicyBusinessObjectiveTooltip />
          </Text>
          {isEditOpen && inlineId === 'businessObjective' ? (
            <EditPolicyDetailsInline
              text={businessText}
              variant="business"
              policyData={policy}
              buttonId={inlineId}
              setCloseHook={setIsEditOpen}
            />
          ) : (
            <Text component={TextVariants.p}>{businessText}</Text>
          )}
          <Text component={TextVariants.h5}>
            Policy description
            <Button
              onClick={handleToggle}
              variant="plain"
              style={{ 'margin-left': '5px' }}
            >
              <i
                className="fas fa-pencil-alt"
                aria-hidden="true"
                id="description"
              />
            </Button>
          </Text>
          {isEditOpen && inlineId === 'description' ? (
            <EditPolicyDetailsInline
              text={descriptionText}
              variant="textarea"
              policyData={policy}
              buttonId={inlineId}
              setCloseHook={setIsEditOpen}
            />
          ) : (
            <Text component={TextVariants.p}>
              <Truncate text={descriptionText} length={380} inline={true} />
            </Text>
          )}
          <Text component={TextVariants.h5}>Operating system</Text>
          <Text component={TextVariants.p}>RHEL {policy.osMajorVersion}</Text>
          <Text component={TextVariants.h5}>Policy type </Text>
          <Text component={TextVariants.p}>{policy.policyType}</Text>
          <Text component={TextVariants.h5}>Reference ID</Text>
          <Text component={TextVariants.p}>{policy.refId}</Text>
        </TextContent>
      </CardBody>
    </Card>
  );
};
PolicyDetailsDescription.propTypes = {
  policy: propTypes.object,
};

export default PolicyDetailsDescription;
