import { placeholder, sourced, verified } from "./types";

export const site = {
  name: "Swarnavihar Old Age Homes",
  shortName: "Swarnavihar",
  tagline: "Old Age Homes, Pune",
  domain: verified("https://swarnaviharoldagehomes.com"),
  phone: placeholder({ display: "+91 00000 00000", tel: "+910000000000" }),
  whatsapp: placeholder({ number: "910000000000" }),
  email: sourced("svoldagehomes@gmail.com"),
};

export const whatsappLink = (message = "Hello, I'd like to know about care for my parent.") =>
  `https://wa.me/${site.whatsapp.value.number}?text=${encodeURIComponent(message)}`;
