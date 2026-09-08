<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/noszczykmichal/nextjs-klinika-zdrowej-skory/main/src/app/icon0.svg" width="100" />
</div>
<h1 align="center">
Healthy Skin Clinic (Klinika Zdrowej Skóry)
</h1>
<p align="center">
A fully functional website for a small business in the wellness industry, developed with <a href="https://react.dev/" target="_blank">React</a> and <a href="https://nextjs.org" target="_blank">Next.js</a>, powered by a headless CMS (<a href="https://www.sanity.io/" target="_blank">Sanity</a>), and hosted on <a href="https://vercel.com/" target="_blank">Vercel</a>.
</p>

<p align="center">
  <a href="https://www.olganoszczyk.pl/" target="_blank">Live demo</a>
</p>

<p align="center">
  <a href="https://github.com/noszczykmichal/nextjs-klinika-zdrowej-skory/actions/workflows/ci.yaml">
    <img alt="CI status" src="https://github.com/noszczykmichal/nextjs-klinika-zdrowej-skory/actions/workflows/ci.yaml/badge.svg" />
  </a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/noszczykmichal/nextjs-klinika-zdrowej-skory/main/src/assets/demo-healthy-skin-clinic.png" width="700" alt="demo" />
</p>

## Related Repositories

This frontend is powered by a separate Sanity Studio backend:

- [studio-klinika-zdrowej-skory](https://github.com/noszczykmichal/studio-klinika-zdrowej-skory) — content schema, validation rules, and CMS configuration

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## General Information

The project leverages a modern frontend stack and integrates with a headless CMS (Sanity) to enable dynamic content updates. Selected routes are statically generated, while others are rendered on the fly based on live CMS data. The site is optimized for performance and SEO, and will be further developed to include features such as service pricing page, course enrolment, and integrated payment functionality.

## Technologies Used

- [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- Forms: [React Final Form](https://final-form.org/react)
- Animations: [React Transition Group](https://reactcommunity.org/react-transition-group/), [NextReveal](https://github.com/ritmillio/next-reveal)
- SVGs: [SVGR](https://react-svgr.com/)
- CMS: [Sanity](https://www.sanity.io/)
- Code Quality: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- Testing: [Cypress](https://www.cypress.io/), [Jest](https://jestjs.io/)
- CI/CD: Custom GitHub Actions pipeline (linting, component testing, e2e testing) → [Vercel](https://vercel.com/) handles final build & deployment

## Contact

Designed and created by [@noszczykmichal](https://michalnoszczyk.com/) - feel free to contact me!
