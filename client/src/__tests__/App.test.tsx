import React from 'react';
import { render } from '@testing-library/react';

import { App } from '@app/App';

describe('App component test suite', () => {
  it('should match App to snapshot', () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});
