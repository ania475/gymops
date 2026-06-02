import { useState } from "react";
import type { NewMemberFormData } from "../types";
import { INITIAL_FORM } from "./constants";
import { AddMemberDialogPresentational } from "./AddMemberDialogPresentationalComponent";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewMemberFormData) => void;
};

export function AddMemberDialogContainer({ open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState<NewMemberFormData>(INITIAL_FORM);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) setForm(INITIAL_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.planType || !form.planStartDate)
      return;
    onSubmit(form);
    onOpenChange(false);
    setForm(INITIAL_FORM);
  }

  return (
    <AddMemberDialogPresentational
      open={open}
      form={form}
      onFormChange={setForm}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
    />
  );
}
