import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  CheckCircle2,
  AlertCircle,
  Paperclip,
  X,
  ArrowRight,
  Send
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cerramaxData';
import { ClientType, QuoteFormData, FormErrors } from '../types';

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
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

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

  useEffect(() => {
    if (isSuccess && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [isSuccess]);

  const validateField = (name: keyof QuoteFormData, value: any): string | null => {
    if (name === 'nombre') {
      if (!value || value.trim().length < 2) {
        return 'Indica tu nombre y apellido.';
      }
    }
    if (name === 'empresa' && formData.tipo !== 'hogar') {
      if (!value || value.trim().length < 2) {
        return 'Indica tu empresa o constructora.';
      }
    }
    if (name === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        return 'Ingresa un correo electrónico válido.';
      }
    }
    if (name === 'telefono') {
      const clean = value.replace(/[\s+-]/g, '');
      const isChilean = /^(\+?56)?9\d{8}$/.test(clean) || /^9\d{8}$/.test(clean);
      if (!value || !isChilean) {
        return 'Ingresa un teléfono chileno válido (ej: 9 1234 5678).';
      }
    }
    if (name === 'comuna') {
      if (!value || value.trim().length < 2) {
        return 'Indica la comuna o ciudad de entrega.';
      }
    }
    if (name === 'necesidad') {
      if (!value || value.trim().length < 5) {
        return 'Describe brevemente qué productos o cubicación necesitas.';
      }
    }
    if (name === 'consentimiento') {
      if (!value) {
        return 'Debes aceptar el tratamiento para emitir la cotización.';
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
    setFormData(prev => ({ ...prev, tipo }));
    if (tipo === 'hogar' && errors.empresa) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.empresa;
        return updated;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        archivo: 'El archivo excede el límite máximo de 10 MB.'
      }));
      return;
    }

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: `${sizeInMB} MB`
    }));

    setErrors(prev => {
      const updated = { ...prev };
      delete updated.archivo;
      return updated;
    });
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

    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

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

    const newErrors: FormErrors = {};
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
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
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

  return (
    <section
      id="cotizar"
      aria-labelledby="cotizar-heading"
      className="bg-[#FAFAFA] py-16 sm:py-24 border-t border-b border-[#ECEEF0]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Tarjeta Principal Minimalista */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-12">
          
          {/* Cabecera limpia y centrada */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2
              id="cotizar-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#15171A]"
              style={{ fontFamily: 'var(--font-family)' }}
            >
              Solicita tu cotización
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5E656E]">
              Respondemos en menos de 24 horas hábiles con cubicación técnica y precios por volumen.
            </p>

            {/* Accesos rápidos de contacto minimalistas */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#5E656E]">
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#15171A] hover:bg-[#E5E7EB] transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>WhatsApp directo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#15171A] hover:bg-[#E5E7EB] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#15171A] hover:bg-[#E5E7EB] transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#4B5563]" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          {isSuccess ? (
            /* Estado de Éxito Minimalista */
            <div
              className="py-8 px-4 flex flex-col items-center text-center animate-in fade-in duration-200"
              aria-live="polite"
            >
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#16A34A] flex items-center justify-center mb-4 border border-[#A7F3D0]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3
                ref={successHeadingRef}
                tabIndex={-1}
                className="text-xl sm:text-2xl font-bold text-[#15171A] tracking-tight focus:outline-hidden"
              >
                Solicitud enviada con éxito
              </h3>

              <p className="mt-2 text-sm text-[#5E656E] max-w-md">
                Hemos recibido tu requerimiento. Enviaremos la propuesta técnica y comercial a <strong className="text-[#15171A]">{formData.correo}</strong> en menos de 24 horas hábiles.
              </p>

              {formData.fileName && (
                <div className="mt-3 text-xs text-[#5E656E] bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1 rounded-md">
                  Archivo adjunto: <span className="font-medium text-[#15171A]">{formData.fileName}</span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 text-xs font-medium text-[#4B5563] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors cursor-pointer"
                >
                  Enviar otra cotización
                </button>
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#15171A] hover:bg-black rounded-lg transition-colors cursor-pointer"
                >
                  <span>Continuar por WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Formulario Minimalista */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
              {/* Selector de Tipo de Cliente tipo Segmented Pills */}
              <div>
                <label className="block text-xs font-medium text-[#5E656E] mb-1.5">
                  ¿Para quién es esta cotización?
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F3F4F6] rounded-xl">
                  {[
                    { id: 'constructora', label: 'Constructora / Obra' },
                    { id: 'administracion', label: 'Edificio / Condominio' },
                    { id: 'hogar', label: 'Hogar / Pyme' }
                  ].map((opt) => {
                    const isSelected = formData.tipo === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleClientTypeSelect(opt.id as ClientType)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg transition-all text-center truncate cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#15171A] shadow-xs font-semibold'
                            : 'text-[#5E656E] hover:text-[#15171A]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fila 1: Nombre y Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-nombre" className="block text-xs font-medium text-[#15171A] mb-1">
                    Nombre completo
                  </label>
                  <input
                    id="form-nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    onBlur={() => handleBlur('nombre')}
                    className={`w-full h-11 px-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden ${
                      errors.nombre
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D1D5DB] focus:border-[#15171A]'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.nombre}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="form-empresa" className="block text-xs font-medium text-[#15171A] mb-1">
                    {formData.tipo === 'hogar' ? 'Empresa o negocio (opcional)' : 'Empresa o constructora'}
                  </label>
                  <input
                    id="form-empresa"
                    name="empresa"
                    type="text"
                    placeholder={formData.tipo === 'hogar' ? 'Particular o razón social' : 'Ej: Constructora Alerce SpA'}
                    value={formData.empresa}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    onBlur={() => handleBlur('empresa')}
                    className={`w-full h-11 px-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden ${
                      errors.empresa
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D1D5DB] focus:border-[#15171A]'
                    }`}
                  />
                  {errors.empresa && (
                    <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.empresa}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Fila 2: Correo y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-correo" className="block text-xs font-medium text-[#15171A] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    id="form-correo"
                    name="correo"
                    type="email"
                    required
                    placeholder="contacto@empresa.cl"
                    value={formData.correo}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    onBlur={() => handleBlur('correo')}
                    className={`w-full h-11 px-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden ${
                      errors.correo
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D1D5DB] focus:border-[#15171A]'
                    }`}
                  />
                  {errors.correo && (
                    <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.correo}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="form-telefono" className="block text-xs font-medium text-[#15171A] mb-1">
                    Teléfono o WhatsApp
                  </label>
                  <input
                    id="form-telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="9 1234 5678"
                    value={formData.telefono}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    onBlur={() => handleBlur('telefono')}
                    className={`w-full h-11 px-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden ${
                      errors.telefono
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D1D5DB] focus:border-[#15171A]'
                    }`}
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.telefono}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Fila 3: Comuna */}
              <div>
                <label htmlFor="form-comuna" className="block text-xs font-medium text-[#15171A] mb-1">
                  Comuna o ciudad de entrega
                </label>
                <input
                  id="form-comuna"
                  name="comuna"
                  type="text"
                  required
                  placeholder="Ej: Las Condes, Santiago Centro, Antofagasta..."
                  value={formData.comuna}
                  disabled={isSubmitting}
                  onChange={(e) => handleChange('comuna', e.target.value)}
                  onBlur={() => handleBlur('comuna')}
                  className={`w-full h-11 px-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden ${
                    errors.comuna
                      ? 'border-[#DC2626] focus:border-[#DC2626]'
                      : 'border-[#D1D5DB] focus:border-[#15171A]'
                  }`}
                />
                {errors.comuna && (
                  <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.comuna}</span>
                  </p>
                )}
              </div>

              {/* Fila 4: ¿Qué necesitas cotizar? */}
              <div>
                <label htmlFor="form-necesidad" className="block text-xs font-medium text-[#15171A] mb-1">
                  ¿Qué necesitas cotizar?
                </label>
                <textarea
                  id="form-necesidad"
                  name="necesidad"
                  rows={3}
                  required
                  placeholder="Describe modelos, cantidades aproximadas o requerimientos de seguridad..."
                  value={formData.necesidad}
                  disabled={isSubmitting}
                  onChange={(e) => handleChange('necesidad', e.target.value)}
                  onBlur={() => handleBlur('necesidad')}
                  className={`w-full p-3 text-sm bg-white border rounded-lg transition-colors focus:outline-hidden resize-y ${
                    errors.necesidad
                      ? 'border-[#DC2626] focus:border-[#DC2626]'
                      : 'border-[#D1D5DB] focus:border-[#15171A]'
                  }`}
                />
                {errors.necesidad && (
                  <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.necesidad}</span>
                  </p>
                )}
              </div>

              {/* Adjuntar Archivo Minimalista */}
              <div>
                <input
                  ref={fileInputRef}
                  id="form-file"
                  type="file"
                  accept=".pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {formData.fileName ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-[#15171A] shrink-0" />
                      <span className="font-medium text-[#15171A] truncate">{formData.fileName}</span>
                      <span className="text-[#6B7280]">({formData.fileSize})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-[#DC2626] hover:text-red-700 p-1 cursor-pointer flex items-center gap-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Quitar</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 border border-dashed border-[#D1D5DB] hover:border-[#15171A] rounded-lg text-xs text-[#5E656E] hover:text-[#15171A] flex items-center justify-center gap-2 transition-colors cursor-pointer bg-white"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Adjuntar plano, planilla o especificación técnica <span className="text-[#9CA3AF]">(opcional, hasta 10 MB)</span></span>
                  </button>
                )}
              </div>

              {/* Consentimiento */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consentimiento"
                    required
                    checked={formData.consentimiento}
                    disabled={isSubmitting}
                    onChange={(e) => handleChange('consentimiento', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#D1D5DB] text-[#15171A] focus:ring-[#15171A]"
                  />
                  <span className="text-xs text-[#5E656E] leading-tight">
                    Acepto que Cerramax use estos datos para enviar la propuesta y coordinar la cotización comercial.
                  </span>
                </label>
                {errors.consentimiento && (
                  <p className="mt-1 text-[11px] text-[#DC2626] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.consentimiento}</span>
                  </p>
                )}
              </div>

              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="company_tax_id_hp"
                value={formData.honeypot}
                onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Botón de Envío */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#FFC400] hover:bg-[#E6B000] active:scale-[0.99] text-[#15171A] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando solicitud…' : 'Enviar solicitud de cotización'}</span>
                </button>

                <p className="text-xs text-[#6B7280] text-center sm:text-right">
                  Razón Social: <span className="font-medium text-[#15171A]">{CONTACT_INFO.legalName}</span> · Factura inmediata
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
