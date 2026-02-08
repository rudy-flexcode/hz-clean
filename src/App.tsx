import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import Pix1 from "./images/pix1.png";
import Pix2 from "./images/pix2.png";

export default function App() {
  const [tarifsVisible, setTarifsVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showLegal, setShowLegal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Scroll animation tarifs
  useEffect(() => {
    const onScroll = () => {
      const tarifSection = document.getElementById("tarifs");
      if (tarifSection) {
        const rect = tarifSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setTarifsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Envoi formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("Envoi en cours...");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatusMessage("✅ Message envoyé avec succès !");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatusMessage("❌ Une erreur est survenue.");
        }
      );
  };

  const scrollToContact = () => {
    document.querySelector(".contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const tarifsData = [
    {
      title: "PROFESSIONNEL",
      price: "26 € / heure",
      desc: "Entretien régulier de bureaux, commerces et espaces professionnels.",
      desc2:
        "INCLUS : sols, dépoussiérage, sanitaires, vitres intérieures/extérieures accessibles.",
      desc3: "NON INCLUS : murs, plafonds.",
    },
    {
      title: "GRAND MÉNAGE",
      price: "1 chambre : 200 €\n2 chambres : 240 €\n3 chambres : 280 €",
      desc: "",
      desc2:
        "INCLUS : sols, cuisine, SDB/WC, vitres intérieures/extérieures accessibles.",
      desc3:
        "NON INCLUS : murs, plafonds, placards, électroménager intérieur, hotte.",
    },
    {
      title: "EMMÉNAGEMENT / DÉMÉNAGEMENT",
      price: "1 chambre : 180 €\n2 chambres : 220 €\n3 chambres : 260 €",
      desc: "",
      desc2:
        "INCLUS : sols, cuisine, sanitaires, vitres intérieures/extérieures accessibles.",
      desc3: "NON INCLUS : murs et plafonds.",
    },
    {
      title: "PARTICULIER",
      price: "2 heures minimum — 23 € / heure",
      desc2:
        "INCLUS : sols, cuisine, sanitaires, vitres intérieures/extérieures accessibles.",
      desc3: "NON INCLUS : murs, plafonds.",
    },
  ];

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <div className="hero-sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-features-track">
          <ul className="hero-features">
            <li>Ménage soigné et organisé</li>
            <li>Produits respectueux</li>
            <li>Sérieuse, discrète et ponctuelle</li>
            <li>Prestations claires, sans surprise</li>
          </ul>
          <ul className="hero-features hero-features-clone" aria-hidden="true">
            <li>Ménage soigné et organisé</li>
            <li>Produits respectueux</li>
            <li>Sérieuse, discrète et ponctuelle</li>
            <li>Prestations claires, sans surprise</li>
          </ul>
        </div>

        <h1>HZ Clean</h1>
        <p>Services de propreté et bio-nettoyage</p>
        <button onClick={scrollToContact}>Contactez-nous</button>

        <div className="logo-container">
          <img src={Pix1} alt="HZ Clean Logo" />
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="presentation">
        <div className="presentation-container">
          <div className="presentation-image">
            <img src={Pix2} alt="HZ Clean service" />
          </div>
          <div className="presentation-text">
            <h3>À propos de HZ Clean</h3>
            <h2>
              Un service de nettoyage <br /> fiable, discret et organisé
            </h2>
            <p>
              Prestations professionnelles, claires et sans surprise, réalisées
              avec soin et ponctualité.
            </p>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className={`tarifs ${tarifsVisible ? "show" : ""}`}>
        <h2>Nos Tarifs</h2>

        <div className="tarif-cards">
          {tarifsData.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              {item.price && <p className="tarif-price">{item.price}</p>}
              {item.desc && <p className="tarif-desc">{item.desc}</p>}
              {item.desc2 && <p className="tarif-inclus">{item.desc2}</p>}
              {item.desc3 && (
                <p className="tarif-non-inclus">{item.desc3}</p>
              )}
            </div>
          ))}

          {/* BIO-NETTOYAGE INCLUS */}
          <div className="bio-badge">
            <strong>
              Désinfection <br /> & Bio-nettoyage inclus
            </strong>
            <ul>
              <li>Après déménagement</li>
              <li>Après maladie</li>
              <li>Logement / bureaux très sollicités</li>
            </ul>
          </div>
        </div>

        <p className="tarif-note">
          Tarif valable pour un logement en état normal. En cas de logement très
          sale, encombré ou non signalé, un ajustement tarifaire pourra être
          appliqué après visite.
        </p>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <h2>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <button type="submit">Envoyer</button>
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </section>

      {/* FOOTER */}
     <footer className="footer">
  <p>
    © 2026 HZ Clean — 
    <button className="legal-link" onClick={() => setShowLegal(true)}>
      Mentions légales
    </button>
    <span> · </span>
    <a 
      href="https://bugsquasher.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="dev-link"
    >
      Développé par BugSquasher
    </a>
  </p>
</footer>

      {/* MODAL */}
      {showLegal && (
        <div className="modal-overlay" onClick={() => setShowLegal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Mentions légales</h2>
            <p>
              <strong>Entreprise :</strong> HZ Clean
            </p>
            <p>
              <strong>Statut :</strong> Auto-entrepreneur
            </p>
            <p>
              <strong>Email :</strong> hzcontact.re@gmail.com
            </p>
            <p>
              <strong>Hébergeur :</strong> Vercel
            </p>
            <p>
  <strong>Développement du site :</strong>{" "}
  <a 
    href="https://bugsquasher.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="dev-link"
  >
    BugSquasher – Développeur web
  </a>
</p>

            <h3>Confidentialité</h3>
            <p>
              Les données envoyées via le formulaire sont utilisées uniquement
              pour répondre à votre demande.
            </p>

            <button
              className="modal-close"
              onClick={() => setShowLegal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
