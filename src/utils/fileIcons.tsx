/**
 * Professional File Type Icon System
 * Uses react-icons for real Microsoft Office, Adobe, and brand icons
 */

import type { IconType } from 'react-icons';

// Font Awesome - Professional file icons
import { 
  FaFileWord, 
  FaFileExcel, 
  FaFilePowerpoint,
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFileCode,
  FaFileAlt,
  FaFile
} from 'react-icons/fa';

// Simple Icons - Brand logos (Microsoft, Adobe, etc.)
import { 
  SiFigma,
  SiSketch,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiHtml5,
  SiPhp,
  SiRuby,
  SiGo,
  SiRust,
  SiSwift,
  SiKotlin,
  SiCplusplus,
  SiJson,
  SiDocker,
  SiGit
} from 'react-icons/si';

// VSCode Icons - File type specific
import { 
  VscFilePdf,
  VscFileMedia,
  VscFileZip,
  VscJson,
  VscCode
} from 'react-icons/vsc';

export interface FileTypeIcon {
  extension: string;
  icon: IconType;
  color: string;
  category: 'document' | 'spreadsheet' | 'presentation' | 'image' | 'video' | 'audio' | 'code' | 'archive' | 'other';
  brandIcon?: IconType; // Optional brand logo (appears as badge)
  label?: string; // Display label (e.g., "Microsoft Word")
}

