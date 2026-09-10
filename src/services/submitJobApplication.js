/**
 * Job application submission boundary.
 *
 * TODO — Backend integration (do not implement in the frontend build yet):
 * When connected, submitJobApplication must:
 * - Receive multipart/form-data securely.
 * - Require server-side auth for admin access only (not for public applicants).
 * - Validate all input on the server.
 * - Validate uploaded resume extension, actual MIME type, binary signature,
 *   size, and malware status.
 * - Store resumes privately with non-guessable access controls.
 * - Protect candidate data at rest and in transit.
 * - Rate-limit and bot-protect public application submissions.
 * - Send HR a notification to hr@sbainfo.in with candidate details and either
 *   a secure resume attachment or a secure time-limited resume link.
 * - Log delivery failures without exposing candidate data.
 * - Return an honest success/failure response to the frontend.
 * - Follow applicable candidate privacy, retention, and consent requirements.
 *
 * Until then this function must NOT call a fake API, send email, upload files,
 * or persist applicant data.
 */

/**
 * @typedef {Object} JobApplicationPayload
 * @property {string} jobId
 * @property {string} jobSlug
 * @property {string} jobTitle
 * @property {string} fullName
 * @property {string} email
 * @property {string} mobile
 * @property {string} currentLocation
 * @property {string} yearsOfExperience
 * @property {string} linkedinUrl
 * @property {File|null} resumeFile — kept in memory only; not uploaded yet
 * @property {string} [coverNote]
 * @property {boolean} consent
 */

/**
 * Frontend-only stub. Does not transmit data.
 * @param {JobApplicationPayload} _formData
 * @returns {Promise<{ status: 'pending_backend'; message: string }>}
 */
export async function submitJobApplication(_formData) {
  // Intentionally no network call, no localStorage, no mailto with attachments.
  return {
    status: 'pending_backend',
    message:
      'Thank you for applying. Our hiring team will review your profile. For a faster follow-up, email your resume and the job title to hr@sbainfo.in.',
  }
}
