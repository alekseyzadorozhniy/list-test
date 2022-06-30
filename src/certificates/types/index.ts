type Address = {
    country: string;
    id: number;
}

type Company = {
    address: Address;
    id: number;
    name: string;
}

type User = {
    id: number;
}

type CarbonUser = {
    company: Company;
    id: number;
    user: User;
}

type CarbonCertificateOwnerAccount = {
    carbonUser: CarbonUser;
    id: number;
}

type CarbonField = {
    address: Address;
    id: 4314
}

export type Certificate = {
    carbonCertificateOwnerAccount: CarbonCertificateOwnerAccount;
    carbonField: CarbonField;
    carbonUser: CarbonUser;
    companyName: string;
    countryCode: string;
    deployment: string;
    id: number;
    issuanceDate: string;
    methodologyVersion: string[];
    ownershipStatus: string;
    replenishment: string | null;
    standard: string;
    status: string;
    tonnes: number;
    uniqueNumber: string;
    validity: string;
    vintageYear: number[];
}

export type CertificateWithFavorite = Certificate & { favorite: boolean };

export type CertificatesMeta = {
    currentPage: number;
    size: number;
    total: number;
    totalPages: number;
}

export type CertificatesRequestResult = {
    data: Certificate[];
    meta: CertificatesMeta;
}

export type CertificatesResponse = {
    errors: string[];
    result: CertificatesRequestResult;
    success: boolean;
}