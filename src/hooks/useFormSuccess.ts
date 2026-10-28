import { useState, useEffect } from "react";

import type { FormControls } from "@/types/types";

interface UseFormSuccessOptions extends Pick<
  FormControls,
  "submitSucceeded" | "errorData" | "formRestartHandler"
> {
  onSuccess?: () => void;
}

export function useFormSuccess({
  submitSucceeded,
  errorData,
  formRestartHandler,
  onSuccess,
}: UseFormSuccessOptions) {
  const [dismissed, setDismissed] = useState(false);
  const { errorMessage } = errorData;
  const succeeded = !errorMessage && !!submitSucceeded;
  const showSuccess = succeeded && !dismissed;

  useEffect(() => {
    if (!succeeded) return;

    const hideTimer = setTimeout(() => setDismissed(true), 4000);
    const restartTimer = setTimeout(() => {
      formRestartHandler();
      setDismissed(false);
      onSuccess?.();
    }, 4100);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(restartTimer);
    };
  }, [succeeded, formRestartHandler, onSuccess]);

  return { showSuccess };
}
