const myText = process.argv[2];
console.log("Received text:", myText);

// Use myText in your existing logic
// For example, pass it to your ElevenLabs processing or saving function


const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://elevenlabs.io/app/sign-in?redirect=%2Fapp%2Fspeech-synthesis%2Ftext-to-speech');
  await page.getByTestId('sign-in-email-input').fill('j44128501@gmail.com');
  await page.getByTestId('sign-in-password-input').fill('lV+s+U$s101l');
  await page.getByTestId('sign-in-submit-button').click();
  const welcomeDialog = await page.locator('[data-testid="v3-welcome-dialog-get-started"]');
if (await welcomeDialog.count() > 0) {
    await welcomeDialog.click();
}
  const voiceButton = await page.locator('button:has-text("Select voice -")');

if (await voiceButton.count() > 0) {
    await voiceButton.first().click();
    await page.getByText('Crystal - Pleasant sultry').click();
} else {
    console.log('Voice selection button not found. Skipping voice selection.');
}

  await page.getByTestId('tts-editor').locator('div').nth(1).click();
  await page.locator('.tiptap').fill(myText);
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
