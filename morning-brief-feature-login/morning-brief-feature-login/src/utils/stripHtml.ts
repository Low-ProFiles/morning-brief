/**
 * HTML 태그를 모두 제거하고 텍스트만 리턴
 */
export const stripHtml = (html: string): string => {
  // 1) 브라우저 환경: DOMParser 사용
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
}
