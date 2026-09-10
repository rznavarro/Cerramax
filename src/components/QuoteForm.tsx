import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileText,
  X,
  Send
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cerramaxData';
import { ClientType, QuoteFormData, FormErrors } from '../types';
import { Button } from './ui/Button';

interface QuoteFormProps {
  selectedClientType: ClientType;
  prefilledNeed: string;
  onClientTypeChange: (type: ClientType) => void;
  onClearPrefilledNeed: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  selectedClientType,
  prefilledNeed,
  onClientTypeChange,
  onClearPrefilledNeed
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    tipo: selectedClientType,
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    comuna: '',
    necesidad: prefilledNeed || '',
    fileName: undefined,
    fileSize: undefined,
    consentimiento: false,
    honeypot: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Sync props with state
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tipo: selectedClientType
    }));
  }, [selectedClientType]);

  useEffect(() => {
    if (prefilledNeed) {
      setFormData(prev => ({
        ...prev,
        necesidad: prefilledNeed
      }));
    }
  }, [prefilledNeed]);

  // Focus success heading on submit success
  useEffect(() => {
    if (isSuccess && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [isSuccess]);

  // Validation function
  const validateField = (name: keyof QuoteFormData, value: any): string | null => {
    if (name === 'nombre') {
      if (!value || value.trim().length < 2) {
        return 'Escribe tu nombre para saber con quién hablamos.';
      }
    }
    if (name === 'empresa' && formData.tipo !== 'hogar') {
      if (!value || value.trim().length < 2) {
        return 'Escribe el nombre de tu empresa o constructora.';
      }
    }
    if (name === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        return 'Revisa el correo: falta el @ o el dominio (ej: nombre@empresa.cl).';
      }
    }
    if (name === 'telefono') {
      // Chilean phone validation: 9 digits, accepts spaces, +56
      const clean = value.replace(/[\s+-]/g, '');
      const isChilean = /^(\+?56)?9\d{8}$/.test(clean) || /^9\d{8}$/.test(clean);
      if (!value || !isChilean) {
        return 'Escribe un número chileno de 9 dígitos, por ejemplo 9 1234 5678.';
      }
    }
    if (name === 'comuna') {
      if (!value || value.trim().length < 2) {
        return 'Escribe tu comuna para calcular el despacho.';
      }
    }
    if (name === 'necesidad') {
      if (!value || value.trim().length < 10) {
        return 'Cuéntanos qué productos o cantidades necesitas (mínimo 10 caracteres).';
      }
    }
    if (name === 'consentimiento') {
      if (!value) {
        return 'Marca la casilla para poder enviarte la cotización.';
      }
    }
    return null;
  };

  const handleBlur = (field: keyof QuoteFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => {
      const updated = { ...prev };
      if (error) {
        updated[field] = error;
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const handleChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => {
        const updated = { ...prev };
        if (error) {
          updated[field] = error;
        } else {
          delete updated[field];
        }
        return updated;
      });
    }
  };

  const handleClientTypeSelect = (tipo: ClientType) => {
    onClientTypeChange(tipo);
    handleChange('tipo', tipo);
  };

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension
    const allowedExtensions = ['pdf', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'png'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setErrors(prev => ({
        ...prev,
        archivo: 'Este formato no se puede adjuntar. Usa PDF, Excel, JPG o PNG.'
      }));
      return;
    }

    // Check size <= 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        archivo: 'El archivo pesa más de 10 MB. Adjunta uno más liviano o envíalo por WhatsApp.'
      }));
      return;
    }

    // Clear error and set metadata
    setErrors(prev => {
      const updated = { ...prev };
      delete updated.archivo;
      return updated;
    });

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: `${sizeMb} MB`
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      fileName: undefined,
      fileSize: undefined
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Check honeypot spam bot
    if (formData.honeypot) {
      console.warn('Bot submission blocked');
      return;
    }

    // Validate all fields
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof QuoteFormData)[] = [
      'nombre',
      'correo',
      'telefono',
      'comuna',
      'necesidad',
      'consentimiento'
    ];

    if (formData.tipo !== 'hogar') {
      fieldsToValidate.push('empresa');
    }

    fieldsToValidate.forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
      }
    });

    setErrors(newErrors);
    setTouched({
      nombre: true,
      empresa: true,
      correo: true,
      telefono: true,
      comuna: true,
      necesidad: true,
      consentimiento: true
    });

    if (Object.keys(newErrors).length > 0) {
      // Focus error summary
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    // Simulate submission with upload progress
    setIsSubmitting(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          setIsSuccess(true);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleResetForm = () => {
    setFormData({
      tipo: 'constructora',
      nombre: '',
      empresa: '',
      correo: '',
      telefono: '',
      comuna: '',
      necesidad: '',
      fileName: undefined,
      fileSize: undefined,
      consentimiento: false,
      honeypot: ''
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    onClearPrefilledNeed();
  };

  const truncateMiddle = (text: string, maxLength: number = 24) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 12);
    const end = text.slice(-8);
    return `${start}…${end}`;
  };

  return (
    <section
      id="cotizar"
      aria-labelledby="cotizar-heading"
      className="bg-white py-16 lg:py-24 border-b border-[#DDE0E4]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Contenedor Dual-Panel (12 columnas) */}
        <div className="rounded-[4px] border border-[#DDE0E4] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Panel Izquierdo Oscuro (4 columnas en desktop) */}
          <div className="lg:col-span-4 bg-[#1C1E22] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#26292E]">
            <div>
              {/* Título y tiempo de compromiso */}
              <h2
                id="cotizar-heading"
                tabIndex={-1}
                className="text-white font-bold text-2xl sm:text-3xl leading-[1.15] tracking-tight focus:outline-hidden"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontStretch: '110%'
                }}
              >
                Solicita tu cotización
              </h2>
              
              <p className="mt-3 text-[#B4BAC2] text-sm sm:text-base leading-relaxed">
                Respondemos en menos de 24 horas hábiles con cubicación técnica y precios por volumen.
              </p>

              {/* Lista de contacto con insignias */}
              <div className="mt-8 space-y-5">
                {/* Teléfono */}
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#26292E] text-[#FFC400] flex items-center justify-center shrink-0 group-hover:bg-[#FFC400] group-hover:text-[#1C1E22] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#B4BAC2] font-medium">Llámanos directo</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FFC400] transition-colors font-tabular">
                      {CONTACT_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#26292E] text-[#FFC400] flex items-center justify-center shrink-0 group-hover:bg-[#FFC400] group-hover:text-[#1C1E22] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#B4BAC2] font-medium">WhatsApp de ventas</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FFC400] transition-colors font-tabular">
                      {CONTACT_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* Correo */}
                <a
                  href={CONTACT_INFO.emailHref}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#26292E] text-[#FFC400] flex items-center justify-center shrink-0 group-hover:bg-[#FFC400] group-hover:text-[#1C1E22] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#B4BAC2] font-medium">Correo electrónico</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#FFC400] transition-colors">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Dirección y Horario */}
                <div className="flex items-start gap-3.5 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#26292E] text-[#FFC400] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#B4BAC2] font-medium">Bodega y showroom</div>
                    <div className="text-sm font-bold text-white">
                      {CONTACT_INFO.address}
                    </div>
                    <div className="text-xs text-[#B4BAC2] mt-0.5">
                      {CONTACT_INFO.schedule}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Microconfianza legal al fondo del panel oscuro */}
            <div className="mt-8 pt-6 border-t border-[#26292E] text-xs text-[#B4BAC2]">
              <p>
                Razón Social: <span className="text-white font-medium">{CONTACT_INFO.legalName}</span>. Facturación inmediata para faenas y proyectos.
              </p>
            </div>
          </div>

          {/* Panel Derecho: Formulario / Mensaje de Éxito (8 columnas en desktop) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 lg:p-10">
            
            {isSuccess ? (
              /* Estado de Éxito */
              <div
                className="py-12 px-4 flex flex-col items-center text-center max-w-lg mx-auto animate-in fade-in duration-200"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E7F3C]/10 text-[#1E7F3C] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                </div>

                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="text-2xl sm:text-3xl font-bold text-[#1C1E22] tracking-tight focus:outline-hidden"
                  style={{ fontStretch: '105%' }}
                >
                  Recibimos tu solicitud
                </h3>

                <p className="mt-3 text-[#5E656E] text-base leading-relaxed">
                  Te enviaremos la cotización detallada a <strong className="text-[#1C1E22]">{formData.correo}</strong> en menos de 24 horas hábiles.
                </p>

                {formData.fileName && (
                  <p className="mt-2 text-xs text-[#5E656E] bg-[#F2F3F5] px-3 py-1.5 rounded-[2px]">
                    Archivo adjuntado correctamente: {formData.fileName}
                  </p>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                  <Button
                    label="Enviar otra solicitud"
                    onClick={handleResetForm}
                    variant="secondary-light"
                    size="md"
                  />
                  <Button
                    label="Escribir por WhatsApp"
                    href={CONTACT_INFO.whatsappHref}
                    variant="primary"
                    size="md"
                    icon={<MessageSquare className="w-4 h-4" />}
                  />
                </div>
              </div>
            ) : (
              /* Formulario Activo */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Resumen de errores superior si se intentó enviar inválido */}
                {Object.keys(errors).length > 0 && (
                  <div
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="p-4 rounded-[2px] bg-[#C5221F]/10 border-l-4 border-[#C5221F] text-[#C5221F] text-sm focus:outline-hidden"
                  >
                    <div className="font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Revisa {Object.keys(errors).length} campos para enviar tu solicitud:</span>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-xs space-y-1 text-[#1C1E22]">
                      {Object.entries(errors).map(([key, msg]) => (
                        <li key={key}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mensaje de error de servidor si existiera */}
                {serverError && (
                  <div className="p-4 rounded-[2px] bg-[#C5221F]/10 border-l-4 border-[#C5221F] text-[#C5221F] text-sm">
                    {serverError}
                  </div>
                )}

                {/* 1. Tipo de Cliente (Segmented Radio Group, ancho completo) */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="text-sm font-semibold text-[#1C1E22] mb-2 flex items-center justify-between">
                    <span>Tipo de cliente <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span></span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'constructora', label: 'Constructora o contratista' },
                      { id: 'administracion', label: 'Administración de edificios' },
                      { id: 'hogar', label: 'Hogar o pyme' }
                    ].map((opt) => {
                      const isSelected = formData.tipo === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleClientTypeSelect(opt.id as ClientType)}
                          className={`h-12 px-3 text-xs sm:text-[0.8125rem] font-bold rounded-[2px] border transition-all text-center flex items-center justify-center leading-snug cursor-pointer ${
                            isSelected
                              ? 'bg-[#1C1E22] text-white border-[#1C1E22] shadow-2xs'
                              : 'bg-white text-[#5E656E] border-[#DDE0E4] hover:border-[#1C1E22] hover:text-[#1C1E22]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Grilla de 2 columnas para campos personales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Nombre y apellido */}
                  <div>
                    <label
                      htmlFor="form-nombre"
                      className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                    >
                      Nombre y apellido <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                    </label>
                    <input
                      id="form-nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.nombre}
                      disabled={isSubmitting}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      onBlur={() => handleBlur('nombre')}
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                      className={`w-full h-12 px-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                        errors.nombre
                          ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                          : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                      } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                    />
                    {errors.nombre && (
                      <p id="error-nombre" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.nombre}</span>
                      </p>
                    )}
                  </div>

                  {/* Empresa (Oculto dinámicamente si es hogar) */}
                  {formData.tipo !== 'hogar' ? (
                    <div className="animate-in fade-in duration-200">
                      <label
                        htmlFor="form-empresa"
                        className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                      >
                        Empresa o constructora <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                      </label>
                      <input
                        id="form-empresa"
                        name="empresa"
                        type="text"
                        autoComplete="organization"
                        required
                        value={formData.empresa}
                        disabled={isSubmitting}
                        onChange={(e) => handleChange('empresa', e.target.value)}
                        onBlur={() => handleBlur('empresa')}
                        aria-invalid={!!errors.empresa}
                        aria-describedby={errors.empresa ? 'error-empresa' : undefined}
                        className={`w-full h-12 px-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                          errors.empresa
                            ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                            : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                        } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                      />
                      {errors.empresa && (
                        <p id="error-empresa" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.empresa}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="form-empresa-opc"
                        className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                      >
                        Negocio o profesión <span className="text-xs font-normal text-[#5E656E]">(opcional)</span>
                      </label>
                      <input
                        id="form-empresa-opc"
                        name="empresa"
                        type="text"
                        placeholder="Ej: Taller, oficina o particular"
                        value={formData.empresa}
                        disabled={isSubmitting}
                        onChange={(e) => handleChange('empresa', e.target.value)}
                        className="w-full h-12 px-3.5 text-sm bg-white border border-[#DDE0E4] focus:border-[#1C1E22] rounded-[2px] text-[#1C1E22]"
                      />
                    </div>
                  )}

                  {/* Correo electrónico */}
                  <div>
                    <label
                      htmlFor="form-correo"
                      className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                    >
                      Correo electrónico <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                    </label>
                    <input
                      id="form-correo"
                      name="correo"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="nombre@empresa.cl"
                      value={formData.correo}
                      disabled={isSubmitting}
                      onChange={(e) => handleChange('correo', e.target.value)}
                      onBlur={() => handleBlur('correo')}
                      aria-invalid={!!errors.correo}
                      aria-describedby={errors.correo ? 'error-correo' : undefined}
                      className={`w-full h-12 px-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                        errors.correo
                          ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                          : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                      } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                    />
                    {errors.correo && (
                      <p id="error-correo" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.correo}</span>
                      </p>
                    )}
                  </div>

                  {/* Teléfono o WhatsApp */}
                  <div>
                    <label
                      htmlFor="form-telefono"
                      className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                    >
                      Teléfono o WhatsApp <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                    </label>
                    <input
                      id="form-telefono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="9 1234 5678"
                      value={formData.telefono}
                      disabled={isSubmitting}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                      onBlur={() => handleBlur('telefono')}
                      aria-invalid={!!errors.telefono}
                      aria-describedby={errors.telefono ? 'error-telefono' : 'ayuda-telefono'}
                      className={`w-full h-12 px-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                        errors.telefono
                          ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                          : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                      } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                    />
                    {errors.telefono ? (
                      <p id="error-telefono" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.telefono}</span>
                      </p>
                    ) : (
                      <p id="ayuda-telefono" className="mt-1 text-xs text-[#5E656E]">
                        Te podemos contactar por WhatsApp.
                      </p>
                    )}
                  </div>

                </div>

                {/* Comuna (ancho completo) */}
                <div>
                  <label
                    htmlFor="form-comuna"
                    className="block text-sm font-semibold text-[#1C1E22] mb-1.5"
                  >
                    Comuna de entrega o instalación <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                  </label>
                  <input
                    id="form-comuna"
                    name="comuna"
                    type="text"
                    autoComplete="address-level2"
                    required
                    placeholder="Ej: Santiago, Las Condes, Concepción, Antofagasta"
                    value={formData.comuna}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('comuna', e.target.value)}
                    onBlur={() => handleBlur('comuna')}
                    aria-invalid={!!errors.comuna}
                    aria-describedby={errors.comuna ? 'error-comuna' : undefined}
                    className={`w-full h-12 px-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                      errors.comuna
                        ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                        : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                    } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                  />
                  {errors.comuna && (
                    <p id="error-comuna" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.comuna}</span>
                    </p>
                  )}
                </div>

                {/* ¿Qué necesitas? (Textarea con contador a partir de 800 caracteres) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="form-necesidad"
                      className="block text-sm font-semibold text-[#1C1E22]"
                    >
                      ¿Qué necesitas cotizar? <span className="text-xs font-normal text-[#5E656E]">(obligatorio)</span>
                    </label>
                    {formData.necesidad.length >= 800 && (
                      <span className="text-xs text-[#5E656E] font-tabular">
                        {formData.necesidad.length} / 1000
                      </span>
                    )}
                  </div>
                  <textarea
                    id="form-necesidad"
                    name="necesidad"
                    rows={4}
                    required
                    maxLength={1000}
                    placeholder="Ej: 40 cerraduras de embutir para departamentos, cilindros con llave maestra y 4 barras antipánico para salidas de emergencia."
                    value={formData.necesidad}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('necesidad', e.target.value)}
                    onBlur={() => handleBlur('necesidad')}
                    aria-invalid={!!errors.necesidad}
                    aria-describedby={errors.necesidad ? 'error-necesidad' : undefined}
                    className={`w-full p-3.5 text-sm bg-white border rounded-[2px] transition-colors focus:ring-0 focus:outline-hidden ${
                      errors.necesidad
                        ? 'border-[#C5221F] focus:border-[#C5221F] shadow-[inset_0_0_0_1px_#C5221F]'
                        : 'border-[#DDE0E4] focus:border-[#1C1E22] focus:shadow-[inset_0_0_0_1px_#1C1E22]'
                    } ${isSubmitting ? 'bg-[#F2F3F5] text-[#5E656E]' : 'text-[#1C1E22]'}`}
                  />
                  {errors.necesidad && (
                    <p id="error-necesidad" className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.necesidad}</span>
                    </p>
                  )}
                </div>

                {/* Adjunto de Lista o Planos (Opcional, acelera cotización) */}
                <div>
                  <span className="block text-sm font-semibold text-[#1C1E22] mb-1.5">
                    Lista de herrajes o planos <span className="text-xs font-normal text-[#5E656E]">(opcional)</span>
                  </span>

                  <input
                    ref={fileInputRef}
                    id="form-file"
                    type="file"
                    accept=".pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {formData.fileName ? (
                    <div className="flex items-center justify-between p-3.5 bg-[#F2F3F5] border border-[#DDE0E4] rounded-[2px]">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-[#1C1E22] shrink-0" />
                        <div className="text-xs truncate">
                          <span className="font-semibold text-[#1C1E22] block truncate">
                            {truncateMiddle(formData.fileName, 30)}
                          </span>
                          <span className="text-[#5E656E]">{formData.fileSize}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-xs font-semibold text-[#C5221F] hover:underline shrink-0 p-1 flex items-center gap-1 cursor-pointer"
                        aria-label="Quitar archivo adjunto"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Quitar</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#DDE0E4] hover:border-[#1C1E22] p-4 rounded-[2px] flex items-center justify-center gap-3 cursor-pointer bg-[#F2F3F5]/40 hover:bg-[#F2F3F5] transition-colors text-center"
                    >
                      <UploadCloud className="w-5 h-5 text-[#5E656E]" />
                      <div className="text-xs text-[#5E656E]">
                        <span className="font-bold text-[#1C1E22] underline underline-offset-2">Adjuntar planilla o plano</span> (PDF, Excel, JPG, hasta 10 MB)
                      </div>
                    </div>
                  )}

                  {errors.archivo && (
                    <p className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.archivo}</span>
                    </p>
                  )}
                </div>

                {/* Consentimiento Legal */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="consentimiento"
                      required
                      checked={formData.consentimiento}
                      disabled={isSubmitting}
                      onChange={(e) => handleChange('consentimiento', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded-[2px] border-[#DDE0E4] text-[#1C1E22] focus:ring-[#1C1E22]"
                    />
                    <span className="text-xs text-[#5E656E] leading-relaxed">
                      Acepto que Cerramax use mis datos para responder esta solicitud y coordinar la cotización comercial.
                    </span>
                  </label>
                  {errors.consentimiento && (
                    <p className="mt-1 text-xs text-[#C5221F] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.consentimiento}</span>
                    </p>
                  )}
                </div>

                {/* Campo Trampa Honeypot oculto para bots */}
                <input
                  type="text"
                  name="website_source"
                  value={formData.honeypot}
                  onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Barra de progreso de subida si se adjuntó archivo y está enviando */}
                {isSubmitting && formData.fileName && (
                  <div className="w-full bg-[#DDE0E4] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FFC400] h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                {/* Botón de envío */}
                <div className="pt-2">
                  <Button
                    id="btn-enviar-cotizacion"
                    label={isSubmitting ? 'Enviando solicitud…' : 'Enviar solicitud de cotización'}
                    type="submit"
                    loading={isSubmitting}
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="sm:w-auto"
                    icon={<Send className="w-4 h-4" />}
                  />

                  <div className="mt-3 text-xs text-[#5E656E]">
                    ¿Prefieres hablar ahora?{' '}
                    <a
                      href={CONTACT_INFO.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1C1E22] underline underline-offset-2 hover:text-black"
                    >
                      Escríbenos directamente por WhatsApp
                    </a>
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
