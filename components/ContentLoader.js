import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={932}
    viewBox="0 0 400 932"
    backgroundColor="#c0b5c4"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="319" y="331" rx="0" ry="0" width="9" height="0" /> 
    <Rect x="265" y="96" rx="3" ry="3" width="100" height="100" /> 
    <Rect x="266" y="216" rx="3" ry="3" width="100" height="100" /> 
    <Rect x="267" y="337" rx="3" ry="3" width="100" height="100" /> 
    <Rect x="266" y="456" rx="3" ry="3" width="100" height="100" /> 
    <Rect x="267" y="576" rx="3" ry="3" width="100" height="100" /> 
    <Rect x="6" y="115" rx="3" ry="3" width="238" height="43" /> 
    <Rect x="6" y="236" rx="3" ry="3" width="238" height="43" /> 
    <Rect x="5" y="356" rx="3" ry="3" width="238" height="43" /> 
    <Rect x="7" y="476" rx="3" ry="3" width="238" height="43" /> 
    <Rect x="7" y="595" rx="3" ry="3" width="238" height="43" /> 
    <Rect x="5" y="96" rx="0" ry="0" width="163" height="9" /> 
    <Rect x="6" y="217" rx="0" ry="0" width="163" height="9" /> 
    <Rect x="6" y="338" rx="0" ry="0" width="163" height="9" /> 
    <Rect x="7" y="457" rx="0" ry="0" width="163" height="9" /> 
    <Rect x="5" y="577" rx="0" ry="0" width="163" height="9" /> 
    {/* <Rect x="5" y="55" rx="5" ry="5" width="42" height="10" /> 
    <Rect x="63" y="55" rx="5" ry="5" width="42" height="9" /> 
    <Rect x="122" y="55" rx="5" ry="5" width="42" height="9" /> 
    <Rect x="185" y="55" rx="5" ry="5" width="42" height="9" /> 
    <Rect x="245" y="55" rx="5" ry="5" width="42" height="9" /> 
    <Rect x="303" y="55" rx="5" ry="5" width="42" height="9" />  */}
    <Rect x="5" y="164" rx="3" ry="3" width="132" height="9" /> 
    <Rect x="8" y="283" rx="3" ry="3" width="132" height="9" /> 
    <Rect x="6" y="405" rx="3" ry="3" width="132" height="9" /> 
    <Rect x="7" y="524" rx="3" ry="3" width="132" height="9" /> 
    <Rect x="9" y="646" rx="3" ry="3" width="132" height="9" />
  </ContentLoader>
)

export default MyLoader

