import React from 'react';
import PropTypes from 'prop-types'

import { Wrapper } from './styles';
import Header from '~/components/Header'
export default function DefaultLayouts({children}) {
  return (
    
  <Wrapper>
    <Header />
  {children}
  </Wrapper>
  );
}

DefaultLayouts.propTypes = {
    children: PropTypes.element.isRequired
}