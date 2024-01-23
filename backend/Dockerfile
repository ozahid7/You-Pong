FROM node:20.11-alpine3.18

WORKDIR /backEnd

COPY .eslintrc.js /backEnd/.eslintrc.js
COPY .gitignore /backEnd/.gitignore
COPY .prettierrc /backEnd/.prettierrc
COPY DefaultImages/ /backEnd/DefaultImages
COPY nest-cli.json /backEnd/nest-cli.json
COPY package.json /backEnd/package.json
COPY prisma/ /backEnd/prisma
COPY src/ /backEnd/src
COPY tsconfig.build.json /backEnd/tsconfig.build.json
COPY tsconfig.json /backEnd/tsconfig.json

RUN npm install -g npm@10.3.0 \
    && npm i

CMD ["npm", "run", "start"]