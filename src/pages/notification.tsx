import React, { useState } from 'react';
import './mypage.css';

type SettingKey = 'device' | 'email' | 'night';

export default function NotificationSettings() {
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    device: true,
    email: true,
    night: false,
  });

  const toggle = (key: SettingKey) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const labelMap: Record<SettingKey, string> = {
    device: '기기알림',
    email: '이메일 수신 동의',
    night: '야간 수신 동의',
  };

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">알림 설정</h2>
      <div className="info-box">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="info-row">
            <span>{labelMap[key as SettingKey]}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggle(key as SettingKey)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
