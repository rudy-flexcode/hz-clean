import { useEffect, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

import Pix1 from "./images/pix1.png";
import Pix2 from "./images/pix2.png";

export default function App() {
  const [tarifsVisible, setTarifsVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Détecte le scroll pour afficher la section TARIFS
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

  // Envoi du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
        (response: EmailJSResponseStatus) => {
          console.log("EmailJS success:", response);
          setStatusMessage("✅ Message envoyé avec succès !");
          setFormData({ name: "", email: "", message: "" });
        },
        (error: EmailJSResponseStatus) => {
          console.error("EmailJS error:", error);
          setStatusMessage(
            "❌ Une erreur est survenue. Vérifie tes clés et le template."
          );
        }
      );
  };

  // Scroll vers le formulaire
  const scrollToContact = (): void => {
    const contactSection = document.querySelector(".contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tarifsData = [
    {
      title: "PROFESSIONNEL",
      price: "35 € / heure",
      desc: "Entretien régulier de bureaux, commerces et espaces professionnels.",
      desc2:
        "INCLUS : Nettoyage des sols, dépoussiérage des surfaces accessibles, nettoyage des sanitaires, vitres intérieures, vidage des poubelles et remplacement des sacs.",
      desc3:
        "NON INCLUS : Nettoyage en hauteur, murs et plafonds, intérieur des appareils professionnels, vitres extérieures, remise en état après travaux ou sinistre.",
    },
    {
      title: "GRAND MÉNAGE",
      price: "",
      desc: "1 chambre : 200 € · 2 chambres : 240 € · 3 chambres : 280 € · Chambre supplémentaire : 30 €. ",
      desc2:
        "INCLUS : Dépoussiérage complet, nettoyage des sols, cuisine, salle de bains / WC, vitres intérieures, poubelles, ramassage et pliage du linge.",
      desc3:
        "NON INCLUS : Nettoyage des murs et plafonds, placards, intérieur des appareils électroménagers, hotte, extérieur des vitres, déplacement de meubles lourds.",
    },
    {
      title: "EMMÉNAGEMENT / DÉMÉNAGEMENT",
      price:
        "1 chambre : 180 € · 2 chambres : 220 € · 3 chambres : 260 € · Chambre supplémentaire : 30 €. ",
      desc:
        "Avant un déménagement ou un état des lieux d’entrée ou de sortie. Logement vide ou presque vide.",
      desc2:
        "INCLUS : Dépoussiérage complet, nettoyage des sols, cuisine, sanitaires et vitres intérieures.",
      desc3: "NON INCLUS : Nettoyage des murs et plafonds.",
    },
    {
      title: "PARTICULIER",
      price: "2 heures minimum — 30 € / heure",
      desc2:
        "INCLUS : Nettoyage des sols, dépoussiérage, cuisine, sanitaires, vitres intérieures et vidage des poubelles.",
      desc3:
        "NON INCLUS : Nettoyage des murs et plafonds, placards intérieurs, intérieur des appareils électroménagers, hotte, extérieur des vitres, déplacement de meubles lourds.",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <ul className="hero-features">
          <li>Ménage soigné et organisé</li>
          <li>Produits respectueux (option bio)</li>
          <li>Sérieuse, discrète et ponctuelle</li>
          <li>Prestations claires, sans surprise</li>
        </ul>

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
            <img src={Pix2} alt="HZ Clean service de nettoyage" />
          </div>

          <div className="presentation-text">
            <h3>À propos de HZ Clean</h3>
            <h2>
              Un service de nettoyage <br />
              fiable, discret et organisé
            </h2>
            <p>
              HZ Clean propose des prestations professionnelles, claires et sans
              surprise, réalisées avec soin et ponctualité.
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
              {item.price && <p>{item.price}</p>}
              {item.desc && <p className="tarif-desc">{item.desc}</p>}
              {item.desc2 && <p className="tarif-inclus">{item.desc2}</p>}
              {item.desc3 && <p className="tarif-non-inclus">{item.desc3}</p>}
            </div>
          ))}
        </div>
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

          {/* Affichage du message de statut */}
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </section>
    </div>
  );
}
