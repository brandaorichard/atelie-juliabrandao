import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PaymentMethods from "./PaymentMethodsFooter";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer({ logoVariant, scrolled, transition }) {
  return (
    <footer className="bg-[#f9e7f6] border-t border-[#e5d3e9] pt-8 pb-4 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-8">
        {/* Contato */}
        <div className="flex flex-col items-start md:ml-4 order-1 md:order-2">
          <h2 className="text-base font-light text-[#616161] mb-3">
            Entre em contato
          </h2>
          <div className="flex flex-col gap-2 text-[#616161] font-light">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#7a4fcf]" />
              +55 (67) 99265-4151
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-[#7a4fcf]" />
              <a
                href="mailto:ju.artereborn@gmail.com"
                className="hover:underline"
              >
                ju.artereborn@gmail.com
              </a>
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#7a4fcf]" />
              Rua Ana Queiroz Dutra, ipe 4 Três Lagoas -<br />
              Mato Grosso do Sul
            </span>
          </div>
        </div>
        {/* Formas de pagamento */}
        <div className="flex flex-col items-start md:items-center md:justify-start order-3 md:ml-[-4]">
          <PaymentMethods />
        </div>
        {/* Redes sociais */}
        <div className="flex flex-col items-start md:items-start gap-3 md:ml-32 order-2 md:order-1">
          <span className="text-[#616161] text-base font-light mb-1">
            Redes sociais
          </span>
          <div className="flex gap-4">
            <a
              href="https://wa.me/5567992654151"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-green-500 text-4xl transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com/ateliejuliabrandao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#C13584] text-4xl transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/ateliejuliabrandao/"
              aria-label="tiktok"
              className="text-3xl transition mt-0.5"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
        {/* Logo - apenas no desktop */}
        <div className="hidden md:flex justify-center md:justify-start items-center md:ml-18 md:items-start mb-2 md:mb-0 opacity-80 order-3 md:order-4">
          <AnimatedLogo
            variants={logoVariant}
            animate={scrolled ? "scrolled" : "initial"}
            transition={transition}
            className="w-[250px] h-auto"
          />
        </div>
      </div>
      <div className="text-center text-xs text-[#ae95d9] mt-6">
        © {new Date().getFullYear()} Ateliê Júlia Brandão. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}