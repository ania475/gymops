import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLAN_OPTIONS } from "./constants";
import type { NewMemberFormData } from "./types";

type AddMemberDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewMemberFormData) => void;
};

const initialForm: NewMemberFormData = {
  name: "",
  email: "",
  planType: "",
  planStartDate: "",
};

export function AddMemberDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddMemberDialogProps) {
  const [form, setForm] = useState<NewMemberFormData>(initialForm);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setForm(initialForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.planType || !form.planStartDate)
      return;
    onSubmit(form);
    onOpenChange(false);
    setForm(initialForm);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Add a new member to your academy. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="add-member-name">Name</Label>
            <Input
              id="add-member-name"
              placeholder="e.g. John Smith"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-member-email">Email</Label>
            <Input
              id="add-member-email"
              type="email"
              placeholder="e.g. john@email.com"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-member-plan">Plan type</Label>
            <Select
              value={form.planType}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, planType: value }))
              }
            >
              <SelectTrigger id="add-member-plan">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {PLAN_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-member-start-date">Plan start date</Label>
            <Input
              id="add-member-start-date"
              type="date"
              value={form.planStartDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, planStartDate: e.target.value }))
              }
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
