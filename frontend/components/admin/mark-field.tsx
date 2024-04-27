import React, { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import { HiCheck, HiPencil } from 'react-icons/hi2';
import { cn } from '@/lib/utils';
import { createMark } from '@/actions/handleCreate.action';
import { updateMarkById } from '@/actions/handleUpdate.action';

interface MarkFieldProps {
  id: string;
  mark: string;
  studentId: string;
  examId: string;
}

export const MarkField: FC<MarkFieldProps> = ({ mark, id, examId, studentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [markValue, setMarkValue] = useState(mark);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newValue = e.target.value.trim(); // Remove leading and trailing whitespace

    if (!newValue || isNaN(+newValue)) {
      // If the input is empty or not a valid number, reset to the previous value
      setMarkValue(markValue);
      return;
    }

    let parsedValue = +newValue;

    // Check if the parsed value is within the allowed range
    if (parsedValue >= +e.target.min && parsedValue <= +e.target.max) {
      setMarkValue(parsedValue.toString());
    } else {
      // If the value is less than 0, set it to 0
      if (parsedValue < 0) {
        setMarkValue('0');
      }
      // If the value is greater than 100, set it to 100
      else if (parsedValue > 100) {
        setMarkValue('100');
      }
    }
  };

  const onSave = async () => {
    try {
      const data = {
        mark: +markValue,
        examId,
        studentId,
      };

      if (!id) {
        await createMark(data);
      } else {
        await updateMarkById(id, data);
      }
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-auto flex gap-1 items-center ">
      <div>
        <Input
          id={id}
          type="number"
          max={100}
          min={0}
          value={markValue}
          className="w-auto"
          disabled={!isEditing}
          onChange={onChange}
        />
      </div>
      <HiPencil className="h-6 w-6 cursor-pointer" onClick={() => setIsEditing((prevState) => !prevState)} />
      <HiCheck className={cn('h-6 w-6 cursor-pointer', mark === markValue && 'opacity-50')} onClick={onSave} />
    </div>
  );
};
