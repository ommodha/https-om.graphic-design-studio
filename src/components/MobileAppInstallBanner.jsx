import React, { useState, useEffect } from 'react';
import { Smartphone, Download, CheckCircle2, X, Sparkles } from 'lucide-react';

export default function MobileAppInstallBanner({ isOpen, onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(() => window.deferredPwaPrompt || null);
  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPwaPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);

    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const handleInstallClick = async () => {
    setInstalling(true);
    const promptToUse = deferredPrompt || window.deferredPwaPrompt;

    if (promptToUse) {
      try {
        promptToUse.prompt();
        const choice = await promptToUse.userChoice;
        if (choice.outcome === 'accepted') {
          setInstalled(true);
        }
        setDeferredPrompt(null);
        window.deferredPwaPrompt = null;
      } catch (err) {
        console.error("Install prompt error:", err);
      } finally {
        setInstalling(false);
      }
      return;
    }

    // Direct Web App Shortcut download for instant mobile home screen launch
    try {
      const launcherContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Om Graphic Studio</title>
  <meta http-equiv="refresh" content="0; url=${window.location.origin}${window.location.pathname}">
  <style>
    body { background: #08090C; color: #FFF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
    a { color: #00DFD8; font-weight: bold; font-size: 20px; text-decoration: none; }
  </style>
</head>
<body>
  <div>
    <h2>Opening Om Graphic Studio...</h2>
    <p><a href="${window.location.origin}${window.location.pathname}">Click to open Mobile Studio App</a></p>
  </div>
</body>
</html>`;
      const blob = new Blob([launcherContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Om-Graphic-Studio-App.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setInstalled(true);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setInstalling(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '28px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0, 223, 216, 0.3)',
        border: '1px solid rgba(0, 223, 216, 0.4)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFF',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00DFD8 0%, #0066FF 100%)',
            margin: '0 auto 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0, 223, 216, 0.4)'
          }}>
            <Smartphone style={{ width: '30px', height: '30px', color: '#000' }} />
          </div>

          <h3 className="font-syne" style={{ fontSize: '22px', fontWeight: '800', color: '#FFF', marginBottom: '6px' }}>
            Install Om Graphic Studio App
          </h3>
          <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>
            Install the 100% Free Mobile App directly onto your phone screen for instant 1-click access!
          </p>
        </div>

        {/* 1-Click Install Button */}
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={installing || installed}
          className="font-space"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: installed ? '#22C55E' : 'linear-gradient(135deg, #00DFD8 0%, #7928CA 100%)',
            color: '#FFF',
            fontWeight: '700',
            fontSize: '15px',
            border: 'none',
            cursor: installing ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(0, 223, 216, 0.35)',
            marginBottom: '20px'
          }}
        >
          {installed ? (
            <>
              <CheckCircle2 style={{ width: '20px', height: '20px' }} /> Mobile App Added / Ready!
            </>
          ) : installing ? (
            <>
              <Sparkles style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} /> Installing App...
            </>
          ) : (
            <>
              <Download style={{ width: '20px', height: '20px' }} /> 📱 Install App to Phone Screen
            </>
          )}
        </button>

        {/* Visual Installation Steps for Android & iOS */}
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#00DFD8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            How to Install on Mobile Phone (100% Free)
          </div>

          <div style={{ fontSize: '12px', color: '#E2E8F0', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ background: 'rgba(0, 223, 216, 0.2)', color: '#00DFD8', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', fontSize: '10px' }}>ANDROID</span>
            <span>Tap Chrome menu <strong>(⋮ 3 dots)</strong> top right ➔ select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.</span>
          </div>

          <div style={{ fontSize: '12px', color: '#E2E8F0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ background: 'rgba(255, 0, 128, 0.2)', color: '#FF0080', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', fontSize: '10px' }}>IPHONE</span>
            <span>Tap Safari <strong>Share button (⎋)</strong> ➔ scroll & tap <strong>"Add to Home Screen"</strong>.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
