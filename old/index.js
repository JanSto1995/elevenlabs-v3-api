const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://elevenlabs.io/app/speech-synthesis/text-to-speech');

  // Fill in your script
  await page.fill('textarea', 'YOUR_SCRIPT_TEXT_HERE');

  // Click "Generate"
  await page.click('button:has-text("Generate")');

  // OPTIONAL: Wait for audio preview to appear (adjust selector if needed)
  await page.waitForSelector('button:has-text("Download")', { timeout: 60000 });

  // Now click "Download" and catch the download
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button:has-text("Download")')  // Adjust this selector to match the real Download button
  ]);

  await download.saveAs('audio.mp3');
  console.log('✅ Audio downloaded and saved.');

  await browser.close();
})();

