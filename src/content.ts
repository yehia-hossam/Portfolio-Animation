export const person = {
  name: 'Yehia Dev',
  handle: 'yehiahossamdev@gmail.com',
};

export const nav = [
  {label: 'Work', href: '#work'},
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Notes', href: '#notes'},
  {label: 'Contact', href: '#contact'},
];

export const bio = [
  'I make faces for a living.',
  'Eleven years of sculpting and animating cartoon characters — mostly for games, a few for cereal boxes, one for a very confused bank. I still can’t draw hands.',
  'These days I build small tools that let anyone rig a face in an afternoon. I write about what breaks every other Sunday:',
];

export const press = [
  {name: 'The Polygon Review', font: 'font-serif italic'},
  {name: 'RIGGED', font: 'font-wide tracking-[0.08em]'},
  {name: 'frameline', font: 'font-display font-black lowercase tracking-[-0.04em]'},
  {name: 'Keyframe Quarterly', font: 'font-serif'},
  {name: 'TOON/DAILY', font: 'font-mono tracking-[0.04em]'},
  {name: 'Squash & Stretch', font: 'font-display font-medium italic'},
];

export const faces = {
  base: {src: '/faces/base.webp', mood: 'chill'},
  l_left: {src: '/faces/l_left.webp', mood: 'watching you'},
  l_right: {src: '/faces/l_right.webp', mood: 'watching you'},
  x_cross: {src: '/faces/x_cross.webp', mood: 'suspicious'},
  x_tongue: {src: '/faces/x_tongue.webp', mood: 'goofy'},
  x_shock: {src: '/faces/x_shock.webp', mood: 'startled'},
  x_laugh: {src: '/faces/x_laugh.webp', mood: 'cackling'},
  x_skeptic: {src: '/faces/x_skeptic.webp', mood: 'unconvinced'},
  x_whistle: {src: '/faces/x_whistle.webp', mood: 'innocent'},
  x_smug: {src: '/faces/x_smug.webp', mood: 'smug'},
  x_dizzy: {src: '/faces/x_dizzy.webp', mood: 'seeing stars'},
  g_grimace: {src: '/faces/g_grimace.webp', mood: 'being squeezed'},
  g_ouch: {src: '/faces/g_ouch.webp', mood: 'OW'},
  g_squish: {src: '/faces/g_squish.webp', mood: 'pinched'},
} as const;

export type FaceKey = keyof typeof faces;

export const releaseFaces: FaceKey[] = ['x_tongue', 'x_laugh', 'x_skeptic', 'x_whistle', 'x_smug', 'x_cross'];

export const rig = {
  disc: {x: 0.5, y: 0.58, r: 0.41},
  nose: {x: 0.505, y: 0.505, r: 0.04},
  cheeks: [
    {x: 0.385, y: 0.53},
    {x: 0.625, y: 0.53},
  ],
  face: {x: 0.5, y: 0.51, rx: 0.175, ry: 0.23},
  hairLine: 0.26,
  sides: 0.19,
};

/* ─── New sections data ───────────────────────────────────── */

export const projects = [
  {
    slug: 'paper-pals',
    title: 'Paper Pals',
    category: 'Character Design',
    description: 'A cast of foldable paper characters for a children’s gaming series.',
    year: '2024',
    role: 'Art direction · Rigs',
           // poster / fallback
    video: '/paper-pals.mp4',           // ← الفيديو
    featured: true,
  },
  {
    slug: 'noodle-ned',
    title: 'Noodle Ned',
    category: 'Facial Rigging',
    description: 'A stretchy mascot built around a 40-shape face rig.',
    year: '2024',
    role: 'Rigging',
    image: '/noodle-ned.jpg',
    video: '/noodle-ned.mp4',
    featured: false,
  },
  {
    slug: 'blob-ops',
    title: 'Blob Ops',
    category: 'Interactive',
    description: 'WebGL mascot for a launch microsite.',
    year: '2023',
    role: 'Creative dev',
    image: '/blob-ops.jpg',
    video: '/blob-ops.mp4',
    featured: false,
  },
  {
    slug: 'mug-face',
    title: 'Mug Face',
    category: '3D Modeling',
    description: 'Cereal-box mascot that blinks on a loop.',
    year: '2023',
    role: 'Modeling',
    image: '/work/mug-face.jpg',
    video: '/mug-face.mp4',
    featured: false,
  },
] as const;

export const services = [
  {n: '01', title: 'Character Design', description: 'From thumbnails to final turnarounds — expressive, appealing silhouettes.'},
  {n: '02', title: '3D Character Modeling', description: 'Clean topology, high-to-low poly, game-ready and film-ready.'},
  {n: '03', title: 'Character Animation', description: 'Acting, cycles and one-off beats that sell the weight.'},
  {n: '04', title: 'Facial Rigging', description: 'Blendshape and bone rigs that give artists control without the pain.'},
  {n: '05', title: 'Creative Development', description: 'WebGL, GSAP and React — turning concepts into live experiences.'},
  {n: '06', title: 'Interactive Experiences', description: 'Playable characters and microsites that respond to the user.'},
] as const;

export const processSteps = [
  {n: '01', title: 'Discover', description: 'Understand the character, the audience, and the constraints.'},
  {n: '02', title: 'Concept', description: 'Sketch broadly, then commit to one direction with intent.'},
  {n: '03', title: 'Design', description: 'Sculpt, shade and iterate until the face reads.'},
  {n: '04', title: 'Develop', description: 'Rig, animate and wire up the interactive layer.'},
  {n: '05', title: 'Deliver', description: 'Ship assets, docs and a hand-off artists can actually use.'},
] as const;

export const featuredNote = {
  title: 'Why every great face is a stack of tiny lies.',
  excerpt: 'Cheeks that squash, eyes that lead, and the twelve-millisecond delay that makes a blink feel alive.',
  category: 'Craft',
  date: 'Mar 2024',
  read: '7 min read',
} as const;

export const notes = [
  {title: 'Rigging a smile without a single blendshape', category: 'Rigging', date: 'Feb 2024', read: '5 min'},
  {title: 'The art of the hold frame', category: 'Animation', date: 'Jan 2024', read: '4 min'},
  {title: 'Shipping WebGL that runs on a phone', category: 'Dev', date: 'Dec 2023', read: '8 min'},
] as const;