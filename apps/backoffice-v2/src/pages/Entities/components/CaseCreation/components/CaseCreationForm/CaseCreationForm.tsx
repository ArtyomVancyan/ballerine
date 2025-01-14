import { TWorkflowDefinition } from '@/domains/workflows/fetchers';
import { FieldLayout } from '@/pages/Entities/components/CaseCreation/components/CaseCreationForm/components/FieldLayout';
import { SubmitSection } from '@/pages/Entities/components/CaseCreation/components/CaseCreationForm/components/SubmitSection';
import { useCaseCreationForm } from '@/pages/Entities/components/CaseCreation/components/CaseCreationForm/hooks/useCaseCreationForm';
import { useFormSchema } from '@/pages/Entities/components/CaseCreation/components/CaseCreationForm/hooks/useFormSchema';
import { transformErrors } from '@/pages/Entities/components/CaseCreation/components/CaseCreationForm/utils/transformErrors';
import { DynamicForm, baseLayouts } from '@ballerine/ui';
import { FunctionComponent } from 'react';

interface FormProps {
  workflowDefinition: TWorkflowDefinition;
}

const layouts = {
  ...baseLayouts,
  FieldTemplate: FieldLayout,
  ButtonTemplates: {
    ...baseLayouts.ButtonTemplates,
    SubmitButton: SubmitSection,
  },
};

export const CaseCreationForm: FunctionComponent<FormProps> = ({ workflowDefinition }) => {
  const { jsonSchema, uiSchema } = useFormSchema(workflowDefinition);
  const { isLoading, handleSubmit } = useCaseCreationForm(workflowDefinition);

  return (
    <DynamicForm
      schema={jsonSchema}
      uiSchema={uiSchema}
      onSubmit={handleSubmit}
      disabled={isLoading}
      transformErrors={transformErrors}
      layouts={layouts as typeof baseLayouts}
    />
  );
};
