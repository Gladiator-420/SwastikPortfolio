# Swastik Panda | Portfolio

A black and rose, scroll-driven personal portfolio built with plain **HTML, CSS and JavaScript**. There is no framework and no build step.

**Sections:** Home, Tech strip, About, Skills, Services, My Work, Contact.

## Project structure

```
portfolio/
├── index.html          # All content and markup
├── style.css           # Design, layout and animation styles
├── main.js             # Scroll effects, cursor, tech strip, form, video playback
├── myimage.jpg         # Hero image (desktop)
├── myimage480px.jpg    # Hero image (mobile, under 760px)
├── rocket.png          # Favicon
├── Resume.pdf          # Download target for the Resume buttons
└── media/
    ├── nexchat.mp4     # Muted, compressed project previews
    ├── attendance.mp4
    ├── dotpdf.mp4
    └── *.jpg           # Poster frame for each video
```

## Run locally

Open `index.html` in a browser. For the most accurate behaviour, serve the folder instead:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

An internet connection is needed for Google Fonts (Chakra Petch, Barlow) and Font Awesome icons. Both load from a CDN.

## Deploy

Any static host works. Upload the whole folder.

- **Vercel / Netlify:** drag and drop the folder, or connect the GitHub repo. No build command is needed, and the output directory is the root.
- **GitHub Pages:** push to a repo, then go to Settings → Pages → deploy from the `main` branch, root folder.

## Features

- Loading intro, scroll progress bar, sticky nav with active-section highlighting
- Hero parallax with a mouse-following glow
- Custom rose dot cursor with trailing ring and magnetic buttons (desktop only)
- Two-row tech strip that drifts on its own and speeds up or reverses as you scroll
- About text that lights up word by word on scroll
- Project previews that scale into view, tilt in 3D on hover, and play only while visible
- Cards with a glow that follows the mouse, count-up stats, and a timeline that fills on scroll
- Contact form with inline success and error messages
- Fully responsive, with a mobile menu
- Respects `prefers-reduced-motion`

## How to edit

| What | Where |
| --- | --- |
| Name, intro text, badge | Hero section in `index.html` |
| Typing roles in the hero | `roles` array in `main.js` |
| Stats (CGPA, projects, technologies) | `data-to` and `data-suf` attributes on the `.stat` cards in `index.html` |
| Tech strip items | `.tech` block in `index.html`. Each `.tc` card has an icon class, a label and a sub-label. Edit the first row and the second row. |
| Skills and education | `#skills` and `#about` sections in `index.html` |
| Projects | One `<article class="proj">` per project: title, text, chips, live link, GitHub link, and the `<video>` source |
| Email and social links | Hero `.soc` links and the `#contact` section in `index.html` |
| Colours | CSS variables `--c0` to `--c9` at the top of `style.css` |
| Fonts | `<link>` in the `<head>` of `index.html` and the `font-family` rules in `style.css` |
| Resume | Replace `Resume.pdf` and keep the same file name |

### Colour palette

`#590d22` `#800f2f` `#a4133c` `#c9184a` `#ff4d6d` `#ff758f` `#ff8fa3` `#ffb3c1` `#ffccd5` `#fff0f3`, on a pure black `#000` base.

### Adding or replacing a project video

Compress and mute a screen recording with FFmpeg, then create a poster frame:

```bash
ffmpeg -i input.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart media/name.mp4
ffmpeg -ss 4 -i input.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 5 media/name.jpg
```

Crop out any browser tabs or bookmark bars before encoding, for example by adding `crop=W:H:X:Y,` at the start of the `-vf` chain. Videos must stay muted so browsers allow autoplay.

## Contact form

The form submits to [Web3Forms](https://web3forms.com) using the `access_key` in the hidden input inside `#cf`. Messages go to the email registered with that key. To change where messages arrive, generate a new key on Web3Forms and replace the value.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. The custom cursor appears only on devices with a mouse. Touch devices use the normal pointer.

## Live projects featured

- **NexChat:** https://nexapp011.vercel.app/ ([code](https://github.com/Gladiator-420/chat-app))
- **Attendance Tracker:** https://attendancetracker01.vercel.app/ ([code](https://github.com/Gladiator-420/Attendace_Tracker))
- **DOT PDF:** https://dotpdf-chi.vercel.app/ ([code](https://github.com/Gladiator-420/dot.pdf))

## Contact

Swastik Panda · Bhubaneswar, Odisha, India
swastikpanda01@gmail.com · [github.com/Gladiator-420](https://github.com/Gladiator-420)

&copy; Swastik Panda. All rights reserved.