export const FILE_ICONS: Record<string, FileTypeIcon> = {
  // ==================== MICROSOFT OFFICE ====================
  'doc': { 
    extension: 'doc', 
    icon: FaFileWord, 
    color: '#2b579a', 
    category: 'document',
    label: 'Microsoft Word'
  },
  'docx': { 
    extension: 'docx', 
    icon: FaFileWord,
    color: '#2b579a', 
    category: 'document',
    label: 'Microsoft Word'
  },
  
  'xls': { 
    extension: 'xls', 
    icon: FaFileExcel, 
    color: '#207245', 
    category: 'spreadsheet',
    label: 'Microsoft Excel'
  },
  'xlsx': { 
    extension: 'xlsx', 
    icon: FaFileExcel, 
    color: '#207245', 
    category: 'spreadsheet',
    label: 'Microsoft Excel'
  },
  'csv': { 
    extension: 'csv', 
    icon: FaFileExcel, 
    color: '#207245', 
    category: 'spreadsheet',
    label: 'CSV Spreadsheet'
  },
  
  'ppt': { 
    extension: 'ppt', 
    icon: FaFilePowerpoint, 
    color: '#d24726', 
    category: 'presentation',
    label: 'Microsoft PowerPoint'
  },
  'pptx': { 
    extension: 'pptx', 
    icon: FaFilePowerpoint, 
    color: '#d24726', 
    category: 'presentation',
    label: 'Microsoft PowerPoint'
  },
  
  // ==================== DOCUMENTS ====================
  'pdf': { 
    extension: 'pdf', 
    icon: FaFilePdf, 
    color: '#d32f2f', 
    category: 'document',
    label: 'PDF Document'
  },
  'txt': { 
    extension: 'txt', 
    icon: FaFileAlt, 
    color: '#757575', 
    category: 'document',
    label: 'Text File'
  },
  'rtf': { 
    extension: 'rtf', 
    icon: FaFileAlt, 
    color: '#757575', 
    category: 'document',
    label: 'Rich Text'
  },
  'md': { 
    extension: 'md', 
    icon: FaFileAlt, 
    color: '#083fa1', 
    category: 'document',
    label: 'Markdown'
  },
  'odt': { 
    extension: 'odt', 
    icon: FaFileWord, 
    color: '#2b579a', 
    category: 'document',
    label: 'OpenDocument'
  },
  'ods': { 
    extension: 'ods', 
    icon: FaFileExcel, 
    color: '#207245', 
    category: 'spreadsheet',
    label: 'OpenDocument Spreadsheet'
  },
  'odp': { 
    extension: 'odp', 
    icon: FaFilePowerpoint, 
    color: '#d24726', 
    category: 'presentation',
    label: 'OpenDocument Presentation'
  },
  
  // ==================== IMAGES ====================
  'jpg': { 
    extension: 'jpg', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'JPEG Image'
  },
  'jpeg': { 
    extension: 'jpeg', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'JPEG Image'
  },
  'png': { 
    extension: 'png', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'PNG Image'
  },
  'gif': { 
    extension: 'gif', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'GIF Animation'
  },
  'bmp': { 
    extension: 'bmp', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'Bitmap Image'
  },
  'svg': { 
    extension: 'svg', 
    icon: FaFileImage, 
    color: '#ff9800', 
    category: 'image',
    label: 'SVG Vector'
  },
  'webp': { 
    extension: 'webp', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'WebP Image'
  },
  'ico': { 
    extension: 'ico', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'Icon File'
  },
  'tiff': { 
    extension: 'tiff', 
    icon: FaFileImage, 
    color: '#7b1fa2', 
    category: 'image',
    label: 'TIFF Image'
  },
  
  // Adobe Creative Suite
  'psd': { 
    extension: 'psd', 
    icon: FaFileImage, 
    color: '#001e36', 
    category: 'image',
    label: 'Adobe Photoshop'
  },
  'ai': { 
    extension: 'ai', 
    icon: FaFileImage, 
    color: '#ff9a00', 
    category: 'image',
    label: 'Adobe Illustrator'
  },
  
  // Design Tools
  'fig': { 
    extension: 'fig', 
    icon: FaFileImage, 
    brandIcon: SiFigma,
    color: '#f24e1e', 
    category: 'image',
    label: 'Figma'
  },
  'sketch': { 
    extension: 'sketch', 
    icon: FaFileImage, 
    brandIcon: SiSketch,
    color: '#f7b500', 
    category: 'image',
    label: 'Sketch'
  },
  
  // ==================== VIDEOS ====================
  'mp4': { 
    extension: 'mp4', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'MP4 Video'
  },
  'avi': { 
    extension: 'avi', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'AVI Video'
  },
  'mov': { 
    extension: 'mov', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'QuickTime Video'
  },
  'wmv': { 
    extension: 'wmv', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'Windows Media Video'
  },
  'flv': { 
    extension: 'flv', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'Flash Video'
  },
  'mkv': { 
    extension: 'mkv', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'Matroska Video'
  },
  'webm': { 
    extension: 'webm', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'WebM Video'
  },
  'mpeg': { 
    extension: 'mpeg', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'MPEG Video'
  },
  'mpg': { 
    extension: 'mpg', 
    icon: FaFileVideo, 
    color: '#c62828', 
    category: 'video',
    label: 'MPEG Video'
  },
  
  // ==================== AUDIO ====================
  'mp3': { 
    extension: 'mp3', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'MP3 Audio'
  },
  'wav': { 
    extension: 'wav', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'WAV Audio'
  },
  'ogg': { 
    extension: 'ogg', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'OGG Audio'
  },
  'flac': { 
    extension: 'flac', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'FLAC Audio'
  },
  'aac': { 
    extension: 'aac', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'AAC Audio'
  },
  'm4a': { 
    extension: 'm4a', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'M4A Audio'
  },
  'wma': { 
    extension: 'wma', 
    icon: FaFileAudio, 
    color: '#f57c00', 
    category: 'audio',
    label: 'Windows Media Audio'
  },
  
  // ==================== CODE FILES ====================
  // JavaScript/TypeScript
  'js': { 
    extension: 'js', 
    icon: FaFileCode, 
    brandIcon: SiJavascript,
    color: '#f7df1e', 
    category: 'code',
    label: 'JavaScript'
  },
  'jsx': { 
    extension: 'jsx', 
    icon: FaFileCode, 
    brandIcon: SiReact,
    color: '#61dafb', 
    category: 'code',
    label: 'React JSX'
  },
  'ts': { 
    extension: 'ts', 
    icon: FaFileCode, 
    brandIcon: SiTypescript,
    color: '#3178c6', 
    category: 'code',
    label: 'TypeScript'
  },
  'tsx': { 
    extension: 'tsx', 
    icon: FaFileCode, 
    brandIcon: SiReact,
    color: '#3178c6', 
    category: 'code',
    label: 'React TypeScript'
  },
  
  // Other Languages
  'py': { 
    extension: 'py', 
    icon: FaFileCode, 
    brandIcon: SiPython,
    color: '#3776ab', 
    category: 'code',
    label: 'Python'
  },
  'java': { 
    extension: 'java', 
    icon: FaFileCode, 
    color: '#007396', 
    category: 'code',
    label: 'Java'
  },
  'c': { 
    extension: 'c', 
    icon: FaFileCode, 
    color: '#a8b9cc', 
    category: 'code',
    label: 'C'
  },
  'cpp': { 
    extension: 'cpp', 
    icon: FaFileCode, 
    brandIcon: SiCplusplus,
    color: '#00599c', 
    category: 'code',
    label: 'C++'
  },
  'cs': { 
    extension: 'cs', 
    icon: FaFileCode, 
    color: '#239120', 
    category: 'code',
    label: 'C#'
  },
  'go': { 
    extension: 'go', 
    icon: FaFileCode, 
    brandIcon: SiGo,
    color: '#00add8', 
    category: 'code',
    label: 'Go'
  },
  'rs': { 
    extension: 'rs', 
    icon: FaFileCode, 
    brandIcon: SiRust,
    color: '#dea584', 
    category: 'code',
    label: 'Rust'
  },
  'php': { 
    extension: 'php', 
    icon: FaFileCode, 
    brandIcon: SiPhp,
    color: '#777bb4', 
    category: 'code',
    label: 'PHP'
  },
  'rb': { 
    extension: 'rb', 
    icon: FaFileCode, 
    brandIcon: SiRuby,
    color: '#cc342d', 
    category: 'code',
    label: 'Ruby'
  },
  'swift': { 
    extension: 'swift', 
    icon: FaFileCode, 
    brandIcon: SiSwift,
    color: '#fa7343', 
    category: 'code',
    label: 'Swift'
  },
  'kt': { 
    extension: 'kt', 
    icon: FaFileCode, 
    brandIcon: SiKotlin,
    color: '#7f52ff', 
    category: 'code',
    label: 'Kotlin'
  },
  
  // Web Files
  'html': { 
    extension: 'html', 
    icon: FaFileCode, 
    brandIcon: SiHtml5,
    color: '#e34f26', 
    category: 'code',
    label: 'HTML'
  },
  'css': { 
    extension: 'css', 
    icon: FaFileCode, 
    color: '#1572b6', 
    category: 'code',
    label: 'CSS'
  },
  'scss': { 
    extension: 'scss', 
    icon: FaFileCode, 
    color: '#cc6699', 
    category: 'code',
    label: 'SCSS'
  },
  'sass': { 
    extension: 'sass', 
    icon: FaFileCode, 
    color: '#cc6699', 
    category: 'code',
    label: 'Sass'
  },
  'less': { 
    extension: 'less', 
    icon: FaFileCode, 
    color: '#1d365d', 
    category: 'code',
    label: 'Less'
  },
  'vue': { 
    extension: 'vue', 
    icon: FaFileCode, 
    brandIcon: SiVuedotjs,
    color: '#42b883', 
    category: 'code',
    label: 'Vue.js'
  },
  
  // Data Files
  'json': { 
    extension: 'json', 
    icon: VscJson, 
    brandIcon: SiJson,
    color: '#000000', 
    category: 'code',
    label: 'JSON'
  },
  'xml': { 
    extension: 'xml', 
    icon: FaFileCode, 
    color: '#ff6600', 
    category: 'code',
    label: 'XML'
  },
  'yaml': { 
    extension: 'yaml', 
    icon: FaFileCode, 
    color: '#cb171e', 
    category: 'code',
    label: 'YAML'
  },
  'yml': { 
    extension: 'yml', 
    icon: FaFileCode, 
    color: '#cb171e', 
    category: 'code',
    label: 'YAML'
  },
  
  // ==================== ARCHIVES ====================
  'zip': { 
    extension: 'zip', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: 'ZIP Archive'
  },
  'rar': { 
    extension: 'rar', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: 'RAR Archive'
  },
  '7z': { 
    extension: '7z', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: '7-Zip Archive'
  },
  'tar': { 
    extension: 'tar', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: 'TAR Archive'
  },
  'gz': { 
    extension: 'gz', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: 'GZIP Archive'
  },
  'bz2': { 
    extension: 'bz2', 
    icon: FaFileArchive, 
    color: '#ffab00', 
    category: 'archive',
    label: 'BZ2 Archive'
  },
  
  // ==================== OTHER ====================
  'exe': { 
    extension: 'exe', 
    icon: FaFile, 
    color: '#424242', 
    category: 'other',
    label: 'Windows Executable'
  },
  'apk': { 
    extension: 'apk', 
    icon: FaFile, 
    color: '#3ddc84', 
    category: 'other',
    label: 'Android App'
  },
  'dmg': { 
    extension: 'dmg', 
    icon: FaFile, 
    color: '#000000', 
    category: 'other',
    label: 'Mac Disk Image'
  },
  'iso': { 
    extension: 'iso', 
    icon: FaFile, 
    color: '#ffab00', 
    category: 'other',
    label: 'ISO Disk Image'
  },
  'sql': { 
    extension: 'sql', 
    icon: FaFileCode, 
    color: '#00618a', 
    category: 'other',
    label: 'SQL Database'
  },
  'db': { 
    extension: 'db', 
    icon: FaFile, 
    color: '#00618a', 
    category: 'other',
    label: 'Database File'
  },
  'log': { 
    extension: 'log', 
    icon: FaFileAlt, 
    color: '#757575', 
    category: 'other',
    label: 'Log File'
  },
  'env': { 
    extension: 'env', 
    icon: FaFileCode, 
    color: '#efc94c', 
    category: 'other',
    label: 'Environment File'
  },
  'gitignore': { 
    extension: 'gitignore', 
    icon: FaFileCode, 
    brandIcon: SiGit,
    color: '#f05032', 
    category: 'other',
    label: 'Git Ignore'
  },
  'dockerfile': { 
    extension: 'dockerfile', 
    icon: FaFileCode, 
    brandIcon: SiDocker,
    color: '#2496ed', 
    category: 'other',
    label: 'Docker File'
  },
} as const;

