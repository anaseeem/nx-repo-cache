'use strict';
import * as fs from 'node:fs/promises';

const paths = {
  '@jaqua/auth': ['libs/shared/feat/auth/core/src/index.ts'],
  '@jaqua/auth/backend': ['libs/shared/feat/auth/backend/src/index.ts'],
  '@jaqua/auth/frontend': ['libs/shared/feat/auth/frontend/src/index.ts'],
  '@jaqua/auth/frontend/server': [
    'libs/shared/feat/auth/frontend/src/server.ts',
  ],
  '@jaqua/shared/graphql': ['libs/shared/util/graphql/src/index.ts'],
  '@jaqua/cirs-api': ['apps/cirs/api/src/main.ts'],
  '@jaqua/cirs/graphql': ['libs/cirs/util/graphql/src/index.ts'],
  '@jaqua/cirs/util/calendar': ['libs/cirs/util/calendar/src/index.ts'],
  '@jaqua/cirs/util/data': ['libs/cirs/util/data/src/index.ts'],
  '@jaqua/cirs/util/factories': ['libs/cirs/util/factories/src/index.ts'],
  '@jaqua/db': ['libs/shared/data-access/db/src/index.ts'],
  '@jaqua/e2e': ['libs/shared/util/e2e/src/index.ts'],
  '@jaqua/error': ['libs/shared/feat/error/src/index.ts'],
  '@jaqua/error/server': ['libs/shared/feat/error/src/server.ts'],
  '@jaqua/jaqua.de-api': ['apps/jaqua.de/api/src/main.ts'],
  '@jaqua/jaqua.de/graphql': ['libs/jaqua.de/util/graphql/src/index.ts'],
  '@jaqua/kinderheilkun.de-api': ['apps/kinderheilkun.de/api/src/main.ts'],
  '@jaqua/linguarium/id': ['libs/linguarium/util/id/src/index.ts'],
  '@jaqua/linguarium/phonetics-sim': [
    'libs/linguarium/util/phonetics-sim/src/index.ts',
  ],
  '@jaqua/linguarium/phonetics-util': [
    'libs/linguarium/util/phonetics-util/src/index.ts',
  ],
  '@jaqua/linguarium/rhyme-client': [
    'libs/linguarium/data-access/rhyme-client/src/index.ts',
  ],
  '@jaqua/linguarium/rhyme-engine': [
    'libs/linguarium/feat/rhyme-engine/src/index.ts',
  ],
  '@jaqua/linguarium/rhyme-scoring': [
    'libs/linguarium/feat/rhyme-scoring/src/index.ts',
  ],
  '@jaqua/linguarium/rhyme-search': [
    'libs/linguarium/feat/rhyme-search/src/index.ts',
  ],
  '@jaqua/logger': ['libs/shared/feat/logger/src/index.ts'],
  '@jaqua/modules/common': ['libs/shared/feat/modules/common/src/index.ts'],
  '@jaqua/modules/upload': [
    'libs/shared/feat/modules/upload/src/frontend/index.ts',
  ],
  '@jaqua/modules/upload/backend': [
    'libs/shared/feat/modules/upload/src/backend/index.ts',
  ],
  '@jaqua/neonatologie.de-api': ['apps/neonatologie.de/api/src/main.ts'],
  '@jaqua/neonatologie.de/cache': [
    'libs/neonatologie.de/util/cache/src/index.ts',
  ],
  '@jaqua/neonatologie.de/config': [
    'libs/neonatologie.de/util/config/src/index.ts',
  ],
  '@jaqua/neonatologie.de/factories': [
    'libs/neonatologie.de/util/factories/src/index.ts',
  ],
  '@jaqua/neonatologie.de/graphql': [
    'libs/neonatologie.de/util/graphql/src/index.ts',
  ],
  '@jaqua/neonatologie.de/instagram': [
    'libs/neonatologie.de/util/instagram/src/index.ts',
  ],
  '@jaqua/neonatologie.de/param': [
    'libs/neonatologie.de/feat/param/src/index.ts',
  ],
  '@jaqua/neonatologie.de/theme': [
    'libs/neonatologie.de/util/theme/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/chart': [
    'libs/neonatologie.de/util/chart/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/diagram': [
    'libs/neonatologie.de/util/diagram/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/invoice': [
    'libs/neonatologie.de/util/invoice/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/notecard': [
    'libs/neonatologie.de/util/notecard/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/photography': [
    'libs/neonatologie.de/util/photography/src/index.ts',
  ],
  '@jaqua/neonatologie.de/util/search': [
    'libs/neonatologie.de/util/search/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/card': [
    'libs/paedapp/data-access/card/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/description': [
    'libs/paedapp/data-access/description/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/diagnoses': [
    'libs/paedapp/data-access/diagnoses/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/diagnostic': [
    'libs/paedapp/data-access/diagnostic/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/dialog-pdf': [
    'libs/paedapp/data-access/dialog-pdf/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/doctor-select': [
    'libs/paedapp/data-access/doctor-select/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/documentation': [
    'libs/paedapp/data-access/documentation/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/examination': [
    'libs/paedapp/data-access/examination/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/examination-room': [
    'libs/paedapp/data-access/examination-room/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/finalize': [
    'libs/paedapp/data-access/finalize/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/history': [
    'libs/paedapp/data-access/history/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/instructions': [
    'libs/paedapp/data-access/instructions/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/list': [
    'libs/paedapp/data-access/list/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/measurements': [
    'libs/paedapp/data-access/measurements/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/medication': [
    'libs/paedapp/data-access/medication/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/panel': [
    'libs/paedapp/data-access/panel/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/patient-dataset': [
    'libs/paedapp/data-access/patient-dataset/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/search': [
    'libs/paedapp/data-access/search/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/treatment-type': [
    'libs/paedapp/data-access/treatment-type/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/triage': [
    'libs/paedapp/data-access/triage/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/user-new': [
    'libs/paedapp/data-access/user-new/src/index.ts',
  ],
  '@jaqua/paedapp/data-access/user-select': [
    'libs/paedapp/data-access/user-select/src/index.ts',
  ],
  '@jaqua/paedapp/db': ['libs/paedapp/data-access/db/src/index.ts'],
  '@jaqua/paedapp/feat/cancel': ['libs/paedapp/feat/cancel/src/index.ts'],
  '@jaqua/paedapp/feat/diagnoses': ['libs/paedapp/feat/diagnoses/src/index.ts'],
  '@jaqua/paedapp/feat/diagnostic': [
    'libs/paedapp/feat/diagnostic/src/index.ts',
  ],
  '@jaqua/paedapp/feat/examination-room': [
    'libs/paedapp/feat/examination-room/src/index.ts',
  ],
  '@jaqua/paedapp/feat/interruption': [
    'libs/paedapp/feat/interruption/src/index.ts',
  ],
  '@jaqua/paedapp/feat/list': ['libs/paedapp/feat/list/src/index.ts'],
  '@jaqua/paedapp/feat/measurements': [
    'libs/paedapp/feat/measurements/src/index.ts',
  ],
  '@jaqua/paedapp/feat/medication': [
    'libs/paedapp/feat/medication/src/index.ts',
  ],
  '@jaqua/paedapp/feat/navigation': [
    'libs/paedapp/feat/navigation/src/index.ts',
  ],
  '@jaqua/paedapp/feat/patient-dataset': [
    'libs/paedapp/feat/patient-dataset/src/index.ts',
  ],
  '@jaqua/paedapp/feat/pdf-output': [
    'libs/paedapp/feat/pdf-output/src/index.ts',
  ],
  '@jaqua/paedapp/feat/pediatrician-new': [
    'libs/paedapp/feat/pediatrician-new/src/index.ts',
  ],
  '@jaqua/paedapp/feat/pediatrician-select': [
    'libs/paedapp/feat/pediatrician-select/src/index.ts',
  ],
  '@jaqua/paedapp/feat/pin-input': ['libs/paedapp/feat/pin-input/src/index.ts'],
  '@jaqua/paedapp/feat/revert': ['libs/paedapp/feat/revert/src/index.ts'],
  '@jaqua/paedapp/feat/search': ['libs/paedapp/feat/search/src/index.ts'],
  '@jaqua/paedapp/feat/treatment-type': [
    'libs/paedapp/feat/treatment-type/src/index.ts',
  ],
  '@jaqua/paedapp/feat/user-new': ['libs/paedapp/feat/user-new/src/index.ts'],
  '@jaqua/paedapp/feat/user-select': [
    'libs/paedapp/feat/user-select/src/index.ts',
  ],
  '@jaqua/paedapp/feat/virtualization': [
    'libs/paedapp/feat/virtualization/src/index.ts',
  ],
  '@jaqua/paedapp/graphql': ['libs/paedapp/util/graphql/src/index.ts'],
  '@jaqua/paedapp/util/calculator': [
    'libs/paedapp/util/calculator/src/index.ts',
  ],
  '@jaqua/paedapp/util/charts': ['libs/paedapp/util/charts/src/index.ts'],
  '@jaqua/paedapp/util/contact': ['libs/paedapp/util/contact/src/index.ts'],
  '@jaqua/paedapp/util/dataset': ['libs/paedapp/util/dataset/src/index.ts'],
  '@jaqua/paedapp/util/editor': ['libs/paedapp/util/editor/src/index.ts'],
  '@jaqua/paedapp/util/examination': [
    'libs/paedapp/util/examination/src/index.ts',
  ],
  '@jaqua/paedapp/util/factories': ['libs/paedapp/util/factories/src/index.ts'],
  '@jaqua/paedapp/util/history': ['libs/paedapp/util/history/src/index.ts'],
  '@jaqua/paedapp/util/instructions': [
    'libs/paedapp/util/instructions/src/index.ts',
  ],
  '@jaqua/paedapp/util/measurements': [
    'libs/paedapp/util/measurements/src/index.ts',
  ],
  '@jaqua/paedapp/util/mts': ['libs/paedapp/util/mts/src/index.ts'],
  '@jaqua/paedapp/util/new-case': ['libs/paedapp/util/new-case/src/index.ts'],
  '@jaqua/paedapp/util/output': ['libs/paedapp/util/output/src/index.ts'],
  '@jaqua/paedapp/util/pediatrician-new': [
    'libs/paedapp/util/pediatrician-new/src/index.ts',
  ],
  '@jaqua/paedapp/util/pediatrician-select': [
    'libs/paedapp/util/pediatrician-select/src/index.ts',
  ],
  '@jaqua/paedapp/util/percentiles': [
    'libs/paedapp/util/percentiles/src/index.ts',
  ],
  '@jaqua/paedapp/util/theme': ['libs/paedapp/util/theme/src/index.ts'],
  '@jaqua/paedapp/util/therapy': ['libs/paedapp/util/therapy/src/index.ts'],
  '@jaqua/paedapp/util/treatment-type': [
    'libs/paedapp/util/treatment-type/src/index.ts',
  ],
  '@jaqua/paedapp/util/user-new': ['libs/paedapp/util/user-new/src/index.ts'],
  '@jaqua/regex': ['libs/shared/util/regex/src/index.ts'],
  '@jaqua/backend': ['libs/shared/feat/backend/src/index.ts'],
  '@jaqua/shared/feat/admin': ['libs/shared/feat/admin/src/index.ts'],
  '@jaqua/shared/feat/layout': ['libs/shared/feat/layout/src/index.ts'],
  '@jaqua/shared/feat/login': ['libs/shared/feat/login/src/index.ts'],
  '@jaqua/shared/theme': ['libs/shared/util/theme/src/index.ts'],
  '@jaqua/shared/util/action': ['libs/shared/util/action/src/index.ts'],
  '@jaqua/shared/util/apollo-custom-fetch': [
    'libs/shared/util/apollo-custom-fetch/src/index.ts',
  ],
  '@jaqua/shared/util/apollo-link': [
    'libs/shared/util/apollo-link/src/index.ts',
  ],
  '@jaqua/shared/util/calculation': [
    'libs/shared/util/calculation/src/index.ts',
  ],
  '@jaqua/shared/util/check': ['libs/shared/util/check/src/index.ts'],
  '@jaqua/shared/util/cookie': ['libs/shared/util/cookie/src/index.ts'],
  '@jaqua/shared/util/date': ['libs/shared/util/date/src/index.ts'],
  '@jaqua/shared/util/emergency': ['libs/shared/util/emergency/src/index.ts'],
  '@jaqua/shared/util/factories': ['libs/shared/util/factories/src/index.ts'],
  '@jaqua/shared/util/formatting': ['libs/shared/util/formatting/src/index.ts'],
  '@jaqua/shared/util/generator': ['libs/shared/util/generator/src/index.ts'],
  '@jaqua/shared/util/health-check': [
    'libs/shared/util/health-check/src/index.ts',
  ],
  '@jaqua/shared/util/media': ['libs/shared/util/media/src/index.ts'],
  '@jaqua/shared/util/mongodb': ['libs/shared/util/mongodb/src/index.ts'],
  '@jaqua/shared/util/parsing': ['libs/shared/util/parsing/src/index.ts'],
  '@jaqua/shared/util/testing': ['libs/shared/util/testing/src/index.ts'],
  '@jaqua/user': ['libs/shared/feat/modules/user/src/index.ts'],
  '@jaqua/util/provider': ['libs/shared/util/provider/src/index.ts'],
};

const main = async () => {
  const arr = Object.values(paths).flat(1);
  const result = arr
    .map((item) => {
      const frags = item.split('/');
      const srcIdx = frags.indexOf('src');
      frags.splice(srcIdx, frags.length);
      return frags.join('/');
    })
    .sort()
    .map((item) => {
      const normal = './' + item;
      return { path: normal };
    });
  //   console.log('result', result);

  try {
    const demoPath = './demo.json';
    let json = await fs.readFile(demoPath, { encoding: 'utf8' });
    json = JSON.parse(json);
    json.references = result;
    console.log('json ', json);

    await fs.writeFile(demoPath, JSON.stringify(json), { encoding: 'utf8' });
    return;
  } catch (error) {
    return console.error(error);
  }
};

main();
