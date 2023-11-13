const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/documents'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function createNewGoogleDoc(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  // Define the metadata for the Google Docs file (in this case, a document).
  const fileMetadata = {
    name: 'kvader', // Replace 'MyNewDocument' with the desired document name.
    mimeType: 'application/vnd.google-apps.document',
  };

  // Create the Google Docs file.
  const res = await drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  });

  // Get the ID of the newly created Google Docs file.
  const fileId = res.data.id;

  // Set permissions for the file to allow link sharing
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // Get the file details, including the link
  const fileDetails = await drive.files.get({
    fileId: fileId,
    fields: 'webViewLink, webContentLink',
  });

  const webViewLink = fileDetails.data.webViewLink;
  const webContentLink = fileDetails.data.webContentLink;

  const someData = await exportGoogleDocAsPDF(authClient, fileId)
  console.log(`Created and published Google Docs file with ID: ${fileId}`);
  console.log(`View the document at: ${webViewLink}`);
  console.log(`Direct link for web content: ${webContentLink}`);
  console.log(`Direct link for web content: ${fileDetails.data}`);
  return fileId;
}

async function exportGoogleDocAsPDF(authClient, fileId) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  console.log(fileId)
  const exportOptions = {
    mimeType: 'text/html',
  };

  const res = await drive.files.export({
    fileId: fileId,
    mimeType: exportOptions.mimeType,
  });

  const fileData = res.data;
  console.log('fileData', fileData)
  console.log(`Exported Google Docs file as PDF. Download link: ${fileData.webViewLink}`);
  return fileData;
}

async function downloadFileAsHTML(authClient) {

  const fileId = '1lj7Ix1vsEBGcielnOpyjGAAru5v4dud14AyOwkapyrU';
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    const res = await drive.files.export({
      fileId: fileId,
      mimeType: 'application/pdf',  // Используйте правильный MIME-тип для PDF
    });

    // `res.data` будет содержать HTML-код файла
    const fileContent = res.data;
    console.log('yees', fileContent)
    // Здесь можно обработать содержимое файла, например, сохранить его в файл или выполнить другие действия с HTML-кодом.

    return fileContent;
  } catch (error) {
    console.error('Ошибка при загрузке файла в формате HTML:', error.message);
    throw error;
  }
}

authorize().then(createNewGoogleDoc).catch(console.error);