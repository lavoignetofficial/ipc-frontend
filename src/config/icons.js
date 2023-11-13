import * as AntDesignIcons from "react-icons/ai";

export const Ai = ({ name }) => {
    const IconComponent = AntDesignIcons[name];
  
    if (!IconComponent) { // Return a default one
      return <AntDesignIcons.AiFillCaretDown className="icon-menu"/>;
    }
  
    return <IconComponent className="icon-menu"/>;
};
