import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import { fetchWorkflowEventDecision } from '../../../../workflows/fetchers';
import { workflowsQueryKeys } from '../../../../workflows/query-keys';
import { Action } from '../../../../../common/enums';

export const useRejectCaseAndDocumentsMutation = ({
  workflowId,
  rejectionReason,
}: {
  workflowId: string;
  rejectionReason: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetchWorkflowEventDecision({
        workflowId,
        body: {
          name: Action.REJECT,
          reason: rejectionReason,
        },
      }),
    onSuccess: () => {
      // workflowsQueryKeys._def is the base key for all workflows queries
      void queryClient.invalidateQueries(workflowsQueryKeys._def);

      toast.success(t('toast:reject_case.success'));
    },
    onError: () => {
      toast.error(t('toast:reject_case.error'));
    },
  });
};
