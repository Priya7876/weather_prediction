import React from 'react';

const Button = (props) => {
    
  return (
    <div>
      <button
      onClick={props.onClk}
      style = {{
        height : `${props.height}px`,
        width : `${props.width}px`,
        background: props.bg,
        color : props.color,
        padding : `${props.xp}px  ${props.yp}px`,
        margin : `${props.xm}px  ${props.ym}px`,
        borderRadius : `${props.borderRadius}px`,
        outline:"none",
        border :"none",
        fontSize :`${props.font}px`
      }}
      > {props.text}</button>
    </div>
  );
}

export default Button;
