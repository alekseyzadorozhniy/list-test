import React, {useEffect, useState} from "react";
import CertificatesTable from "./CertificatesTable";
import { Certificate, CertificatesRequestResult, CertificatesResponse, CertificateWithFavorite } from "./types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Certificates = () => {
    const [certificates, setCertificates] = useState<CertificatesRequestResult | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [tab, setTab] = useState(0);

    const fetchCertificates = (page: number = 1, count: number = 10) => {
        fetch(
            `https://demo.api.agreena.com/api/public/carbon_registry/v1/certificates?includeMeta=true&page=${page}&perPage=${count}`
        )
            .then(res => res.json())
            .then((response: CertificatesResponse) => setCertificates(response.result));
    }

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleFavorite = (id: string, add: boolean) => {
        if (add) {
            setFavorites((prevFavorites: string[]) => [...prevFavorites, id]);
        } else {
            setFavorites((prevFavorites: string[]) => prevFavorites.filter(item => item !== id));
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const preparedCertificates = certificates?.data.map((certificate: Certificate) => ({ ...certificate, favorite: favorites.includes(certificate.uniqueNumber) })) || [];

    const favoriteCertificates = preparedCertificates.filter((certificate: CertificateWithFavorite) => certificate.favorite);

    return certificates && (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Certificates" />
                    <Tab label="Favorites" />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <CertificatesTable
                    certificates={preparedCertificates}
                    meta={certificates.meta}
                    fetchCertificates={fetchCertificates}
                    handleFavorite={handleFavorite}
                />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <CertificatesTable
                    certificates={favoriteCertificates}
                    meta={null}
                    fetchCertificates={fetchCertificates}
                    handleFavorite={handleFavorite}
                />
            </TabPanel>
        </Box>
    );

}

export default Certificates;