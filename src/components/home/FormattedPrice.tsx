interface Props {
    amount:number
}

const FormattedPrice = ({amount}:Props)=>{
    const formattedPrice = new Number(amount).toLocaleString("en-US",{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:2
    })
    return <span>{formattedPrice}</span> 
}

export default FormattedPrice