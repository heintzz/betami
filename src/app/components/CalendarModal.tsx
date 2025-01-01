import React from 'react';
import { ITempDateMetadata } from './DatePicker';

interface ICalendarModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: ({ year, month }: ITempDateMetadata) => void;
  metadata: ITempDateMetadata;
}

export default function CalendarModal({ isOpen, onClose, onSave, metadata }: ICalendarModal) {
  const [year, setYear] = React.useState(metadata.year);
  const [month, setMonth] = React.useState(metadata.month);

  const handleSave = () => {
    onSave({ year, month });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <div className="flex flex-col gap-4">
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label>
            Month:
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value, 10))}
              className="w-full mt-1 p-2 border rounded"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('en-GB', { month: 'long' })}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
