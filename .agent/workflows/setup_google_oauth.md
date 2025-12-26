---
description: How to obtain Google OAuth Credentials
---

# Setting up Google OAuth 2.0

To enable "Sign in with Google", you need to create a project in the Google Cloud Console and obtain credentials.

1.  **Go to Google Cloud Console**:
    *   Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
    *   Sign in with your Google account.

2.  **Create a New Project**:
    *   Click the project dropdown at the top/left.
    *   Click **New Project**.
    *   Name it "Diet Dynamos" (or similar) and click **Create**.

3.  **Configure OAuth Consent Screen**:
    *   In the left sidebar, go to **APIs & Services** > **OAuth consent screen**.
    *   Select **External** (unless you have a Google Workspace organization) and click **Create**.
    *   **App Information**: Fill in App Name ("Diet Dynamos") and User Support Email.
    *   **Developer Contact Information**: Fill in your email.
    *   Click **Save and Continue**.
    *   (Optional) You can skip "Scopes" and "Test Users" for now by clicking "Save and Continue".

4.  **Create Credentials**:
    *   Go to **APIs & Services** > **Credentials**.
    *   Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
    *   **Application Type**: Select **Web application**.
    *   **Name**: "Diet Dynamos Web Client".
    *   **Authorized JavaScript origins**:
        *   `http://localhost:5173`
    *   **Authorized redirect URIs**:
        *   `http://localhost:5000/api/auth/google/callback`
    *   Click **Create**.

5.  **Copy Your Credentials**:
    *   You will see a modal with "Your Client ID" and "Your Client Secret".
    *   Copy these strings.

6.  **Update Environment Variables**:
    *   Open your backend `.env` file: `BACKEND/.env`
    *   Add/Update the following lines:

```env
GOOGLE_CLIENT_ID=your_pasted_client_id_here
GOOGLE_CLIENT_SECRET=your_pasted_client_secret_here
```
