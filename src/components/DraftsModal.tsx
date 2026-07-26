import React from 'react';
import { LetterData } from '../types';
import { FolderOpen, Trash2, Calendar, FileText, Check } from 'lucide-react';

interface DraftsModalProps {
  drafts: LetterData[];
  onSelect: (draft: LetterData) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  currentLetterId: string;
}

export const DraftsModal: React.FC<DraftsModalProps> = ({
  drafts,
  onSelect,
  onDelete,
  onClose,
  currentLetterId,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-[#D9D9D9]">
        <div className="p-4 border-b border-[#D9D9D9] flex items-center justify-between bg-[#F5F6F8]">
          <div className="flex items-center gap-2 font-bold text-[#1F1F1F] text-base">
            <FolderOpen className="w-5 h-5 text-[#F9C319]" />
            نامه‌های ذخیره شده و پیش‌نویس‌ها ({drafts.length})
          </div>
          <button
            onClick={onClose}
            className="text-[#6F6F6F] hover:text-[#1F1F1F] text-sm font-bold p-1 rounded-md cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {drafts.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-[#6F6F6F]">
              <FileText className="w-10 h-10 mx-auto text-[#D9D9D9]" />
              <p className="font-semibold text-sm">هیچ پیش‌نویسی ذخیره نشده است</p>
              <p className="text-xs text-[#6F6F6F]">با نوشتن نامه، پیش‌نویس شما به صورت خودکار ذخیره می‌شود.</p>
            </div>
          ) : (
            drafts.map((draft) => {
              const isCurrent = draft.id === currentLetterId;
              return (
                <div
                  key={draft.id}
                  className={`border rounded-xl p-3.5 transition flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'border-[#F9C319] bg-[#F9C319]/15 shadow-xs'
                      : 'border-[#D9D9D9] hover:border-[#F9C319] bg-white hover:bg-[#F5F6F8]'
                  }`}
                >
                  <div
                    className="flex-1 cursor-pointer space-y-1"
                    onClick={() => {
                      onSelect(draft);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1F1F1F] text-xs">
                        {draft.subject || 'بدون موضوع'}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] bg-[#F9C319] text-[#1F1F1F] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Check className="w-3 h-3" />
                          نامه‌ فعال
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#6F6F6F]">
                      <span>شماره: {draft.letterNumber || '---'}</span>
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3 text-[#F9C319]" />
                        {draft.letterDate || '---'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('آیا از حذف این پیش‌نویس اطمینان دارید؟')) {
                        onDelete(draft.id);
                      }
                    }}
                    className="p-2 text-[#6F6F6F] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="حذف پیش‌نویس"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-[#D9D9D9] bg-[#F5F6F8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#D9D9D9] hover:bg-[#6F6F6F]/30 text-[#1F1F1F] text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
