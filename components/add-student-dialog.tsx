'use client'
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { NewStudent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormProvider,
  useForm,
} from "react-hook-form"; // Import FormProvider and useForm
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const defaultValues: NewStudent = {
  name: "",
  cohort: "AY 2024-25",
  status: true,
  courseIds: [],
};

export default function AddStudentDialog() {
  const [open, setOpen] = useState(false);
  const { addStudent, isLoading } = useStore();

  const formMethods = useForm({
    defaultValues,
  });

  const handleSubmit = async (data: NewStudent) => {
    try {
      await addStudent(data);
      console.log(data)
      setOpen(false);
      formMethods.reset(defaultValues);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Student name" required />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Cohort Field */}
            <FormField
              name="cohort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cohort</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cohort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                        <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Student"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
