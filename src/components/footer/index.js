
import "./index.css"
const Footer = ({disabled,setCurrent,form}) =>{

    const handleBackStep = () =>{
        setCurrent(prev=>prev-1)
    }
    return (
        <div className="footer_div">
            <button className="footer_btn" disabled = {disabled} onClick={handleBackStep}>BACK</button>
            <button className="footer_btn primary" onClick={form.submit}>NEXT</button>
            <button className="footer_btn primary">SAVE AND COUNTINUE</button>
        </div>
    )
}
export default Footer