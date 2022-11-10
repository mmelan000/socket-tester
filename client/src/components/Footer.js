import React from 'react';


export default function Footer(props) {

  return (
    <footer>
      <p>A Game by Mike Melanson, Alvin Pollard & Marshall Rizzuto.</p>
      <p>
        Copyright {'\u00A9'} {props.year}
      </p>
    </footer>
  );
}
