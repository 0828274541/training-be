import faker from 'faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  role: sample(['admin', 'contributor', 'normal']),
}));

export default users;
