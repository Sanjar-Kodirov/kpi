export interface ReceiptTemplateModel {
  companyId: string;
  companyName: string;
  footerAlignment: string;
  footerImage: string;
  footerImageContentType: string;
  footerText: string;
  headerAlignment: string;
  headerImage: string;
  headerImageContentType: string;
  headerText: string;
  id: number;
}

export interface IUpdateReceiptTemplateModel {
  headerImage?: string;
  headerText?: string;
  footerImage?: string;
  footerText?: string;
}

export interface IDeleteReceiptTemplateModel {
  receiptTemplateId: number;
}
