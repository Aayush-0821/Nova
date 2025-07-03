import React from 'react'
import {TypeAnimation} from 'react-type-animation'

function TypingAnimation({sequences,speed=50,...props}) {
  return (
    <TypeAnimation
    sequence={sequences}
    speed={speed}
    cursor={true}
    {...props}
    />
  );
}

export default TypingAnimation