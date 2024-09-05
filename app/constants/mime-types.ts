export const MIME_TYPES = {
  image: {
    JPEG: "image/jpeg",
    PNG: "image/png",
    GIF: "image/gif",
    BMP: "image/bmp",
    WebP: "image/webp",
    SVG: "image/svg+xml",
    ICO: "image/vnd.microsoft.icon",
    TIFF: "image/tiff",
  },
  audio: {
    MP3: "audio/mpeg",
    WAV: "audio/wav",
    OGG: "audio/ogg",
    MIDI: "audio/midi",
    AAC: "audio/aac",
    FLAC: "audio/flac",
    WebM: "audio/webm",
    Opus: "audio/opus",
  },
  video: {
    MP4: "video/mp4",
    WebM: "video/webm",
    OGG: "video/ogg",
    AVI: "video/x-msvideo",
    MPEG: "video/mpeg",
    "3GP": "video/3gpp",
    QuickTime: "video/quicktime",
    FLV: "video/x-flv",
    MKV: "video/x-matroska",
  },
  application: {
    PDF: "application/pdf",
    Flash: "application/x-shockwave-flash",
    MP4: "application/mp4",
    M3U8: "application/vnd.apple.mpegurl",
  },
  multipart: {
    MHTML: "multipart/related",
  },
} as const

export const MEDIA_FILE_TYPES: Record<string, string> = {
  // Image MIME Types
  "image/jpeg": "IMAGE",
  "image/png": "IMAGE",
  "image/gif": "IMAGE",
  "image/bmp": "IMAGE",
  "image/webp": "IMAGE",
  "image/svg+xml": "IMAGE",
  "image/vnd.microsoft.icon": "IMAGE",
  "image/tiff": "IMAGE",

  // Audio MIME Types
  "audio/mpeg": "AUDIO",
  "audio/wav": "AUDIO",
  "audio/ogg": "AUDIO",
  "audio/midi": "AUDIO",
  "audio/aac": "AUDIO",
  "audio/flac": "AUDIO",
  "audio/webm": "AUDIO",
  "audio/opus": "AUDIO",

  // Video MIME Types
  "video/mp4": "VIDEO",
  "video/webm": "VIDEO",
  "video/ogg": "VIDEO",
  "video/x-msvideo": "VIDEO",
  "video/mpeg": "VIDEO",
  "video/3gpp": "VIDEO",
  "video/quicktime": "VIDEO",
  "video/x-flv": "VIDEO",
  "video/x-matroska": "VIDEO",

  // Application MIME Types for Media Files
  "application/pdf": "APPLICATION",
  "application/x-shockwave-flash": "APPLICATION",
  "application/mp4": "APPLICATION",
  "application/vnd.apple.mpegurl": "APPLICATION",

  // Multipart MIME Types
  "multipart/related": "MULTIPART",
} as const
