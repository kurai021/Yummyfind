# YummyFind 🍕🍔

YummyFind es una herramienta que permite encontrar miles de recetas de cocina completamente en español 

# Instalación para testing

- Crea un certificado autofirmado (crt y csr), este link puede ayudarte: https://www.akadia.com/services/ssh_test_certificate.html
- Crea un archivo .env con las variables de entorno siguientes:
**VISUALRECOGKEY**,
**VISUALRECOGURL**,
**EDAMAMID** y
**EDAMAMKEY**
Las primeras dos corresponden al api key y url de tu instancia privada de [Watson Visual Recognition](https://cloud.ibm.com/apidocs/visual-recognition/visual-recognition-v3) y las dos últimas a tu ID y key para accesar al [API de Edamam en español](https://test-es.edamam.com)
- Si estás trabajando en localhost, descomenta las líneas 16-21 y 29 en app.js, comenta la línea 30
- Instala las dependencias con npm y ejecuta npm start para correr Express

## Características

- Búsqueda de recetas a través de texto
- Reconocimiento visual de ingredientes y comidas a través de machine learning
- Guardado de recetas
- Compartir en Facebook, Twitter y Whatsapp
- Y un poco de gamificación (trabajando en ello...)

# Licencia

YummyFind ha sido lanzado bajo la Licencia [Apache 2.0]("https://github.com/kurai021/Yummyfind/blob/master/LICENSE")
