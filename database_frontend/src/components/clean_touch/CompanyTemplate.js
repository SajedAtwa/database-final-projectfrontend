import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from "../../static/clean_touch_companyData.json";  // Assuming data is structured as shown
import Header from './Header';
import Footer from './Footer';

function EachCompanyPage({ companyInfo }) {
    return (
        <div>
            <Header />
            <div className="company-card">
                <h2>{companyInfo["Company Name"]}</h2>
                <img src={companyInfo["Image"]} alt={companyInfo["Company Name"]} />
                <h3>{companyInfo["Offer Title"]}</h3>
                <p className="price">Price: {companyInfo["Price"]}</p>
                <p className="address">Address: {companyInfo["Company Address"]}</p>
                <p className="rating">Rating: {companyInfo["Offer Rating"]} / 5</p>
                <a href={companyInfo["Offer Link"]} target="_blank" rel="noopener noreferrer" className="view-offer-button">View Offer</a>
            </div>
            <Footer />
        </div>
    );
}


function IndividualCompanyPage() {
    const { companyName } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("companyName");
    useEffect(() => {
        const selectedCompany = data.find(item => item["Company Name"] === companyName);
        setCompany(selectedCompany);
        setLoading(false);
    }, [companyName]);  // Depend on companyName to re-run this effect

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>Company not found.</div>;
    }

    return (
        <EachCompanyPage companyInfo={company} />
    );
}

export default IndividualCompanyPage;
