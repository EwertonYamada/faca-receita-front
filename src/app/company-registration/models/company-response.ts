export interface CompanyResponse {
  id: number
  userId: number
  legalName: string
  tradeName: string
  description: string
  cnpj: string
  stateTaxRegistration: string
  municipalTaxRegistration: string
  phoneNumber: string
  whatsapp: string
  email: string
  website: string
  instagram: string
  facebook: string
  logoUrl: string
  primaryColor: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}