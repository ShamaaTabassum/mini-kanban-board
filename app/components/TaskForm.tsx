// components/TaskForm.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';

interface TaskFormProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  value,
  onChange,
  onSave,
  onCancel,
  placeholder = "Enter task title...",
  autoFocus = true
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  }, [onSave, onCancel]);

  return (
    <div className="bg-white rounded-lg border-2 border-purple-200 shadow-sm p-3 space-y-3">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full text-sm text-gray-900 bg-transparent border-none outline-none resize-none placeholder-gray-400 leading-relaxed min-h-[20px]"
        rows={2}
      />
      
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={!value.trim()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;