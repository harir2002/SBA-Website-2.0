/**
 * Partner logos — every image in /public/logos/partners/
 * Drop a new file in that folder and add an entry here (or ask to resync).
 */

function entry(filename) {
  const name = filename
    .replace(/\.(png|jpe?g|webp|svg)$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\blogo\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return {
    id,
    name,
    src: `/logos/partners/${filename}`,
  }
}

/** Filenames must match files in public/logos/partners exactly (case-sensitive on Linux). */
const PARTNER_LOGO_FILES = [
  'accops.png',
  'Ansible.png',
  'Autointelli.png',
  'AWS.png',
  'Azure.png',
  'Cisco-logo.jpg',
  'Commvault.png',
  'Cortex.png',
  'Dell-Logo.png',
  'Elevenlabs.png',
  'ELK.png',
  'Exagrid.png',
  'F5.png',
  'Forcepoint.png',
  'Fortinet.png',
  'google.png',
  'Hitachi.png',
  'HPE.png',
  'IBM.png',
  'Imperva_logo.jpg',
  'Infinity Labs.png',
  'Keycloak.png',
  'ManageEngine.png',
  'Mcafee.png',
  'Nagios.png',
  'NetApp.png',
  'Nutanix.png',
  'Oracle.png',
  'Paloalto.png',
  'Perpetuuit.png',
  'Radar.png',
  'Redhat.png',
  'sarvam-ai.jpg',
  'Site24x7.png',
  'Trend Micro.png',
  'Twilio.png',
  'Velx.png',
  'Virsec.png',
  'Vmware.png',
  'Zimbra.png',
  'Zoho.png',
]

export const PARTNER_LOGOS = PARTNER_LOGO_FILES.map(entry)
