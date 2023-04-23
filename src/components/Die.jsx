export const Die=(props)=>{
    const styles={
        backgroundColor:props.isHeld?"#59E391":"white"
    }
    return(
        <div 
        className="dieFace" 
        style={styles}
        onClick={props.holder}
        >
            

            <h2 className="dieNum">{props.value}</h2>
            
        </div>
    )
}