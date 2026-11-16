import { PdpSelection } from '@app-types/checkout.types';

// Must not be the tariff preselected from the catalog (Yettel Mobile XL), otherwise nothing changes.
export const bundleSelection: PdpSelection = {
  tariff: 'Yettel Mobile M',
  installments: 36,
};
