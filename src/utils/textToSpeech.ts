// 공통 util 함수로 만들어두세요
export const speakText = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn('이 브라우저는 Web Speech API를 지원하지 않습니다.');
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  // 목소리·언어·속도 등 옵션 설정 가능
  utterance.lang = 'ko-KR';
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
};
