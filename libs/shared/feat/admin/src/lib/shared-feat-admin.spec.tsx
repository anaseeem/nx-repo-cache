import { render } from '@testing-library/react';

import SharedFeatAdmin from './shared-feat-admin';

describe('SharedFeatAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFeatAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
