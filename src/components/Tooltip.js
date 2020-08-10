import React, { createRef } from "react";
import ReactDOM from 'react-dom';
import "./Tooltip.css";
// const Tooltip = ({ message }) => {

//   const [visible, setVisible] = useState(false);
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [type, setType] = useState("none");

//   /* pre -render */
//   let visibility = state.visible == true ? "on" : "off";
//   let style = {
//     left: ((state.x + window.scrollX) + 'px'),
//     top: ((state.y + window.scrollY) + 'px')
//   };
//   let classNames = {};

//   if (type != null && type != "none") {
//     classNames[type] = true;
//   }

//   classNames[visibility] = true;

//   return (
//     <div id="tooltip" className={Object.keys(classNames).join(" ")} style={style}>
//       <div className="tooltip-arrow"></div><div className="tooltip-inner">{message}</div>
//     </div>
//   )

//     pastShow(hoverRect)
//   {
//   	// position the tooltip after showing it

//     let ttNode = ReactDOM.findDOMNode(this);

//   	if(ttNode != null)
//     {
//       let x = 0, y = 0;

//       const docWidth = document.documentElement.clientWidth,
//             docHeight = document.documentElement.clientHeight;

//       let rx = hoverRect.x + hoverRect.width, // most right x
//       		lx = hoverRect.x, // most left x
//           ty = hoverRect.y, // most top y
//           by = hoverRect.y + hoverRect.height; // most bottom y

//       // tool tip rectange
//       let ttRect = ttNode.getBoundingClientRect();

//       let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
//       let bLeft = (lx - ttRect.width) >= 0;

//       let bAbove = (ty - ttRect.height) >= 0;
//       let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

//       let newState = {};

//       // the tooltip doesn't fit to the right
//       if(bRight)
//       {
//       	x = rx;

//         y = ty + (hoverRect.height - ttRect.height);

//       	if(y < 0)
//         {
//         	y = ty;
// 				}

//         newState.type = "right";
//       }
//       else if(bBellow)
//       {
//       	y = by;

//         x = lx + (hoverRect.width - ttRect.width);

//         if(x < 0)
//         {
//         	x = lx;
// 				}

//         newState.type = "bottom";
//       }
//       else if(bLeft)
//       {
//       	x = lx - ttRect.width;

//         y = ty + (hoverRect.height - ttRect.height);

//         if(y < 0)
//         {
//         	y = ty;
// 				}

//         newState.type = "left";
//       }
//       else if(bAbove)
//       {
//       	y = ty - ttRect.height;

//         x = lx + (hoverRect.width - ttRect.width);

//         if(x < 0)
//         {
//         	x = lx;
// 				}

//         newState.type = "top";
//       }

//       newState = {...newState, x:x, y:y};

//       this.setState(newState);
//     }
//   }
//   show(hoverRect)
//   {
//   	let {pastShow} = this;

//     // setState will execute the pastShow with hoverRect as the tool tip becomes visible
//     setVisible(true);

//   	this.setState({visible:true}, pastShow.bind(this, hoverRect))
// 	}
//  	hide()
//   {
//   	this.setState({visible:false})
//   }
// }


const ToolTipWrapper = (props) => {
  

  const message = props.message;
  const reference = props.reference;

  const handleHover = (evt) => {
    if (message === null) {
      return;
    }
    let el = evt.currentTarget;
    if(el != null)
    {
      let rect = el.getBoundingClientRect();
      if (reference.current != null) {
        reference.current.show(rect, message);
      }
		}
  }
  const handleHoverOut = () =>  {
    reference.current.hide(); 
  }

  return (
    <div onMouseEnter={ (evt) => {handleHover(evt)}} onMouseLeave={handleHoverOut} className="tooltip_wrapper" >
      {props.children}
    </div>
  )
}
// Class Component
class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, x: 0, y: 0, type: "bottom", isBellow: false,  message: "No Message" };
    this.toolTipRef = createRef();
    this.pastShow = this.pastShow.bind(this);
    this.isVisible = this.isVisible.bind(this);
  }
  render() {
    let { state } = this;

    let visibility = state.visible == true ? "on" : "off";

    let style = {
      left: ((state.x + window.scrollX) + 'px'),
      top: ((state.y + window.scrollY) + 'px')
    };

    let classNames = {};

    if (state.type != null && state.type != "none") {
      classNames[state.type] = true;
    }

    classNames[visibility] = true;

    return <div id="tooltip" ref={this.toolTipRef} className={Object.keys(classNames).join(" ")} style={style}>
      {this.props.dynamicPointer ?
      <div className="tooltip-arrow" style={this.state.isBellow? {top:"10%"}: {top: "90%"}}></div> :
      <div className="tooltip-arrow"></div>
    }
      <div className="tooltip-inner">{this.state.message}</div></div>;
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  pastShow(hoverRect) {
    let ttNode = this.toolTipRef.current;

    if (ttNode != null) {
      let x = 0, y = 0;

      const docWidth = document.documentElement.clientWidth,
        docHeight = document.documentElement.clientHeight;

      let rx = hoverRect.x + hoverRect.width, // most right x
        lx = hoverRect.x, // most left x
        ty = hoverRect.y, // most top y
        by = hoverRect.y + hoverRect.height; // most bottom y

      // tool tip rectange
      let ttRect = ttNode.getBoundingClientRect();

      let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
      let bLeft = (lx - ttRect.width) >= 0;

      let bAbove = (ty - ttRect.height) >= 0;
      let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

      let newState = {};

      // the tooltip doesn't fit to the right
      if (bRight) {
        x = rx;

        y = ty + (hoverRect.height - ttRect.height);

        if (y < 0) {
          y = ty;
          if (this.props.dynamicPointer != undefined) {
            newState.isBellow = true;
          }
        } else {
          if (this.props.dynamicPointer != undefined) {
            newState.isBellow = false;
          }
        }

        newState.type = "right";
      }
      else if (bBellow) {
        y = by;

        x = lx + (hoverRect.width - ttRect.width);

        if (x < 0) {
          x = lx;
        }
        newState.type = "bottom";
      }
      else if (bLeft) {
        x = lx - ttRect.width;

        y = ty + (hoverRect.height - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        newState.type = "left";
      }
      else if (bAbove) {
        y = ty - ttRect.height;

        x = lx + (hoverRect.width - ttRect.width);

        if (x < 0) {
          x = lx;
        }

        newState.type = "top";
      }

      newState = { ...newState, x: x, y: y };
      
      this.setState(newState);
    }
  }
  show(hoverRect, message) {
    let { pastShow } = this;
    // setState will execute the pastShow with hoverRect as the tool tip becomes visible
    this.setState({ visible: true, message: message }, pastShow.bind(this, hoverRect))
  }
  hide() {
    this.setState({ visible: false })
  }
  isVisible() {
    return this.state.visible;
  }
}
export { ToolTip, ToolTipWrapper };
