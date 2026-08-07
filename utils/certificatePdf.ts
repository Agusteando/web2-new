export type SummerCertificateProgram = 'curso' | 'clinica'

const PAGE_WIDTH = 841.89
const PAGE_HEIGHT = 595.28
const TEMPLATE_URL = '/assets/img/curso-verano/certificado-base.jpg'
const TEMPLATE_WIDTH = 2000
const TEMPLATE_HEIGHT = 1414

let templatePromise: Promise<Uint8Array> | null = null

const ascii = (value: string) => new TextEncoder().encode(value)

const concatBytes = (...chunks: Uint8Array[]) => {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0)
  const output = new Uint8Array(length)
  let offset = 0

  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.length
  }

  return output
}

const toWinAnsiSafe = (value: string) => {
  return value
    .normalize('NFC')
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^\u0000-\u00ff]/g, (character) => {
      const fallback = character.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return /^[\u0000-\u00ff]+$/.test(fallback) ? fallback : '?'
    })
}

const latin1 = (value: string) => {
  const safeValue = toWinAnsiSafe(value)
  const bytes = new Uint8Array(safeValue.length)

  for (let index = 0; index < safeValue.length; index += 1) {
    bytes[index] = safeValue.charCodeAt(index) & 0xff
  }

  return bytes
}

const escapePdfString = (value: string) => {
  return toWinAnsiSafe(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n]+/g, ' ')
}

const normalizeName = (value: string) => value.replace(/\s+/g, ' ').trim().slice(0, 90)

const estimateHelveticaBoldWidth = (value: string, fontSize: number) => {
  const normalized = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  let units = 0

  for (const character of normalized) {
    if (character === ' ') {
      units += 278
    } else if (/[ilI1.,'`]/.test(character)) {
      units += 278
    } else if (/[mwMW@%]/.test(character)) {
      units += 860
    } else if (/[A-ZÁÉÍÓÚÜÑ]/i.test(character) && character === character.toUpperCase()) {
      units += 690
    } else if (/[a-z]/i.test(character)) {
      units += 556
    } else {
      units += 556
    }
  }

  return (units / 1000) * fontSize
}

const calculateNameLayout = (name: string) => {
  const lineLeftImage = 487
  const lineRightImage = 1510
  const lineYImage = 628
  const scaleX = PAGE_WIDTH / TEMPLATE_WIDTH
  const scaleY = PAGE_HEIGHT / TEMPLATE_HEIGHT
  const targetWidth = (lineRightImage - lineLeftImage) * scaleX - 22
  const centerX = ((lineLeftImage + lineRightImage) / 2) * scaleX

  let fontSize = 25.5
  let textWidth = estimateHelveticaBoldWidth(name, fontSize)

  if (textWidth > targetWidth) {
    fontSize = Math.max(13.5, fontSize * (targetWidth / textWidth))
    textWidth = estimateHelveticaBoldWidth(name, fontSize)
  }

  return {
    fontSize: Math.round(fontSize * 100) / 100,
    x: Math.max(lineLeftImage * scaleX + 11, centerX - textWidth / 2),
    y: PAGE_HEIGHT - lineYImage * scaleY + 8.5,
  }
}

const makePdfObject = (index: number, body: Uint8Array) => {
  return concatBytes(ascii(`${index} 0 obj\n`), body, ascii('\nendobj\n'))
}

const buildCertificatePdf = (jpeg: Uint8Array, rawName: string) => {
  const name = normalizeName(rawName)
  const layout = calculateNameLayout(name)
  const escapedName = escapePdfString(name)

  const content = concatBytes(
    ascii(`q\n${PAGE_WIDTH} 0 0 ${PAGE_HEIGHT} 0 0 cm\n/Im0 Do\nQ\nBT\n/F1 ${layout.fontSize} Tf\n0.04 0.04 0.04 rg\n1 0 0 1 ${layout.x.toFixed(2)} ${layout.y.toFixed(2)} Tm\n(`),
    latin1(escapedName),
    ascii(') Tj\nET\n'),
  )

  const objects: Uint8Array[] = [
    makePdfObject(1, ascii('<< /Type /Catalog /Pages 2 0 R >>')),
    makePdfObject(2, ascii('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')),
    makePdfObject(
      3,
      ascii(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /XObject << /Im0 5 0 R >> /Font << /F1 4 0 R >> >> /Contents 6 0 R >>`,
      ),
    ),
    makePdfObject(4, ascii('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')),
    makePdfObject(
      5,
      concatBytes(
        ascii(
          `<< /Type /XObject /Subtype /Image /Width ${TEMPLATE_WIDTH} /Height ${TEMPLATE_HEIGHT} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
        ),
        jpeg,
        ascii('\nendstream'),
      ),
    ),
    makePdfObject(
      6,
      concatBytes(ascii(`<< /Length ${content.length} >>\nstream\n`), content, ascii('endstream')),
    ),
  ]

  const header = concatBytes(ascii('%PDF-1.4\n%'), new Uint8Array([0xe2, 0xe3, 0xcf, 0xd3]), ascii('\n'))
  const offsets: number[] = [0]
  let currentOffset = header.length

  for (const object of objects) {
    offsets.push(currentOffset)
    currentOffset += object.length
  }

  const xrefOffset = currentOffset
  const xref = [
    'xref',
    `0 ${objects.length + 1}`,
    '0000000000 65535 f ',
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `),
    'trailer',
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    'startxref',
    String(xrefOffset),
    '%%EOF',
    '',
  ].join('\n')

  return concatBytes(header, ...objects, ascii(xref))
}

const fetchTemplate = async () => {
  if (!templatePromise) {
    templatePromise = fetch(TEMPLATE_URL, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Certificate template unavailable')
        }
        return response.arrayBuffer()
      })
      .then((buffer) => new Uint8Array(buffer))
      .catch((error) => {
        templatePromise = null
        throw error
      })
  }

  return templatePromise
}

const slugifyName = (value: string) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export const preloadSummerCertificateTemplate = async () => {
  await fetchTemplate()
}

export const downloadSummerCertificate = async (rawName: string, program: SummerCertificateProgram) => {
  const name = normalizeName(rawName)
  if (name.length < 2) return

  const jpeg = await fetchTemplate()
  const pdf = buildCertificatePdf(jpeg, name)
  const blob = new Blob([pdf], { type: 'application/pdf' })
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const programSlug = program === 'clinica' ? 'clinica-de-futbol' : 'curso-de-verano'
  const nameSlug = slugifyName(name) || 'reconocimiento'

  link.href = objectUrl
  link.download = `reconocimiento-${programSlug}-${nameSlug}.pdf`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500)
}
