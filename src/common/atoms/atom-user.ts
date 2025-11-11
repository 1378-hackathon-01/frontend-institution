import { IInstitutionMeFull } from 'common/models';
import { atom } from 'recoil';

const atomUser = atom<IInstitutionMeFull | null>({
  key: 'authorized-user',
  default: null,
});

export default atomUser;
