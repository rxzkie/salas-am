import capacitacion from "@/assets/galeria/capacitacion.jpg"
import entrega from "@/assets/galeria/entrega.jpg"
import grupo from "@/assets/galeria/grupo.jpg"
import once from "@/assets/galeria/once.jpg"
import reunion from "@/assets/galeria/reunion.jpg"
import voluntario from "@/assets/galeria/voluntario.jpg"

export const heroSlides = [
  { src: grupo, alt: "Equipo Salas AM en terreno" },
  { src: once, alt: "Once con adultos mayores" },
  { src: reunion, alt: "Reunión comunitaria" },
  { src: capacitacion, alt: "Capacitación del equipo" },
]

export const galleryPhotos = [
  { src: grupo, alt: "Equipo Salas AM en terreno", titulo: "Equipo en terreno" },
  { src: once, alt: "Compartiendo once con adultos mayores", titulo: "Once compartida" },
  { src: reunion, alt: "Reunión comunitaria", titulo: "Reunión comunitaria" },
  { src: capacitacion, alt: "Capacitación del equipo", titulo: "Capacitación" },
  { src: voluntario, alt: "Voluntario en actividad", titulo: "Voluntariado" },
  { src: entrega, alt: "Entrega en ELEAM Portezuelo", titulo: "ELEAM Portezuelo" },
]

export const activityPhotos = {
  talleres: capacitacion,
  encuentros: grupo,
  orientacion: once,
  nuble: reunion,
}
