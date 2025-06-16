# 📌 MY-AGENT

## 🧠 Resumen
Aplicacion web para crear agentes de IA en un LLM famoso y con instrucciones concretas de sus funciones dando acceso a este desde llamadas telefonicas, whatsapp y otros posibles metodos de comunicacion como milanuncios o wallapop.

Esto vendria a ser un automatizacion con IA.

---

## 🎯 Objetivos
- Comunicacion con usuarios por whatsapp y llamadas telefonicas usando el servicio de twilio.
- Configuracion de Agentes en el LLM elegido (BackOffice).
- Validacion de tiempos de respuesta entre que se recibe la comunicacion se procesa en el LLM y se retorna la informacion.
- Acceso a datos de terceros para enriquecer las respuestas.
- Otros metodos de comunicacion como WebComponents que puedan añadir a sus webs.

---

## 🧑‍🤝‍🧑 Público objetivo
Toda las pequeñas y medianas empresas que quieran añadir soluciones de IA a su organizacion. Tanto para uso externo (cliente) como uso interno (trabajadores).

---

## 🏗️ Arquitectura inicial / Concepto técnico
Describe de forma resumida cómo funcionaría el sistema a alto nivel:

- Frontend: Web (BackOffice)
- Componentes: Angular, React, Vue, WebComponent
- Backend: Api Rest
- Base de datos: MongoDB
- Infraestructura: Docker / CI/CD / Cloud provider

---

## 🛠️ Tecnologías propuestas
| Área           | Tecnología             | Razón de elección                          |
|----------------|------------------------|--------------------------------------------|
| Frontend       | Angular                | Rápido desarrollo y comunidad activa       |
| Backend        | Node.js                | Rendimiento, familiaridad del equipo       |
| Base de datos  | MongoDB                | Escalabilidad, adecuación al tipo de datos |
| Infraestructura| Docker, GitHub Actions | Portabilidad y automatización del flujo    |

---

## 📋 Funcionalidades clave
- [ ] Login/Registro (BackOffice)
- [ ] Gestion de agentes (BackOffice)
- [ ] Gestion de usuarios (BackOffice)
- [ ] Gestion de sesiones para componentes (BackOffice)
- [ ] Sistema de pagos por tokens (IA) y api twilio
- [ ] Servicio de comunicacion
- [ ] Comunicacion con servicios de terceros
- [ ] Componentes para integracion en APP de terceros

---

## 🗺️ Roadmap (tentativo)
| Fase | Tareas principales | Tiempo estimado |
|------|-------------------------------------------------------------------------------------------|-----------|
| MVP  | Login/registo, BackOffice, servicio de comunicacion                                       | 6 semanas |
| Beta | comunicacion con servicios de terceros y componentes para integracion en apps de terceros | 4 semanas |
| V1.0 | Acceso a api de terceros                                                                  | 2 semanas |

---

## 💡 Posibles mejoras futuras


---

## ⚠️ Riesgos / Desafíos
- Seguridad en las comunicaciones, no se pueda a acceder a un agente que no es tuyo o prompting injection.
- Velocidad y escalabilidad, aqui una arquitectura de microservicios no es suficiente, al depender de servicios de terceros nuestro microservicio de comunicacion debe ir increiblemente rapido implementando sistemas de cache y procesamiento distribuido (servicios de terceros).

---

## 🔖 Notas adicionales
- Esta propuesta ya tiene un cliente potencial.
- No encontre ninguna propuesta en el mercado, cada empresa esta desarrollando el suyo.

---
