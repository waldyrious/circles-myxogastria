import React from 'react';
import styled from 'styled-components';

import logo from '%/images/logo.png';

const TrustHealthDisplay = () => {
  return <TrustHealthStyle />;
};

const TrustHealthStyle = styled.div`
  width: 10rem;
  height: 10rem;

  margin: 0 auto;

  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export default TrustHealthDisplay;
