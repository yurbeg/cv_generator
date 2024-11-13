
import "./index.css"
const Footer = ({disabled,setCurrent}) =>{
    const handleNextStep = ()=>{
        setCurrent(prev=>prev+1)
    } 
    const handleBackStep = () =>{
        setCurrent(prev=>prev-1)
    }
    return (
        <div className="footer_div">
            <button className="footer_btn" disabled = {disabled} onClick={handleBackStep}>BACK</button>
            <button className="footer_btn primary" onClick={handleNextStep}>NEXT</button>
            <button className="footer_btn primary">SAVE AND COUNTINUE</button>
        </div>
    )
}
export default Footer