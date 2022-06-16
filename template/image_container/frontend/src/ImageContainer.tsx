import {
    ComponentProps,
    Streamlit,
    StreamlitComponentBase,
    withStreamlitConnection,
  } from "streamlit-component-lib"
  import React, { ReactNode } from "react"

  interface State {
    imageURL: string
  }

  class ImageContainer extends StreamlitComponentBase<State> {
    public constructor(props: ComponentProps) {
        super(props);
        this.state = {imageURL : "template/image_container/frontend/public/Ankylosaurus.jpg"}
    }

    public render = (): ReactNode => {
        return <img src={require("./Ankylosaurus.jpg")} alt="An Ankylosaurus Dinosaur"></img>
    }
  }

  // not sure how to typescript this
//   const ImageContainer = () => {
//     console.log("ImageContainer.tsx reached");
//     return <h1>Dino</h1>
//   };

  export default withStreamlitConnection(ImageContainer);