// Default icon for unknown file types
export const DEFAULT_FILE_ICON: FileTypeIcon = {
  extension: 'unknown',
  icon: FaFile,
  color: '#9e9e9e',
  category: 'other',
  label: 'Unknown File'
};

/**
 * Get file icon data by filename
 * @param filename - Full filename with extension (e.g., "document.pdf")
 * @returns FileTypeIcon object with icon component, color, and metadata
 */
export function getFileIcon(filename: string): FileTypeIcon {
  if (!filename) return DEFAULT_FILE_ICON;
  
  // Extract extension (handle multiple dots, e.g., "archive.tar.gz")
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  
  return FILE_ICONS[ext] || DEFAULT_FILE_ICON;
}

/**
 * Get file color for styling
 * @param filename - Full filename with extension
 * @returns Hex color string
 */
export function getFileColor(filename: string): string {
  return getFileIcon(filename).color;
}

/**
 * Get file category for filtering
 * @param filename - Full filename with extension
 * @returns Category string
 */
export function getFileCategory(filename: string): FileTypeIcon['category'] {
  return getFileIcon(filename).category;
}

/**
 * Check if file is an image
 */
export function isImageFile(filename: string): boolean {
  return getFileCategory(filename) === 'image';
}

/**
 * Check if file is a video
 */
export function isVideoFile(filename: string): boolean {
  return getFileCategory(filename) === 'video';
}

/**
 * Check if file is code
 */
export function isCodeFile(filename: string): boolean {
  return getFileCategory(filename) === 'code';
}

/**
 * Get all supported extensions
 */
export function getSupportedExtensions(): string[] {
  return Object.keys(FILE_ICONS);
}

/**
 * Get extensions by category
 */
export function getExtensionsByCategory(
  category: FileTypeIcon['category']
): string[] {
  return Object.entries(FILE_ICONS)
    .filter(([_, icon]) => icon.category === category)
    .map(([ext]) => ext);
}