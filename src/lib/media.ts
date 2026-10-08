import capacitacion from "@/assets/galeria/capacitacion.jpg"
import entrega from "@/assets/galeria/entrega.jpg"
import grupo from "@/assets/galeria/grupo.jpg"
import igEntrega from "@/assets/galeria/ig-entrega.jpg"
import igEquipo from "@/assets/galeria/ig-equipo.jpg"
import igFiesta from "@/assets/galeria/ig-fiesta.jpg"
import igHero01 from "@/assets/galeria/ig-hero-01.jpg"
import igHero02 from "@/assets/galeria/ig-hero-02.jpg"
import igTaller from "@/assets/galeria/ig-taller.jpg"
import once from "@/assets/galeria/once.jpg"
import reunion from "@/assets/galeria/reunion.jpg"
import voluntario from "@/assets/galeria/voluntario.jpg"

export const heroSlides = [
  { src: igHero01, alt: "Once compartida con adultos mayores" },
  { src: igHero02, alt: "Encuentro comunitario en Ñuble" },
  { src: igFiesta, alt: "Celebración y compañía" },
  { src: igEquipo, alt: "Equipo Salas AM" },
]

export const galleryPhotos = [
  { src: igHero01, alt: "Once compartida", titulo: "Once compartida" },
  { src: igHero02, alt: "Encuentro en terreno", titulo: "En terreno" },
  { src: igFiesta, alt: "Celebración comunitaria", titulo: "Celebración" },
  { src: igEquipo, alt: "Equipo Salas AM", titulo: "Nuestro equipo" },
  { src: igTaller, alt: "Taller de manualidades", titulo: "Talleres" },
  { src: igEntrega, alt: "Entrega de apoyo", titulo: "Entregas" },
  { src: grupo, alt: "Equipo en terreno", titulo: "Grupo" },
  { src: once, alt: "Once con adultos mayores", titulo: "Compañía" },
  { src: reunion, alt: "Reunión comunitaria", titulo: "Reunión" },
  { src: capacitacion, alt: "Capacitación", titulo: "Capacitación" },
  { src: voluntario, alt: "Voluntariado", titulo: "Voluntariado" },
  { src: entrega, alt: "Entrega en ELEAM", titulo: "ELEAM" },
]

export const activityPhotos = {
  talleres: igTaller,
  encuentros: igFiesta,
  orientacion: igHero01,
  nuble: igEquipo,
}
