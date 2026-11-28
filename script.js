
/* ==========================================
   JK - NUESTROS 10 AÑOS
   2016 - 2026
   ========================================== */

// PERSONALIZAR DATOS DE LA CENA
const cena = {
    restaurante: '',
    direccion: '',
    mapa: ''
};

// CONFIGURACIÓN DE ÁLBUMES
const albums = [
    ['Nuestros comienzos', 'inicio', 5, ['recuerdo.jpg']],
    ['Nuestros viajes', 'viaje', 8, []],
    ['Nuestros estudios y logros', 'logro', 6, [
        'estudios.jpg',
        'graduacion.jpg'
    ]],
    ['Nuestras familias', 'familia', 5, ['familia.jpg']],
    ['Nuestro presente', 'presente', 5, []]
];

const $ = id => document.getElementById(id);


/* ==========================================
   APERTURA DEL SOBRE DE AMOR
   ========================================== */

const welcome = $('welcome');

function openLove() {
    welcome.classList.add('opening');

    setTimeout(() => {
        welcome.hidden = true;
        document.body.classList.remove('locked');
        $('inicio').scrollIntoView();
    }, 450);
}

document.body.classList.add('locked');

$('openLove').onclick = openLove;
$('openLoveText').onclick = openLove;


/* ==========================================
   GALERÍAS DE FOTOGRAFÍAS
   ========================================== */

for (const [title, prefix, count, extra] of albums) {

    const section = document.createElement('section');
    section.className = 'album';

    const heading = document.createElement('h3');
    heading.textContent = title;
    section.append(heading);

    const track = document.createElement('div');
    track.className = 'track';
    track.tabIndex = 0;
    track.setAttribute('aria-label', title);

    section.append(track);

    const hint = document.createElement('p');
    hint.className = 'album-empty';
    hint.textContent = '♡ Recuerdos que guardamos en el corazón';

    section.append(hint);

    const controls = document.createElement('div');
    controls.className = 'album-controls';

    for (const [label, dir] of [['←', -1], ['→', 1]]) {

        const b = document.createElement('button');

        b.textContent = label;

        b.setAttribute(
            'aria-label',
            dir < 0 ? 'Foto anterior' : 'Foto siguiente'
        );

        b.onclick = () => track.scrollBy({
            left: dir * track.clientWidth * 0.8,
            behavior: 'smooth'
        });

        controls.append(b);
    }

    section.append(controls);

    $('gallery').append(section);

    const files = [...new Set([
        ...extra,
        ...Array.from(
            { length: count },
            (_, i) => `${prefix}-${i + 1}.jpg`
        )
    ])];

    for (const file of files) {

        const b = document.createElement('button');

        b.className = 'photo-button';
        b.hidden = true;

        const img = new Image();

        img.alt = title;

        img.onload = () => {
            b.hidden = false;
            hint.hidden = true;
        };

        img.onerror = () => b.remove();

        img.src = 'assets/' + file;

        b.append(img);

        b.onclick = () => {
            $('bigPhoto').src = img.src;
            $('bigPhoto').alt = title;
            $('bigCaption').textContent = title;
            $('lightbox').showModal();
        };

        track.append(b);
    }
}


/* ==========================================
   AMPLIAR Y CERRAR FOTOGRAFÍAS
   ========================================== */

$('closePhoto').onclick = () => {
    $('lightbox').close();
};

$('lightbox').onclick = e => {
    if (e.target === $('lightbox')) {
        $('lightbox').close();
    }
};


/* ==========================================
   CORAZÓN EN CÓDIGO BINARIO
   NUESTRO LENGUAJE SECRETO
   ========================================== */

const loveMessage =
    'Entre millones de probabilidades, coincidir contigo fue el mejor resultado de mi vida. Te amo 3 millones';

// Convertir el mensaje a código binario UTF-8
const bits = Array.from(
    new TextEncoder().encode(loveMessage),
    v => v.toString(2).padStart(8, '0')
).join('');

// Crear la forma matemática del corazón
const cells = [];

for (let y = 0; y < 36; y++) {

    const row = [];

    for (let x = 0; x < 68; x++) {

        const X = (x - 33.5) / 28;
        const Y = (16 - y) / 15;

        const heart =
            (X * X + Y * Y - 1) ** 3 -
            X * X * Y ** 3;

        if (heart <= 0) {
            row.push(x);
        }
    }

    cells.push(row);
}

// Crear corazón SVG adaptable a la pantalla
const svg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
);

svg.setAttribute('viewBox', '0 0 680 360');
svg.setAttribute('role', 'img');

svg.setAttribute(
    'aria-label',
    'Corazón formado por el mensaje en código binario'
);

let bitIndex = 0;

// Dibujar los ceros y unos dentro del corazón
for (let y = 0; y < cells.length; y++) {

    for (const x of cells[y]) {

        const t = document.createElementNS(
            svg.namespaceURI,
            'text'
        );

        t.setAttribute('x', x * 10 + 5);
        t.setAttribute('y', y * 10 + 9);

        t.textContent = bits[
            bitIndex++ % bits.length
        ];

        svg.append(t);
    }
}

// Mostrar el corazón
$('binaryText').replaceChildren(svg);

// Configurar el mensaje secreto
$('decoded').textContent = loveMessage;

// Botón para decodificar el mensaje
$('decode').onclick = () => {

    $('decoded').hidden = !$('decoded').hidden;

    $('decode').textContent =
        $('decoded').hidden
            ? 'Decodificar mi mensaje'
            : 'Ocultar mensaje';
};


/* ==========================================
   INVITACIÓN ROMÁNTICA A LA CENA
   ========================================== */

$('venue').textContent =
    cena.restaurante || 'El lugar será una sorpresa… ♡';

$('address').textContent = cena.direccion;

// Generar ubicación en Google Maps
const map = cena.mapa || (
    cena.direccion
        ? 'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(
              cena.restaurante + ' ' + cena.direccion
          )
        : ''
);

if (map) {
    $('mapLink').href = map;
    $('mapLink').hidden = false;
}

// Revelar la sorpresa final
$('reveal').onclick = () => {

    $('dinner').hidden = false;

    $('reveal').setAttribute(
        'aria-expanded',
        'true'
    );

    $('reveal').hidden = true;

    $('dinner').scrollIntoView({
        behavior: 'smooth'
    });
};


/* ==========================================
   BARRA DE PROGRESO DE LA PÁGINA
   ========================================== */

window.addEventListener('scroll', () => {

    const max =
        document.documentElement.scrollHeight -
        innerHeight;

    $('progress').style.width =
        (max > 0 ? scrollY / max * 100 : 0) + '%';

}, { passive: true });


/* ==========================================
   AGREGAR CENA A GOOGLE CALENDAR
   ========================================== */

$('calendar').onclick = () => {

    const q = new URLSearchParams({

        action: 'TEMPLATE',

        text: 'Nuestra cena de aniversario — 10 años ♡',

        dates: '20261130T190000/20261130T210000',

        ctz: 'America/Bogota',

        details:
            'Una noche especial para celebrar nuestros 10 años juntos.',

        location: [
            cena.restaurante,
            cena.direccion
        ].filter(Boolean).join(', ')

    });

    window.open(
        'https://calendar.google.com/calendar/render?' + q,
        '_blank',
        'noopener'
    );
};
