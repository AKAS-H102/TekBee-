import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const liveUrl = "https://tek-bee.vercel.app";
  const cardUrl = liveUrl + "/?card=true";

  const params = new URLSearchParams(window.location.search);
  const showCard = params.get("card") === "true";

  const company = {
    name: "TekBee Technologies",
    tagline: "Tech That Works For You",
    website: "https://tekbeetech.com/",
    phone: "+919444514775",
    email: "info@tekbeetech.com",
    address: "Madipakkam, Chennai, Tamil Nadu, 600091",
    maps: "https://www.google.com/maps/search/?api=1&query=TekBee+Technologies+Chennai",
  };

  const saveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${company.name}
ORG:${company.name}
TEL:${company.phone}
EMAIL:${company.email}
URL:${company.website}
ADR:${company.address}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "TekBee-Technologies.vcf";
    a.click();
  };

  const shareCard = async () => {
    if (navigator.share) {
      await navigator.share({
        title: company.name,
        text: "TekBee Technologies Digital Visiting Card",
        url: cardUrl,
      });
    } else {
      navigator.clipboard.writeText(cardUrl);
      alert("Card link copied");
    }
  };

  if (!showCard) {
    return (
      <div className="page">
        <div className="qrCard">
          <h1>{company.name}</h1>
          <p>Scan QR Code to open digital visiting card</p>

          <div className="qrBox">
            <QRCodeCanvas value={cardUrl} size={240} />
          </div>

          <small>{cardUrl}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <img src="/logo.png" alt="TekBee Logo" className="logo" />

        <h1>{company.name}</h1>
        <p className="tagline">{company.tagline}</p>
        <p className="address">📍 {company.address}</p>

        <div className="buttons">
          <a href={`tel:${company.phone}`}>📞 Call</a>
          <a href={`https://wa.me/${company.phone.replace("+", "")}`} target="_blank">
            💬 WhatsApp
          </a>
          <a href={`mailto:${company.email}`}>✉️ Email</a>
          <a href={company.website} target="_blank">🌐 Website</a>
          <a href={company.maps} target="_blank">📍 Google Maps</a>

          <button onClick={saveContact}>💾 Save Contact</button>
          <button onClick={shareCard}>🔗 Share Card</button>
        </div>

        <div className="services">
          <h2>Our Services</h2>
          <p>✅ ERPNext Implementation</p>
          <p>✅ Zoho Solutions</p>
          <p>✅ SAP ABAP</p>
          <p>✅ CRM & Business Automation</p>
          <p>✅ Website & App Development</p>
        </div>
      </div>
    </div>
  );
}

export default App;