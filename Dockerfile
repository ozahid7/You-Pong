FROM node:20.11-alpine3.18

WORKDIR /frontEnd

COPY api/ /frontEnd/api
COPY app/ /frontEnd/app
COPY components/ /frontEnd/components
COPY const/ /frontEnd/const
COPY next.config.js /frontEnd/next.config.js
COPY package.json /frontEnd/package.json
COPY postcss.config.js /frontEnd/postcss.config.js
COPY providers/ /frontEnd/providers
COPY public/ /frontEnd/public
COPY tailwind.config.ts /frontEnd/tailwind.config.ts
COPY tsconfig.json /frontEnd/tsconfig.json
COPY types/ /frontEnd/types
COPY utils/ /frontEnd/utils
COPY .env /frontEnd/.env


RUN npm install -g npm@10.3.0 \
    && npm i \
    && npm run build

CMD ["npm", "run", "start"]