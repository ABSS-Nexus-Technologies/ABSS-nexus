const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/Users/shubhamkumar/.gemini/antigravity-ide/brain/784197ee-b952-4623-8bb5-a368d95d7f10';

async function captureBreakpoint(width, height, filename) {
  return new Promise((resolve, reject) => {
    const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
      '--headless=new',
      '--remote-debugging-port=9223',
      '--disable-gpu',
      `--window-size=${width},${height}`
    ]);

    let resolved = false;

    setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:9223/json');
        const tabs = await res.json();
        const tab = tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        let id = 1;
        const send = (method, params = {}) => ws.send(JSON.stringify({ id: id++, method, params }));

        ws.onopen = () => {
          send('Page.enable');
          send('Emulation.setDeviceMetricsOverride', {
            width,
            height,
            deviceScaleFactor: 1,
            mobile: width < 768
          });
          send('Page.navigate', { url: 'http://localhost:3000' });
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.method === 'Page.loadEventFired') {
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 800);
          } else if (data.result && data.result.data) {
            const outPath = path.join(ARTIFACT_DIR, filename);
            fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
            console.log(`✓ Saved ${filename} (${width}x${height}) to ${outPath}`);
            resolved = true;
            ws.close();
            chrome.kill();
            resolve(outPath);
          }
        };

        ws.onerror = (err) => {
          if (!resolved) {
            chrome.kill();
            reject(err);
          }
        };
      } catch (err) {
        chrome.kill();
        reject(err);
      }
    }, 1200);
  });
}

async function run() {
  console.log('Capturing mobile and tablet screenshots for ABSS Nexus...\n');
  try {
    await captureBreakpoint(360, 780, 'mobile_screenshot_360px.png');
    await captureBreakpoint(480, 840, 'mobile_screenshot_480px.png');
    await captureBreakpoint(768, 1024, 'tablet_screenshot_768px.png');
    console.log('\nAll breakpoint screenshots captured successfully!');
  } catch (err) {
    console.error('Error capturing screenshots:', err.message);
  }
}

run();
