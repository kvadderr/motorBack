import { Injectable } from '@nestjs/common';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/documents',
];

@Injectable()
export class GoogleService {


    async authorize() {
        let client = await this.loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        const authResult = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });

        if (authResult.credentials) {
            // Convert OAuth2Client to JSONClient
            const jsonClient = authResult.credentials;

            await this.saveCredentials(jsonClient);
            return jsonClient;
        }

        return null;
    }

    async createNewGoogleDoc(authClient, type) {
        const drive = google.drive({ version: 'v3', auth: authClient });

        // Define the metadata for the Google Docs file (in this case, a document).
        const fileMetadata = {
            name: 'MotorAPP', // Replace 'MyNewDocument' with the desired document name.
            mimeType: 'application/vnd.google-apps.'+type,
        };
        try {
            // Create the Google Docs file.
            const res = await drive.files.create({
                requestBody: fileMetadata,
                fields: 'id',
            });

            // Get the ID of the newly created Google Docs file.
            const fileId = res.data?.id;

            // Set permissions for the file to allow link sharing
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'writer',
                    type: 'anyone',
                },
            });

            const publishBody = {
                resource: {
                    published: true,
                    publishedOutsideDomain: true,
                    publishAuto: true,
                },
                fileId: fileId,
                revisionId: '1',
            };

            await drive.revisions.update(publishBody);

            console.log(`Created and published Google Docs file with ID: ${fileId}`);
            console.log(`Public link: https://docs.google.com/document/d/${fileId}/pub`);
        
            console.log(`Created and published Google Docs file with ID: ${fileId}`);
            return fileId;
        } catch (error) {
            console.error('Error creating Google Docs file:', error.message);
            throw error;
        }
    }

    async downloadFileAsHTML(authClient) {
        // Implement your downloadFileAsHTML logic from the provided module
    }

    async loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    async saveCredentials(client) {
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
}