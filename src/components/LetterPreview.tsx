import React, { useState, useEffect } from 'react';
import { LetterData, Settings } from '../types';
import { LetterheadSVG } from './LetterheadSVG';
import { toPersianDigits } from '../utils/jalali';

interface LetterPreviewProps {
  letterData: LetterData;
  settings: Settings;
  previewScale?: number; // scale factor for responsive display
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({
  letterData,
  settings,
  previewScale = 1,
}) => {
  const [pages, setPages] = useState<string[][]>([letterData.bodyContent.split('\n')]);
  const [isMeasuring, setIsMeasuring] = useState(true);

  const paragraphs = letterData.bodyContent.split('\n');

  const formatDigits = (val: string) => {
    return settings.usePersianDigits ? toPersianDigits(val) : val;
  };

  useEffect(() => {
    setIsMeasuring(true);
    const timer = setTimeout(() => {
      calculatePages();
    }, 100);
    return () => clearTimeout(timer);
  }, [
    letterData.bodyContent,
    letterData.subject,
    letterData.recipientTo,
    letterData.recipientGreeting,
    letterData.senderTitle,
    letterData.senderName,
    settings.marginTopMM,
    settings.marginBottomMM,
    settings.fontSize,
    settings.lineHeight,
  ]);

  const calculatePages = () => {
    const pxPerMM = 3.779527559;
    const bodyHeightPx = (297 - settings.marginTopMM - settings.marginBottomMM) * pxPerMM - 5;

    const topEl = document.getElementById('draft-top');
    const bottomEl = document.getElementById('draft-bottom');
    
    const topHeight = topEl ? topEl.offsetHeight + 16 : 0;
    const bottomHeight = bottomEl ? bottomEl.offsetHeight + 32 : 0;

    let currentPages: string[][] = [];
    let currentPageIdx = 0;
    let currentHeight = topHeight;

    currentPages[0] = [];

    paragraphs.forEach((p, idx) => {
      const pEl = document.getElementById(`draft-p-${idx}`);
      const pHeight = pEl ? (pEl.offsetHeight || (settings.fontSize * settings.lineHeight * 1.33)) + 12 : 0;

      if (currentHeight + pHeight > bodyHeightPx && currentPages[currentPageIdx].length > 0) {
        currentPageIdx++;
        currentPages[currentPageIdx] = [];
        currentHeight = 0;
      }

      currentPages[currentPageIdx].push(p);
      currentHeight += pHeight;
    });

    if (currentHeight + bottomHeight > bodyHeightPx) {
      currentPageIdx++;
      currentPages[currentPageIdx] = [];
    }

    setPages(currentPages);
    setIsMeasuring(false);
  };

  return (
    <div
      className="flex flex-col gap-6 items-center transition-all duration-200"
      style={{
        transform: previewScale < 1 ? `scale(${previewScale})` : undefined,
        transformOrigin: 'top center',
        width: '210mm',
        maxWidth: '100%',
      }}
    >
      {/* HIDDEN MEASUREMENT CONTAINER */}
      <div
        className="absolute opacity-0 pointer-events-none"
        style={{
          width: '210mm',
          paddingRight: `${settings.marginRightMM}mm`,
          paddingLeft: `${settings.marginLeftMM}mm`,
          fontSize: `${settings.fontSize}pt`,
          lineHeight: settings.lineHeight,
          fontFamily: "'Vazirmatn', sans-serif",
          zIndex: -100,
        }}
      >
        <div id="draft-top" className="pb-4">
          {letterData.recipientTo && (
            <div className="font-bold mb-2 whitespace-pre-line text-[1.05em] leading-snug">
              به: {formatDigits(letterData.recipientTo)}
            </div>
          )}
          {letterData.recipientGreeting && (
            <div className="font-medium mb-3 text-[1em]">
              {formatDigits(letterData.recipientGreeting)}
            </div>
          )}
          {letterData.subject && (
            <div className="font-bold mb-5 pb-2 text-[1.05em] flex items-center gap-1">
              موضوع: {formatDigits(letterData.subject)}
            </div>
          )}
        </div>

        <div className="space-y-3 text-justify leading-relaxed whitespace-pre-line text-[1em]">
          {paragraphs.map((p, i) => (
            <div key={i} id={`draft-p-${i}`}>{formatDigits(p) || '\u00A0'}</div>
          ))}
        </div>

        <div id="draft-bottom" className="mt-8 flex justify-end">
          <div className="w-64 text-center flex flex-col items-center relative">
            {letterData.senderTitle && (
              <div className="font-bold text-[1em] whitespace-pre-line mb-1">
                {formatDigits(letterData.senderTitle)}
              </div>
            )}
            {letterData.senderName && (
              <div className="font-semibold text-[0.95em]">
                {formatDigits(letterData.senderName)}
              </div>
            )}
            <div className="h-24 mt-2 w-full"></div>
          </div>
        </div>
      </div>

      {/* ACTUAL PAGES */}
      {(isMeasuring ? [paragraphs] : pages).map((pageParas, pageIdx) => (
        <div
          key={pageIdx}
          className="a4-page-export relative mx-auto bg-white shadow-2xl overflow-hidden print:shadow-none print:m-0 print:p-0"
          style={{
            width: '210mm',
            height: '297mm',
            fontFamily: "'Vazirmatn', sans-serif",
          }}
        >
          {/* 1. Background Letterhead Graphics */}
          {settings.showBackgroundLetterhead && (
            <LetterheadSVG customImage={settings.customBackgroundImage} />
          )}

          {/* 2. Top Right Header Overlay Fields (شماره، تاریخ، پیوست) */}
          <div
            className="absolute top-0 right-0 z-10 pointer-events-none"
            style={{
              width: '210mm',
              height: '42mm',
            }}
          >
            {/* Letter Number */}
            <div
              className="absolute font-extrabold text-[13.5px] leading-none text-slate-900"
              style={{
                top: `${10.5 + (settings.headerNumberOffset?.y || 0)}mm`,
                right: `${15 + (settings.headerNumberOffset?.x || 0)}mm`,
                direction: settings.showBackgroundLetterhead ? 'ltr' : 'rtl',
                textAlign: settings.showBackgroundLetterhead ? 'left' : 'right',
                width: settings.showBackgroundLetterhead ? '38mm' : '55mm',
                color: '#0f172a',
              }}
            >
              {!settings.showBackgroundLetterhead && (
                <span className="font-bold text-slate-700 ml-1">شماره: </span>
              )}
              {formatDigits(letterData.letterNumber)}
            </div>

            {/* Letter Date */}
            <div
              className="absolute font-extrabold text-[13.5px] leading-none text-slate-900"
              style={{
                top: `${18.5 + (settings.headerDateOffset?.y || 0)}mm`,
                right: `${15 + (settings.headerDateOffset?.x || 0)}mm`,
                direction: settings.showBackgroundLetterhead ? 'ltr' : 'rtl',
                textAlign: settings.showBackgroundLetterhead ? 'left' : 'right',
                width: settings.showBackgroundLetterhead ? '38mm' : '55mm',
                color: '#0f172a',
              }}
            >
              {!settings.showBackgroundLetterhead && (
                <span className="font-bold text-slate-700 ml-1">تاریخ: </span>
              )}
              {formatDigits(letterData.letterDate)}
            </div>

            {/* Attachment */}
            <div
              className="absolute font-extrabold text-[13.5px] leading-none text-slate-900"
              style={{
                top: `${26.5 + (settings.headerAttachmentOffset?.y || 0)}mm`,
                right: `${15 + (settings.headerAttachmentOffset?.x || 0)}mm`,
                direction: 'rtl',
                textAlign: 'right',
                width: settings.showBackgroundLetterhead ? '38mm' : '55mm',
                color: '#0f172a',
              }}
            >
              {!settings.showBackgroundLetterhead && (
                <span className="font-bold text-slate-700 ml-1">پیوست: </span>
              )}
              {formatDigits(letterData.attachment || 'ندارد')}
            </div>
          </div>

          {/* 3. Main Letter Content Area */}
          <div
            className="relative z-10 h-full flex flex-col justify-between"
            style={{
              paddingTop: `${settings.marginTopMM}mm`,
              paddingBottom: `${settings.marginBottomMM}mm`,
              paddingRight: `${settings.marginRightMM}mm`,
              paddingLeft: `${settings.marginLeftMM}mm`,
              fontSize: `${settings.fontSize}pt`,
              lineHeight: settings.lineHeight,
              color: '#1e293b',
            }}
          >
            <div className="flex-1">
              {pageIdx === 0 && (
                <div className="pb-4">
                  {letterData.recipientTo && (
                    <div className="font-bold mb-2 whitespace-pre-line text-[1.05em] leading-snug" style={{ color: '#0f172a' }}>
                      به: {formatDigits(letterData.recipientTo)}
                    </div>
                  )}

                  {letterData.recipientGreeting && (
                    <div className="font-medium mb-3 text-[1em]" style={{ color: '#1e293b' }}>
                      {formatDigits(letterData.recipientGreeting)}
                    </div>
                  )}

                  {letterData.subject && (
                    <div className="font-bold mb-5 pb-2 text-[1.05em] flex items-center gap-1" style={{ color: '#0f172a', borderBottom: '1px solid #fde68a' }}>
                      <span className="underline underline-offset-4" style={{ color: '#b45309' }}>
                        موضوع: {formatDigits(letterData.subject)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="text-justify leading-relaxed whitespace-pre-line text-[1em] space-y-3" style={{ color: '#1e293b' }}>
                {pageParas.map((p, i) => (
                  <div key={i}>{formatDigits(p) || '\u00A0'}</div>
                ))}
              </div>
            </div>

            {pageIdx === (isMeasuring ? 0 : pages.length - 1) && (
              <div className="mt-8 flex justify-end shrink-0">
                <div className="w-64 text-center flex flex-col items-center relative">
                  {letterData.senderTitle && (
                    <div className="font-bold text-[1em] whitespace-pre-line mb-1" style={{ color: '#0f172a' }}>
                      {formatDigits(letterData.senderTitle)}
                    </div>
                  )}

                  {letterData.senderName && (
                    <div className="font-semibold text-[0.95em]" style={{ color: '#1e293b' }}>
                      {formatDigits(letterData.senderName)}
                    </div>
                  )}

                  <div className="relative w-full h-24 mt-2 flex items-center justify-center pointer-events-none">
                    {letterData.showSignature && letterData.signatureImage && (
                      <img
                        src={letterData.signatureImage}
                        alt="امضای صادرکننده"
                        className="absolute z-10 max-h-20 object-contain filter drop-shadow-sm transition-transform"
                        style={{
                          transform: `scale(${letterData.signatureScale || 1})`,
                        }}
                      />
                    )}

                    {letterData.showStamp && letterData.stampImage && (
                      <img
                        src={letterData.stampImage}
                        alt="مهر رسمی شرکت"
                        className="absolute z-0 max-h-24 object-contain opacity-85 mix-blend-multiply transition-transform"
                        style={{
                          transform: `scale(${letterData.stampScale || 1}) rotate(-5deg)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Page Footer / Page Number */}
            {!isMeasuring && pages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono">
                 صفحه {formatDigits((pageIdx + 1).toString())} از {formatDigits(pages.length.toString())}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
