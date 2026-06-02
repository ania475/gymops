import type React from "react";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VIDEO_CATEGORIES, VISIBILITY_OPTIONS, type Visibility } from "./constants";

type Props = {
  open: boolean;
  title: string;
  category: string;
  visibility: Visibility;
  file: File | null;
  error: string;
  fileRef: React.RefObject<HTMLInputElement>;
  onTitleChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onVisibilityChange: (v: Visibility) => void;
  onFileChange: (f: File | null) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFilePickerClick: () => void;
};

const VISIBILITY_LABELS: Record<Visibility, string> = {
  public: "Public",
  members: "Members only",
  private: "Private",
};

export function UploadVideoModalPresentational({
  open,
  title,
  category,
  visibility,
  file,
  error,
  fileRef,
  onTitleChange,
  onCategoryChange,
  onVisibilityChange,
  onFileChange,
  onClose,
  onSubmit,
  onFilePickerClick,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Upload New Video
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Morning Mobility Routine"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {VIDEO_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Visibility</label>
            <Select
              value={visibility}
              onValueChange={(v) => onVisibilityChange(v as Visibility)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VISIBILITY_OPTIONS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {VISIBILITY_LABELS[v]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Video file</label>
            <div
              className="flex items-center justify-center w-full h-24 rounded-md border-2 border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors"
              onClick={onFilePickerClick}
            >
              {file ? (
                <p className="text-sm text-muted-foreground truncate px-4">
                  {file.name}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to select a video file
                </p>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
