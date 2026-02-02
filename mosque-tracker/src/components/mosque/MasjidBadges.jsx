import React from "react";
import Badge from "react-bootstrap/Badge";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

export default function MasjidBadges({ masjid }) {
  const {
    street,
    city,
    state,
    zip,
    website,
    donation_url,
    phone,
    email,
    facebook,
    whatsapp,
    youtube,
  } = masjid;

  return (
    <span className="masjid-location d-flex align-items-center flex-wrap gap-1">
      {street && city && (
        <Badge bg="light" className="p-2 text-dark">
          <FaMapMarkerAlt className="text-success me-1" /> {street}. {city}{" "}
          {zip} {state ? `, ${state}` : ""}
        </Badge>
      )}

      {website && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaGlobe className="text-primary me-1" />
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-dark"
          >
            {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </Badge>
      )}

      {donation_url && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaHeart className="text-danger me-1" />
          <a href={donation_url} target="_blank" rel="noreferrer">
            Donations
          </a>
        </Badge>
      )}

      {phone && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaPhone className="me-1" /> <a href={`tel:${phone}`}>{phone}</a>
        </Badge>
      )}

      {email && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaEnvelope className="me-1" />{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </Badge>
      )}

      {facebook && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaFacebook className="text-primary me-1" />
          <a href={facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </Badge>
      )}

      {whatsapp && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaWhatsapp className="me-1" />
          <a href={whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Badge>
      )}

      {youtube && (
        <Badge
          bg="light"
          className="p-2 text-dark d-inline-flex align-items-center gap-1"
        >
          <FaYoutube className="text-danger me-1" />
          <a href={youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        </Badge>
      )}
    </span>
  );
}
