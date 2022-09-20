import { useState } from 'react';
import { usePolicy } from 'Mutations';
import { useLinkToBackground, useAnchor } from 'Utilities/Router';
import { dispatchNotification } from 'Utilities/Dispatcher';

export const useLinkToPolicy = () => {
  const anchor = useAnchor();
  const linkToBackground = useLinkToBackground();
  return () => {
    linkToBackground({ hash: anchor });
  };
};

export const useOnSave = (policy, updatedPolicyHostsAndRules) => {
  const updatePolicy = usePolicy();
  const linkToPolicy = useLinkToPolicy();
  const [isSaving, setIsSaving] = useState(false);
  const onSave = () => {
    if (isSaving) {
      return Promise.resolve({});
    }

    setIsSaving(true);
    updatePolicy(policy, updatedPolicyHostsAndRules)
      .then(() => {
        setIsSaving(false);
        dispatchNotification({
          variant: 'success',
          title: 'Policy updated',
          autoDismiss: true,
        });
        linkToPolicy();
      })
      .catch((error) => {
        setIsSaving(false);
        dispatchNotification({
          variant: 'danger',
          title: 'Error updating policy',
          description: error.message,
        });
        linkToPolicy();
      });
  };

  return [isSaving, onSave];
};

export const useSavePolicyDetails = (policyId) => {
  const anchor = useAnchor();
  const linkToBackground = useLinkToBackground(`/scappolicies/${policyId}`);
  return () => {
    linkToBackground({ hash: anchor });
  };
};

export const useOnSavePolicyDetails = (
  policy,
  updatedPolicyHostsAndRules,
  closingFunction,
  policyId
) => {
  const updatePolicy = usePolicy();
  const savePolicyDetails = useSavePolicyDetails(policyId);
  const [isSaving, setIsSaving] = useState(false);
  const onSave = () => {
    if (isSaving) {
      return Promise.resolve({});
    }
    setIsSaving(true);
    closingFunction();
    updatePolicy(policy, updatedPolicyHostsAndRules)
      .then(() => {
        setIsSaving(false);
        dispatchNotification({
          variant: 'success',
          title: 'Policy updated',
          autoDismiss: true,
        });
        savePolicyDetails();
      })
      .catch((error) => {
        setIsSaving(false);
        dispatchNotification({
          variant: 'danger',
          title: 'Error updating policy',
          description: error.message,
        });
        savePolicyDetails();
      });
  };
  return [isSaving, onSave];
};
