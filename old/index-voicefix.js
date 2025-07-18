const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://elevenlabs.io/app/sign-in?redirect=%2Fapp%2Fspeech-synthesis%2Ftext-to-speech');
  await page.getByTestId('sign-in-email-input').fill('j44128501@gmail.com');
  await page.getByTestId('sign-in-password-input').fill('lV+s+U$s101l');
  await page.getByTestId('sign-in-submit-button').click();
  await page.getByTestId('v3-welcome-dialog-get-started').click();
  await page.getByRole('button', { name: /select a voice/i }).click();
  // Try clicking "Select a voice" button
try {
  await page.getByRole('button', { name: /select a voice/i }).click();
} catch { 
  // If that fails, try clicking voice name button (if a voice is already selected)
  await page.getByRole('button', { name: /select voice/i }).click();
}
  await page.getByTestId('tts-editor').click();
  await page.locator('.tiptap').fill('TEST');
  await page.getByRole('button', { name: 'Generate speech ⌘+Enter' }).click();

  // Download Generation 1
  const downloadPromise = page.waitForEvent('download');
  await page.locator('div').filter({ hasText: /^Generation 1$/ }).getByLabel('Download').click();
  const download = await downloadPromise;
  await download.saveAs('audio1.mp3');   // Speichern

  // Download Generation 2
  const download1Promise = page.waitForEvent('download');
  await page.locator('div').filter({ hasText: /^Generation 2$/ }).getByLabel('Download').click();
  const download1 = await download1Promise;
  await download1.saveAs('audio2.mp3');  // Speichern

  console.log('Beide Audiodateien wurden gespeichert.');

  await browser.close();
})();
