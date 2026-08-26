/**
 * Customer logos — every image in /public/logos/customers/
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
    src: `/logos/customers/${filename}`,
  }
}

/** Filenames must match files in public/logos/customers exactly (case-sensitive on Linux). */
const CUSTOMER_LOGO_FILES = [
  'Accesshealthcare.png',
  'Accord.png',
  'BHEL.png',
  'Brakes India Private Limited.png',
  'Cavinkare.png',
  'Chola.png',
  'CRN.png',
  'CUB.png',
  'Dhanalaxmi Bank.png',
  'Dvara.png',
  'Equitas Bank.png',
  'ESAF.png',
  'FICHTNER.png',
  'FIS.png',
  'Hindu.png',
  'Hyundai.png',
  'IIT.png',
  'IITM Pravartak.png',
  'Indian Express.png',
  'Keltron.png',
  'kia.png',
  'KVB.png',
  'L&T Shipbuilding.png',
  'Latentview.png',
  'Lezdo.png',
  'Movate logo.png',
  'neurealm_logo.jpg',
  'Novac.png',
  'Ntrust.jpg',
  'Ramco.png',
  'Repco Bank.png',
  'Royal Sundaram.jpg',
  'Shriram Life Insurance.png',
  'Star Health Insurance.png',
  'Straive.png',
  'TAFE.png',
  'TMB.png',
  'TNPL.png',
  'TVS supply Chain.png',
  'ViewZen Labs.png',
  'WAVE.png',
  'Wheels India limited.png',
  'williamslea.jpg',
  'Yalamanchili.png',
]

export const CUSTOMER_LOGOS = CUSTOMER_LOGO_FILES.map(entry)
