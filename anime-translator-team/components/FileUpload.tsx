'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image, Video, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (files: File[]) => void
  acceptedTypes?: string[]
  maxSize?: number // MB
  multiple?: boolean
  label?: string
}

export default function FileUpload({
  onFileSelect,
  acceptedTypes = ['image/*', 'video/*', 'application/pdf'],
  maxSize = 100,
  multiple = false,
  label = 'Fájlok feltöltése'
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newErrors: string[] = []
    const validFiles: File[] = []

    files.forEach(file => {
      // Méret ellenőrzés
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(`${file.name} túl nagy (max ${maxSize}MB)`)
        return
      }

      // Típus ellenőrzés
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1))
        }
        return file.type === type
      })

      if (!isValidType) {
        newErrors.push(`${file.name} nem támogatott fájltípus`)
        return
      }

      validFiles.push(file)
    })

    setErrors(newErrors)

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles
      setUploadedFiles(newFiles)
      onFileSelect(newFiles)
      
      // Szimulált upload progress
      validFiles.forEach(file => {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
        simulateUpload(file.name)
      })
    }
  }

  const simulateUpload = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }))
    }, 200)
  }

  const removeFile = (fileName: string) => {
    const newFiles = uploadedFiles.filter(file => file.name !== fileName)
    setUploadedFiles(newFiles)
    onFileSelect(newFiles)
    
    const newProgress = { ...uploadProgress }
    delete newProgress[fileName]
    setUploadProgress(newProgress)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5" />
    if (file.type.startsWith('video/')) return <Video className="w-5 h-5" />
    if (file.type === 'application/pdf') return <FileText className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  return (
    <div className="w-full">
      <label className="block text-anime-text font-medium mb-3">
        {label}
      </label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-anime-primary bg-anime-primary/10'
            : 'border-anime-primary/30 hover:border-anime-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-12 h-12 bg-anime-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6 text-anime-primary" />
          </div>
          
          <div>
            <p className="text-anime-text font-medium">
              Húzd ide a fájlokat vagy{' '}
              <span className="text-anime-primary cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                tallózd ki őket
              </span>
            </p>
            <p className="text-anime-textLight text-sm mt-1">
              Támogatott formátumok: {acceptedTypes.join(', ')}
            </p>
            <p className="text-anime-textLight text-sm">
              Maximális méret: {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-anime-text font-medium">Feltöltött fájlok:</h4>
          {uploadedFiles.map((file) => (
            <div key={file.name} className="flex items-center justify-between p-3 bg-anime-neutral/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-anime-primary">
                  {getFileIcon(file)}
                </div>
                <div>
                  <p className="text-anime-text font-medium text-sm">{file.name}</p>
                  <p className="text-anime-textLight text-xs">{formatFileSize(file.size)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Progress Bar */}
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <div className="w-20 h-2 bg-anime-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-anime-primary transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    />
                  </div>
                )}
                
                {/* Success Icon */}
                {uploadProgress[file.name] === 100 && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
