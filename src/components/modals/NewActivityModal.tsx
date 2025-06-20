
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewActivityModal = ({ open, onOpenChange }: NewActivityModalProps) => {
  const [formData, setFormData] = useState({
    type: "Call",
    subject: "",
    date: "",
  });

  const handleSubmit = () => {
    console.log("Creating new activity:", formData);
    onOpenChange(false);
    setFormData({ type: "Call", subject: "", date: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="activity-type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Follow up call with client"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Due Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            Create Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewActivityModal;
